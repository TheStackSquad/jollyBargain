// src/frontend/components/accountpage/AccountUI.js
import React, { useState } from 'react';
// Destructure the Animated components from the default export of animation.js
import animationExports from '../../animation/animate';
import { Mail, Facebook } from 'lucide-react'; 

const { AnimatedDiv, AnimatedH2, AnimatedButton, AnimatedSection, AnimatedP } = animationExports;

const AccountPage = () => {
  const [isLogin, setIsLogin] = useState(true); // State to toggle between login and signup

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleGoogleSignIn = () => {
    console.log('Signing in with Google...');
    // Implement Google OAuth logic here
  };

  const handleFacebookSignIn = () => {
    console.log('Signing in with Facebook...');
    // Implement Facebook OAuth logic here
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formType = isLogin ? 'Login' : 'Sign Up';
    console.log(`${formType} form submitted!`);
    // Implement actual form submission logic (e.g., API call)
  };

 return (
    // AnimatedSection provides the staggerContainer effect for its direct children
    <AnimatedSection className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <AnimatedDiv className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md flex flex-col items-center">
        <AnimatedH2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
          {isLogin ? 'Welcome Back!' : 'Join Us!'}
        </AnimatedH2>

        {/* Social Sign-in Options */}
        <div className="space-y-4 w-full mb-6">
          <AnimatedButton
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center w-full px-6 py-3 border border-gray-300 rounded-lg shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 ease-in-out"
          >
            <Mail className="w-5 h-5 mr-2" />
            {isLogin ? 'Sign in with Google' : 'Sign up with Google'}
          </AnimatedButton>

          <AnimatedButton
            onClick={handleFacebookSignIn}
            className="flex items-center justify-center w-full px-6 py-3 border border-gray-300 rounded-lg shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 ease-in-out"
          >
            <Facebook className="w-5 h-5 mr-2" />
            {isLogin ? 'Sign in with Facebook' : 'Sign up with Facebook'}
          </AnimatedButton>
        </div>

        <div className="relative flex py-5 items-center w-full mb-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <AnimatedP className="flex-shrink mx-4 text-gray-400 text-sm">OR</AnimatedP>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Email/Password Form */}
        <form onSubmit={handleFormSubmit} className="w-full space-y-4">
          <AnimatedDiv>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-200 ease-in-out"
              placeholder="you@example.com"
            />
          </AnimatedDiv>

          <AnimatedDiv>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-200 ease-in-out"
              placeholder="********"
            />
          </AnimatedDiv>

          {!isLogin && ( // Conditionally render confirm password for signup
            <AnimatedDiv>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-200 ease-in-out"
                placeholder="********"
              />
            </AnimatedDiv>
          )}

          <AnimatedButton
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 ease-in-out transform hover:scale-105"
          >
            {isLogin ? 'Sign In' : 'Sign Up'}
          </AnimatedButton>
        </form>

        <AnimatedP className="mt-6 text-center text-sm text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
          <button
            onClick={toggleForm}
            className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline transition-all duration-200 ease-in-out"
          >
            {isLogin ? 'Sign Up' : 'Sign In'}
          </button>
        </AnimatedP>
      </AnimatedDiv>
    </AnimatedSection>
  );
};

export default AccountPage;
