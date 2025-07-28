// frontend/ src/ components/ orderPortal/ orderSummary.js
import React from "react";
import { Percent } from "lucide-react";

function OrderSummary({
  calculatedSubtotal,
  discountAmount,
  shippingCost,
  calculatedVat,
  calculatedGrandTotal,
  vatRate,
  formatCurrency,
}) {
  return (
    <div
      className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6
      rounded-2xl border border-indigo-100 mb-8"
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Order Summary
      </h3>
      <div className="space-y-3">
        <div className="flex justify-between items-center text-gray-700">
          <span>Subtotal:</span>
          <span className="font-semibold">
            {formatCurrency(calculatedSubtotal)}
          </span>
        </div>
        {discountAmount > 0 && (
          <div className="flex justify-between items-center text-green-600">
            <span className="flex items-center">
              <Percent className="w-4 h-4 mr-1" />{" "}
              {/* Changed icon to Percent */}
              Discount:
            </span>
            <span className="font-semibold">
              -{formatCurrency(discountAmount)}
            </span>
          </div>
        )}
        <div className="flex justify-between items-center text-gray-700">
          <span>Shipping:</span>
          <span className="font-semibold">{formatCurrency(shippingCost)}</span>
        </div>
        <div className="flex justify-between items-center text-gray-700">
          <span>VAT ({vatRate * 100}%):</span> {/* Display VAT rate */}
          <span className="font-semibold">{formatCurrency(calculatedVat)}</span>
        </div>
        <div className="border-t border-gray-300 pt-3 mt-3">
          <div className="flex justify-between items-center text-xl font-bold text-indigo-700">
            <span>Order Total:</span>
            <span className="text-2xl">
              {formatCurrency(calculatedGrandTotal)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderSummary;
