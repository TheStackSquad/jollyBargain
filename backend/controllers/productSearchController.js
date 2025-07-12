// backend/controllers/productSearchController.js
import Product from '../models/Product.js';

export const searchProducts = async (req, res) => {
  try {
    console.log('searchProducts function triggered with query:', req.query);

    const {
      searchTerm = '',
      category = 'all',
      minPrice = '',
      maxPrice = '',
      page = 1,
      limit = 12,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build the search query
    let searchQuery = {
      status: 'active', // Only show active products
      stock: { $gt: 0 } // Only show products in stock
    };

    // Add text search if searchTerm is provided
    if (searchTerm && searchTerm.trim()) {
      searchQuery.$or = [
        { title: { $regex: searchTerm, $options: 'i' } },
        { description: { $regex: searchTerm, $options: 'i' } },
        { tags: { $in: [new RegExp(searchTerm, 'i')] } }
      ];
    }

    // Add category filter if not 'all'
    if (category && category !== 'all') {
      searchQuery.category = { $regex: category, $options: 'i' };
    }

    // Add price range filter
    if (minPrice || maxPrice) {
      searchQuery.price = {};
      if (minPrice) searchQuery.price.$gte = parseFloat(minPrice);
      if (maxPrice) searchQuery.price.$lte = parseFloat(maxPrice);
    }

    console.log('Search query:', searchQuery);

    // Build sort object
    const sortObj = {};
    sortObj[sortBy] = sortOrder === 'asc' ? 1 : -1;

    // Execute search with pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const [products, totalCount] = await Promise.all([
      Product.find(searchQuery)
        .sort(sortObj)
        .skip(skip)
        .limit(parseInt(limit)),
      Product.countDocuments(searchQuery)
    ]);

    console.log(`Found ${products.length} products out of ${totalCount} total`);

    // Transform products to include missing fields for frontend compatibility
    const transformedProducts = products.map(product => {
      const productObj = product.toObject();
      
      return {
        ...productObj,
        // Frontend compatibility fields
        name: productObj.title, // Map title to name for backward compatibility
        salePrice: productObj.price, // Map price to salePrice
        originalPrice: Math.round(productObj.price * 1.25), // Calculate original price (25% markup)
        discount: Math.floor(Math.random() * 30) + 10, // Random discount 10-40%
        claimed: Math.floor(Math.random() * 5), // Random claimed count (0-4)
        rating: (4.0 + Math.random() * 1.0).toFixed(1), // Random rating 4.0-5.0
        views: Math.floor(Math.random() * 1000) + 100, // Random views 100-1100
        
        // Ensure images array has proper structure
        images: productObj.images.length > 0 ? productObj.images : [
          {
            public_id: 'placeholder',
            url: '/images/placeholder.jpg'
          }
        ]
      };
    });

    // Calculate pagination info
    const totalPages = Math.ceil(totalCount / parseInt(limit));
    const hasNext = parseInt(page) < totalPages;
    const hasPrev = parseInt(page) > 1;

    const response = {
      products: transformedProducts,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalCount,
        hasNext,
        hasPrev,
        limit: parseInt(limit)
      },
      searchParams: {
        searchTerm,
        category,
        minPrice,
        maxPrice,
        sortBy,
        sortOrder
      }
    };

    console.log('Search response being sent:', {
      productsCount: transformedProducts.length,
      pagination: response.pagination
    });

    res.status(200).json(response);

  } catch (error) {
    console.error('Product search error:', error);
    res.status(500).json({
      message: 'Server error searching products',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get unique categories for filter dropdown
export const getCategories = async (req, res) => {
  try {
    console.log('getCategories function triggered');

    const categories = await Product.distinct('category', { 
      status: 'active',
      stock: { $gt: 0 }
    });

    console.log('Categories found:', categories);

    res.status(200).json({
      categories: categories.sort()
    });

  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      message: 'Server error fetching categories',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};