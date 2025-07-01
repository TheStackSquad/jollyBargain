//frontend/src/App

// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link } from "react-router-dom";
import { ShoppingCart, User } from 'lucide-react';

// Import animation components
import { 
  AnimatedH1, 
  AnimatedP, 
  AnimatedHeader, 
  AnimatedFooter,
  animationVariants 
} from './animation/animate';

// Import page components
import Home from './home';
import About from './pages/About';
import Store from './pages/store';
import FlashDeals from './pages/flashDeals'; 
import Contact from './pages/contact';
import FAQ from './pages/faq';
import Shipping from './pages/shipping';
import Login from './pages/login'; 
import Cart from './pages/cart'; 
import Checkout from './pages/checkout';  
// Import other pages as you create them
// import Cart from './pages/Cart';
// import Contact from './pages/Contact';

// Define custom paths for specific links - maps display names to actual routes
const getLinkPath = (linkName) => {
  switch (linkName) {
    case 'Home':
      return '/';
    case 'Deals':
      return '/store'; // Redirects to FlashDeals component
    case 'Categories':
      return '/categories'; // Redirects to Store component
    case 'About Us':
      return '/about'; // Redirects to About component
    case 'Contact Us':
      return '/contact'; // Future contact page
    case 'FAQ':
      return '/faq'; // Future FAQ page
    case 'Shipping Info':
      return '/shipping'; // Future shipping info page
    default:
      // Fallback: convert to lowercase and replace spaces with hyphens
      return `/${linkName.toLowerCase().replace(' ', '-')}`;
  }
};

const App = () => {
  return (
    <Router>
      {/* Fixed Header - stays at top of viewport */}
      <AnimatedHeader 
        className="fixed top-0 left-0 right-0 z-50 bg-blue-600 text-white p-4 text-center flex justify-between items-center shadow-lg"
        {...animationVariants.headerSlide}
      >
        {/* Logo/Brand - links to home page */}
       <Link to="/">
  {/* Show 'JollyBargain' on medium screens and up */}
  <AnimatedH1
    className="hidden md:block text-3xl font-extrabold font-jetbrain bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95"
    initial={{ opacity: 0, x: -30 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6, ease: 'easeOut' }}
  >
    JollyBargain
  </AnimatedH1>
  {/* Show 'JB' on small screens (mobile) */}
  <AnimatedH1
    className="block md:hidden text-3xl font-extrabold font-jetbrain bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95"
    initial={{ opacity: 0, x: -30 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6, ease: 'easeOut' }}
  >
    JB
  </AnimatedH1>
</Link>
        
        {/* Navigation menu - cart and login links */}
      {/* Navigation menu - cart and login links */}
<nav>
  <ul className="flex space-x-6">
    <li>
      <Link
        to="/cart"
        className="flex items-center text-white hover:text-blue-200 font-roboto transition-colors duration-300 hover:scale-105 transform"
      >
        <ShoppingCart size={20} className="md:mr-2" /> {/* Optional: remove margin on mobile */}
        <span className="hidden md:block">Cart</span> {/* Hide 'Cart' text on mobile */}
      </Link>
    </li>
    <li>
      <Link
        to="/login"
        className="flex items-center text-white hover:text-blue-200 font-roboto transition-colors duration-300 hover:scale-105 transform"
      >
        <User size={20} className="md:mr-2" /> {/* Optional: remove margin on mobile */}
        <span className="hidden md:block">Login</span> {/* Hide 'Login' text on mobile */}
      </Link>
    </li>
  </ul>
</nav>
      </AnimatedHeader>

      {/* Main Content - padded to account for fixed header */}
      <main className="min-h-screen pt-20">
        <Routes>
          {/* Route definitions - maps URLs to components */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/categories" element={<Store />} />
          <Route path="/store" element={<FlashDeals />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
            <Route path="/shipping" element={<Shipping />} />
             <Route path="/login" element={<Login />} />
              <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
          {/* Commented routes for future implementation */}
          {/* <Route path="/cart" element={<Cart />} /> */}
          {/* <Route path="/login" element={<Login />} /> */}
          {/* <Route path="/contact" element={<Contact />} /> */}
          
          {/* 404 Route - catches all unmatched paths */}
          <Route path="*" element={
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
              <div className="text-center">
                <h2 className="text-6xl font-bold text-gray-800 mb-4">404</h2>
                <p className="text-xl text-gray-600 mb-8">Page not found</p>
                <Link 
                  to="/" 
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300"
                >
                  Go Home
                </Link>
              </div>
            </div>
          } />
        </Routes>
      </main>

      {/* Footer - contains company info and navigation links */}
      <AnimatedFooter 
        className="bg-gray-800 text-white p-8"
        {...animationVariants.footerSlide}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            
            {/* Company Info Section */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-blue-400">JollyBargain</h3>
              <p className="text-gray-300 font-roboto">
                Your trusted partner for amazing deals and unbeatable prices.
              </p>
            </div>
            
            {/* Quick Links Section - uses getLinkPath for proper routing */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-blue-400">Quick Links</h3>
              <ul className="space-y-2">
                {['Home', 'Deals', 'Categories', 'About Us'].map((link) => (
                  <li key={link}>
                    <Link 
                      to={getLinkPath(link)}
                      className="text-gray-300 hover:text-white transition-colors duration-300 font-roboto"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Customer Service Section - uses getLinkPath for proper routing */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-blue-400">Customer Service</h3>
              <ul className="space-y-2">
                {['Contact Us', 'FAQ', 'Shipping Info'].map((link) => (
                  <li key={link}>
                    <Link
                      to={getLinkPath(link)}
                      className="text-gray-300 hover:text-white transition-colors duration-300 font-roboto"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Social Media Section - external links */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-blue-400">Follow Us</h3>
              <ul className="space-y-2">
                {['Facebook', 'Twitter', 'Instagram', 'YouTube'].map((social) => (
                  <li key={social}>
                    <a 
                      href={`#${social.toLowerCase()}`}
                      className="text-gray-300 hover:text-white transition-colors duration-300 font-roboto"
                    >
                      {social}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Copyright Section */}
          <div className="border-t border-gray-700 pt-6 text-center">
            <AnimatedP 
              className="text-gray-400 font-roboto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              &copy; 2025 JollyBargain. All rights reserved.
            </AnimatedP>
          </div>
        </div>
      </AnimatedFooter>
    </Router>
  );
};

export default App;