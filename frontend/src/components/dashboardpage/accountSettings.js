// frontend/src/components/dashboardpage/AccountSettings.js
import React, { useState } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../../animation/animate";
import MessageBox from "../common/messageBox";

function AccountSettings() {
  // Simulated user data (replace with actual Redux state data)
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@example.com");
  const [phone, setPhone] = useState("123-456-7890");

  // State for the custom message box
  const [messageBox, setMessageBox] = useState({
    isVisible: false,
    message: "",
  });

  const showMessageBox = (message) => {
    setMessageBox({ isVisible: true, message });
  };

  const hideMessageBox = () => {
    setMessageBox({ isVisible: false, message: "" });
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    // In a real app, dispatch a Redux action to update user profile on the backend
    // alert("Profile updated successfully! (Simulated)"); // Removed
    showMessageBox("Profile updated successfully! (Simulated)");
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    // In a real app, dispatch a Redux action to change password on the backend
    // alert("Password change initiated! (Simulated)"); // Removed
    showMessageBox("Password change initiated! (Simulated)");
  };

  const handleAddressUpdate = (e) => {
    e.preventDefault();
    // In a real app, manage addresses via Redux actions
    // alert("Address updated successfully! (Simulated)"); // Removed
    showMessageBox("Address updated successfully! (Simulated)");
  };

  const handlePaymentMethodUpdate = (e) => {
    e.preventDefault();
    // In a real app, manage payment methods via Redux actions
    // alert("Payment method updated! (Simulated)"); // Removed
    showMessageBox("Payment method updated! (Simulated)");
  };

  return (
    <motion.div
      variants={fadeIn("up", "tween", 0.1, 0.6)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className="space-y-8"
    >
      <h2 className="text-4xl font-extrabold text-gray-900 mb-6">
        Account Settings
      </h2>

      {/* Personal Information */}
      <motion.div
        variants={fadeIn("up", "spring", 0.2, 0.7)}
        className="bg-white p-6 rounded-xl shadow-md border border-gray-200"
      >
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          Personal Information
        </h3>
        <form onSubmit={handleProfileUpdate} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
              focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
              focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
              focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600
            transition-colors duration-200 ease-in-out"
          >
            Update Profile
          </button>
        </form>
      </motion.div>

      {/* Change Password */}
      <motion.div
        variants={fadeIn("up", "spring", 0.3, 0.7)}
        className="bg-white p-6 rounded-xl shadow-md border border-gray-200"
      >
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          Change Password
        </h3>
        <form onSubmit={handleChangePassword} className="space-y-4">
          <div>
            <label
              htmlFor="currentPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Current Password
            </label>
            <input
              type="password"
              id="currentPassword"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md
              shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-700"
            >
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md
              shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="confirmNewPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmNewPassword"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md
              shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600
            transition-colors duration-200 ease-in-out"
          >
            Change Password
          </button>
        </form>
      </motion.div>

      {/* Address Book */}
      <motion.div
        variants={fadeIn("up", "spring", 0.4, 0.7)}
        className="bg-white p-6 rounded-xl shadow-md border border-gray-200"
      >
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Address Book</h3>
        <p className="text-gray-600 mb-4">
          Manage your shipping and billing addresses.
        </p>
        <button
          type="submit"
          onClick={handleAddressUpdate}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600
          transition-colors duration-200 ease-in-out"
        >
          Manage Addresses
        </button>
      </motion.div>

      {/* Payment Methods */}
      <motion.div
        variants={fadeIn("up", "spring", 0.5, 0.7)}
        className="bg-white p-6 rounded-xl shadow-md border border-gray-200"
      >
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          Payment Methods
        </h3>
        <p className="text-gray-600 mb-4">
          Add or remove your saved payment options.
        </p>
        <button
          type="submit"
          onClick={handlePaymentMethodUpdate}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600
          transition-colors duration-200 ease-in-out"
        >
          Manage Payment Methods
        </button>
      </motion.div>
      <MessageBox
        message={messageBox.message}
        isVisible={messageBox.isVisible}
        onClose={hideMessageBox}
      />
    </motion.div>
  );
}

export default AccountSettings;
