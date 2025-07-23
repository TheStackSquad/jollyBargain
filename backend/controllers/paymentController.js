// backend/controllers/paymentController.js
import Payment from "../models/payment.js";
import Order from "../models/order.js";
import User from "../models/User.js"; // Although not used directly in current logic, good to keep
import stripe from "../config/stripe.js";

export const processPayment = async (req, res) => {
  console.log("--- Entering processPayment controller ---");
  const { orderId, amount, currency, paymentMethodId } = req.body;

  // Log incoming request body and derived userId
  console.log("Received payment request with body:", {
    orderId,
    amount,
    currency,
    paymentMethodId,
  });
  const userId = req.user ? req.user.id : req.body.userId;
  console.log("Determined userId:", userId);

  if (!userId) {
    console.log("Validation failed: User not authenticated.");
    return res
      .status(401)
      .json({ success: false, message: "User not authenticated." });
  }

  if (!orderId || !amount || !currency || !paymentMethodId) {
    console.log("Validation failed: Missing required payment details.");
    return res.status(400).json({
      success: false,
      message:
        "Missing required payment details: orderId, amount, currency, or paymentMethodId.",
    });
  }

  try {
    console.log(`Attempting to find order with ID: ${orderId}`);
    const order = await Order.findById(orderId);
    if (!order) {
      console.log(`Order with ID ${orderId} not found.`);
      return res
        .status(404)
        .json({ success: false, message: "Order not found." });
    }
    console.log("Order found:", order._id);

    const amountInSmallestUnit = Math.round(order.totalPrice * 100);
    console.log(
      `Order total price: ${order.totalPrice}, converted to smallest unit: ${amountInSmallestUnit}`
    );
    console.log(
      `Received amount: ${amount}, converted to smallest unit: ${Math.round(
        amount * 100
      )}`
    );

    if (amountInSmallestUnit !== Math.round(amount * 100)) {
      console.warn(
        `Amount mismatch for order ${orderId}: Expected ${amountInSmallestUnit}, Received ${Math.round(
          amount * 100
        )}. Possible tampering detected.`
      );
      return res.status(400).json({
        success: false,
        message:
          "Payment amount mismatch with order total. Possible tampering detected.",
      });
    }

    if (order.isPaid) {
      console.log(`Order ${orderId} has already been paid.`);
      return res
        .status(400)
        .json({ success: false, message: "Order has already been paid." });
    }

    console.log("Creating Stripe Payment Intent...");
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInSmallestUnit,
      currency: currency.toLowerCase(),
      payment_method: paymentMethodId,
      confirm: true,
      return_url: `${process.env.FRONTEND_URL}/checkout/payment-success?orderId=${orderId}`,
      metadata: {
        order_id: orderId.toString(),
        user_id: userId.toString(),
      },
      description: `Payment for Order ${orderId} by User ${userId}`,
      receipt_email: order.user.email, // Ensure order.user.email is populated
    });
    console.log("Stripe Payment Intent created:", {
      id: paymentIntent.id,
      status: paymentIntent.status,
      client_secret: paymentIntent.client_secret,
      last_payment_error: paymentIntent.last_payment_error,
    });

    let paymentStatus = "failed";
    let transactionId = null;
    let cardLast4 = null;
    let cardBrand = null;

    if (paymentIntent.payment_method) {
      console.log(
        `Retrieving payment method details for: ${paymentIntent.payment_method}`
      );
      const pm = await stripe.paymentMethods.retrieve(
        paymentIntent.payment_method
      );
      if (pm.card) {
        cardLast4 = pm.card.last4;
        cardBrand = pm.card.brand;
        console.log(
          `Card details retrieved: Last4=${cardLast4}, Brand=${cardBrand}`
        );
      } else {
        console.log("Payment method does not contain card details.");
      }
    } else {
      console.log("No payment_method found on paymentIntent.");
    }

    if (paymentIntent.status === "succeeded") {
      paymentStatus = "succeeded";
      transactionId = paymentIntent.id;
      console.log(
        `PaymentIntent status: SUCCEEDED. Transaction ID: ${transactionId}`
      );

      console.log(`Updating order ${orderId} status to paid.`);
      order.isPaid = true;
      order.paidAt = new Date();
      order.paymentResult = {
        id: paymentIntent.id,
        status: paymentIntent.status,
        update_time: new Date().toISOString(),
        email_address: order.user.email,
      };
      await order.save();
      console.log("Order updated and saved successfully.");

      console.log("Creating new Payment record in database.");
      const newPayment = new Payment({
        userId,
        orderId,
        amount: order.totalPrice,
        currency: paymentIntent.currency.toUpperCase(),
        paymentMethodType: "credit_card", // Assuming this is always credit_card for now
        paymentToken: paymentMethodId,
        transactionId,
        status: paymentStatus,
        paymentGatewayResponse: paymentIntent, // Store full intent for debugging
        cardLast4,
        cardBrand,
      });
      await newPayment.save();
      console.log("New Payment record saved successfully:", newPayment._id);

      res.status(200).json({
        success: true,
        message: "Payment processed and order updated successfully.",
        payment: newPayment,
        order: order,
        clientSecret: paymentIntent.client_secret,
      });
      console.log("--- Exiting processPayment: SUCCESS ---");
    } else if (paymentIntent.status === "requires_action") {
      paymentStatus = "pending";
      console.log(
        `PaymentIntent status: REQUIRES_ACTION. Client Secret: ${paymentIntent.client_secret}`
      );

      console.log("Creating new Payment record with pending status.");
      const newPayment = new Payment({
        userId,
        orderId,
        amount: order.totalPrice,
        currency: paymentIntent.currency.toUpperCase(),
        paymentMethodType: "credit_card",
        paymentToken: paymentMethodId,
        transactionId: paymentIntent.id,
        status: paymentStatus,
        paymentGatewayResponse: paymentIntent,
        cardLast4,
        cardBrand,
      });
      await newPayment.save();
      console.log(
        "New Payment record saved with pending status:",
        newPayment._id
      );

      res.status(200).json({
        success: false,
        message: "Payment requires further action (e.g., 3D Secure).",
        requiresAction: true,
        clientSecret: paymentIntent.client_secret,
      });
      console.log("--- Exiting processPayment: REQUIRES_ACTION ---");
    } else {
      paymentStatus = "failed";
      console.log(
        `PaymentIntent status: FAILED. Last error: ${
          paymentIntent.last_payment_error?.message || "N/A"
        }`
      );

      console.log("Creating new Payment record with failed status.");
      const newPayment = new Payment({
        userId,
        orderId,
        amount: order.totalPrice,
        currency: paymentIntent.currency.toUpperCase(),
        paymentMethodType: "credit_card",
        paymentToken: paymentMethodId,
        transactionId: paymentIntent.id,
        status: paymentStatus,
        paymentGatewayResponse: paymentIntent,
        cardLast4,
        cardBrand,
      });
      await newPayment.save();
      console.log(
        "New Payment record saved with failed status:",
        newPayment._id
      );

      res.status(400).json({
        success: false,
        message:
          paymentIntent.last_payment_error?.message ||
          "Payment failed. Please try again.",
        payment: newPayment,
      });
      console.log("--- Exiting processPayment: FAILED ---");
    }
  } catch (error) {
    console.error("--- Error in processPayment controller ---");
    console.error("Error processing payment with Stripe:", error);
    let errorMessage = "Server error during payment processing.";
    if (error.type === "StripeCardError") {
      errorMessage = `Stripe Card Error: ${error.message}`;
    } else if (error.type === "StripeInvalidRequestError") {
      errorMessage = `Stripe Invalid Request Error: ${error.message}`;
    } else if (error.raw) {
      // Catch raw Stripe errors for more detail
      errorMessage = `Stripe API Error: ${error.raw.message || error.message}`;
    }

    res.status(500).json({ success: false, message: errorMessage });
    console.error("--- Exiting processPayment: ERROR ---");
  }
};

export const handleStripeWebhook = async (req, res) => {
  console.log("--- Entering handleStripeWebhook controller ---");
  const sig = req.headers["stripe-signature"];
  let event;

  console.log("Received Stripe webhook signature:", sig);
  console.log("Attempting to construct Stripe event...");

  try {
    // Replace 'YOUR_WEBHOOK_SECRET' with your actual Stripe webhook secret
    // It's highly recommended to store this in an environment variable
    if (!process.env.STRIPE_WEBHOOK_SECRET) {
      console.error(
        "STRIPE_WEBHOOK_SECRET is not set in environment variables!"
      );
      throw new Error("Stripe Webhook Secret is missing.");
    }
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
    console.log(`Stripe event constructed successfully. Type: ${event.type}`);
  } catch (err) {
    console.error(
      `Webhook Error: ${err.message}. Raw body: ${JSON.stringify(req.body)}`
    );
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  console.log(`Processing Stripe event type: ${event.type}`);
  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntentSucceeded = event.data.object;
      console.log(
        `PaymentIntent for ${paymentIntentSucceeded.amount} was successful! Intent ID: ${paymentIntentSucceeded.id}`
      );
      console.log(
        `Metadata: Order ID=${paymentIntentSucceeded.metadata?.order_id}, User ID=${paymentIntentSucceeded.metadata?.user_id}`
      );
      // Then define and call a function to update your database
      // For example: updateOrderPaymentStatus(paymentIntentSucceeded.metadata.order_id, 'succeeded');
      // IMPORTANT: You should implement the logic to update your Order/Payment models here
      // based on the webhook event to ensure data consistency.
      // Example:
      // try {
      //   const orderId = paymentIntentSucceeded.metadata.order_id;
      //   const order = await Order.findById(orderId);
      //   if (order && !order.isPaid) {
      //     order.isPaid = true;
      //     order.paidAt = new Date();
      //     order.paymentResult = {
      //       id: paymentIntentSucceeded.id,
      //       status: paymentIntentSucceeded.status,
      //       update_time: new Date().toISOString(),
      //       email_address: paymentIntentSucceeded.receipt_email,
      //     };
      //     await order.save();
      //     console.log(`Order ${orderId} marked as paid via webhook.`);
      //   } else if (order && order.isPaid) {
      //     console.log(`Order ${orderId} already paid, no update needed from webhook.`);
      //   } else {
      //     console.warn(`Order ${orderId} not found for succeeded payment intent webhook.`);
      //   }
      // } catch (dbError) {
      //   console.error(`Database update error for succeeded payment intent webhook: ${dbError.message}`);
      // }
      break;
    case "payment_intent.payment_failed":
      const paymentIntentFailed = event.data.object;
      console.log(
        `PaymentIntent failed: ${paymentIntentFailed.last_payment_error?.message}. Intent ID: ${paymentIntentFailed.id}`
      );
      console.log(
        `Metadata: Order ID=${paymentIntentFailed.metadata?.order_id}, User ID=${paymentIntentFailed.metadata?.user_id}`
      );
      // Update your database to reflect failed payment
      // For example: updateOrderPaymentStatus(paymentIntentFailed.metadata.order_id, 'failed');
      break;
    case "payment_intent.processing":
      const paymentIntentProcessing = event.data.object;
      console.log(`PaymentIntent processing: ${paymentIntentProcessing.id}`);
      console.log(
        `Metadata: Order ID=${paymentIntentProcessing.metadata?.order_id}, User ID=${paymentIntentProcessing.metadata?.user_id}`
      );
      // Update your database to reflect processing payment
      // For example: updateOrderPaymentStatus(paymentIntentProcessing.metadata.order_id, 'processing');
      break;
    case "charge.succeeded":
      const chargeSucceeded = event.data.object;
      console.log(
        `Charge succeeded: ${chargeSucceeded.id}. Amount: ${chargeSucceeded.amount}. Payment Intent: ${chargeSucceeded.payment_intent}`
      );
      // This event can also be used to confirm payment success, often follows payment_intent.succeeded
      break;
    case "charge.failed":
      const chargeFailed = event.data.object;
      console.log(
        `Charge failed: ${chargeFailed.id}. Failure code: ${chargeFailed.failure_code}. Failure message: ${chargeFailed.failure_message}. Payment Intent: ${chargeFailed.payment_intent}`
      );
      // This event can also be used to confirm payment failure
      break;
    // ... handle other event types as needed
    default:
      console.log(
        `Unhandled event type ${event.type}. Full event object:`,
        event
      );
  }

  // Return a 200 response to acknowledge receipt of the event
  res.send();
  console.log("--- Exiting handleStripeWebhook: Acknowledged ---");
};
