// backend/controllers/flashDealController.js
import Product from "../models/Product.js";

export const getFlashDeals = async (req, res) => {
  try {
    console.log("getFlashDeals function triggered.");

    const MAX_STOCK_THRESHOLD = 20;
    console.log(`Maximum stock threshold set to: ${MAX_STOCK_THRESHOLD}`);

    console.log(
      'Attempting to fetch products with stock <= threshold and status "active"...',
    );
    const allDeals = await Product.find({
      stock: {
        $lte: MAX_STOCK_THRESHOLD,
        $gt: 0,
      },
      status: "active",
    });

    console.log("Raw products fetched from DB:", allDeals);
    console.log(`Number of products matching criteria: ${allDeals.length}`);

    if (!allDeals || allDeals.length === 0) {
      console.log("No products currently meet flash deal criteria.");
      return res.status(200).json({
        featured: null,
        deals: [],
        message: "No products currently meet flash deal criteria",
        totalAvailable: 0,
        criteria: `Products with stock <= ${MAX_STOCK_THRESHOLD} and > 0`,
      });
    }

    // Transform products to include missing fields for frontend compatibility
    const transformedDeals = allDeals.map((deal) => {
      const dealObj = deal.toObject();

      // Add missing fields that frontend expects
      return {
        ...dealObj,
        // Frontend compatibility fields
        name: dealObj.title, // Map title to name for backward compatibility
        salePrice: dealObj.price, // Map price to salePrice
        originalPrice: Math.round(dealObj.price * 1.25), // Calculate original price (25% markup)
        discount: 20, // Default discount percentage
        claimed: Math.floor(Math.random() * 5), // Random claimed count (0-4)
        rating: (4.2 + Math.random() * 0.8).toFixed(1), // Random rating 4.2-5.0
        views: Math.floor(Math.random() * 1000) + 500, // Random views 500-1500

        // Ensure images array has proper structure
        images:
          dealObj.images.length > 0
            ? dealObj.images
            : [
                {
                  public_id: "placeholder",
                  url: "/images/placeholder.jpg", // You'll need to add this image to your public folder
                },
              ],
      };
    });

    // Select one featured deal at random
    const featured =
      transformedDeals[Math.floor(Math.random() * transformedDeals.length)];
    console.log("Featured deal selected:", featured);

    // Get 6 other random deals (excluding the featured one)
    const deals = transformedDeals
      .filter((deal) => deal._id.toString() !== featured._id.toString())
      .sort(() => 0.5 - Math.random())
      .slice(0, 6);
    console.log("Other random deals selected (up to 6):", deals);

    const response = {
      featured,
      deals,
      totalAvailable: transformedDeals.length,
      criteria: `Products with stock <= ${MAX_STOCK_THRESHOLD} and > 0`,
    };

    console.log("Flash deals response being sent:", response);
    res.status(200).json(response);
    console.log("Flash deals response sent successfully.");
  } catch (error) {
    console.error("Flash deals fetch error:", error);
    res.status(500).json({
      message: "Server error fetching flash deals",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Alternative version with configurable threshold
// export const getFlashDealsWithThreshold = async (req, res) => {
//   try {
//     // Get threshold from query params, default to 20
//     const threshold = parseInt(req.query.minStock) || 20;

//     // Optional: Add category filter
//     const category = req.query.category;

//     // Build query object
//     const query = {
//       stock: { $gte: threshold },
//       status: 'active'
//     };

//     // Add category filter if provided
//     if (category) {
//       query.category = { $regex: new RegExp(category, 'i') }; // Case-insensitive
//     }

//     const allDeals = await Product.find(query);

//     if (!allDeals || allDeals.length === 0) {
//       return res.status(200).json({
//         featured: null,
//         deals: [],
//         message: `No products found with stock >= ${threshold}${category ? ` in category: ${category}` : ''}`
//       });
//     }

//     // Select one featured deal at random
//     const featured = allDeals[Math.floor(Math.random() * allDeals.length)];

//     // Get 6 other random deals (excluding the featured one)
//     const deals = allDeals
//       .filter(deal => deal._id.toString() !== featured._id.toString())
//       .sort(() => 0.5 - Math.random())
//       .slice(0, 6);

//     res.status(200).json({
//       featured,
//       deals,
//       totalAvailable: allDeals.length,
//       criteria: {
//         minStock: threshold,
//         category: category || 'all',
//         status: 'active'
//       }
//     });

//   } catch (error) {
//     console.error('Flash deals fetch error:', error);
//     res.status(500).json({
//       message: 'Server error fetching flash deals',
//       error: process.env.NODE_ENV === 'development' ? error.message : undefined
//     });
//   }
// };
