// frontend/src/pages/dashboard.js
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Import motion for animations
import {
  LayoutDashboard,
  ShoppingBag,
  User,
  Heart,
  LogOut,
} from "lucide-react";
import { fadeIn, staggerContainer } from "../animation/animate"; // Your animation exports

// Import Dashboard Components
import DashboardOverview from "../components/dashboardpage/dashboardOverview";
import OrderHistory from "../components/dashboardpage/orderHistory";
import AccountSettings from "../components/dashboardpage/accountSettings";
import Wishlist from "../components/dashboardpage/wishList";

// Lucide React Icons for navigation

function Dashboard() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [activeTab, setActiveTab] = useState("overview"); // State to manage active dashboard tab

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login"); // Or wherever your login page is
    }
  }, [isAuthenticated, navigate]);

  // Simulated User Data (replace with actual user data from Redux if available)
  const userName = user?.name || user?.email || "Better Customer";

  // Navigation items for the sidebar
  const navItems = [
    {
      id: "overview",
      name: "Dashboard",
      icon: LayoutDashboard,
      component: <DashboardOverview userName={userName} />,
    },
    {
      id: "orders",
      name: "My Orders",
      icon: ShoppingBag,
      component: <OrderHistory />,
    },
    {
      id: "settings",
      name: "Account Settings",
      icon: User,
      component: <AccountSettings />,
    },
    { id: "wishlist", name: "Wishlist", icon: Heart, component: <Wishlist /> },
  ];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl text-gray-700">Redirecting to login...</p>
      </div>
    );
  }

  return (
    <motion.div
      variants={staggerContainer(0.1, 0.2)} // Apply staggerContainer to the main dashboard container
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className="min-h-screen bg-gray-50 flex flex-col lg:flex-row font-inter"
    >
      {/* Sidebar Navigation */}
      <motion.nav
        variants={fadeIn("right", "tween", 0.2, 0.5)}
        className="w-full lg:w-64 bg-white shadow-lg lg:shadow-xl p-4 lg:p-6 flex flex-col
        justify-between rounded-b-xl lg:rounded-r-xl lg:rounded-bl-none"
      >
        <div>
          <h1 className="text-3xl font-extrabold text-blue-600 mb-8 text-center">
            My Account
          </h1>
          <ul className="space-y-3">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center w-full px-4 py-3 rounded-lg text-lg font-medium
                    transition-all duration-300 ease-in-out
                    ${
                      activeTab === item.id
                        ? "bg-blue-600 text-white shadow-md hover:bg-blue-700"
                        : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                >
                  <item.icon className="w-6 h-6 mr-3" />
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
        {/* Logout Button - Assuming it dispatches logoutUser from userSlice */}
        <div className="mt-8">
          <button
            onClick={() => {
              // Dispatch logout action here
              // dispatch(logoutUser()); // Uncomment when logoutUser is imported and ready
              navigate("/login"); // Redirect to login after simulated logout
            }}
            className="flex items-center w-full px-4 py-3 rounded-lg text-lg font-medium text-red-600 bg-red-50
            hover:bg-red-100 transition-all duration-300 ease-in-out
            focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            <LogOut className="w-6 h-6 mr-3" />
            Logout
          </button>
        </div>
      </motion.nav>

      {/* Main Content Area */}
      <motion.main
        variants={fadeIn("left", "tween", 0.3, 0.5)}
        className="flex-1 p-4 lg:p-8 overflow-auto"
      >
        <div
          className="bg-white p-6 rounded-xl shadow-xl min-h-[calc(100vh-2rem)]
        lg:min-h-[calc(100vh-4rem)]"
        >
          {navItems.find((item) => item.id === activeTab)?.component}
        </div>
      </motion.main>
    </motion.div>
  );
}

export default Dashboard;
