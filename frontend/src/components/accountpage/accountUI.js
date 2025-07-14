// frontend/src/components/accountpage/accountUI.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import animationExports from '../../animation/animate';
import { Mail, Facebook } from 'lucide-react';

// Import Redux actions and selectors
import { clearAuthMessages } from '../../reduxStore/user/userSlice'; // Still need clearAuthMessages for useEffect
// Import the handler functions
import { handleGoogleSignIn,
  handleFacebookSignIn,
  handleFormSubmit as sharedHandleFormSubmit } from '../../utils/handlers/authHandlers';


const { AnimatedDiv, AnimatedH2, AnimatedButton, AnimatedSection, AnimatedP } = animationExports;

const AccountPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');

  const dispatch = useDispatch();
  const { loading, error, successMessage, isAuthenticated } = useSelector((state) => state.user);

  const navigate = useNavigate();

  // Effect to clear messages when component mounts or form type changes
  useEffect(() => {
    console.log('[AccountUI] useEffect: Clearing auth messages.');
    dispatch(clearAuthMessages());
  }, [isLogin, dispatch]);

  // Effect to redirect after successful authentication
  useEffect(() => {
    if (isAuthenticated && successMessage && !loading) {
      console.log('[AccountUI] useEffect: Authenticated and success message, redirecting...');
      const timer = setTimeout(() => {
        navigate('/dashboard');
        dispatch(clearAuthMessages());
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, successMessage, loading, navigate, dispatch]);

  const toggleForm = () => {
    console.log('[AccountUI] Toggling form. isLogin:', !isLogin);
    setIsLogin(!isLogin);
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setName('');
  };

  // Local handler for form submission that calls the shared handler
  const localHandleFormSubmit = (e) => {
    e.preventDefault();
    sharedHandleFormSubmit({
      isLogin,
      email,
      password,
      confirmPassword,
      name,
      dispatch,
    });
  };


  return (
    <AnimatedSection className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <AnimatedDiv className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md flex flex-col items-center">
        <AnimatedH2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
          {isLogin ? 'Welcome Back!' : 'Join Us!'}
        </AnimatedH2>

        {/* Success/Error Messages from Redux state */}
        {successMessage && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4 w-full rounded-md" role="alert">
            <p className="font-bold">Success!</p>
            <p>{successMessage}</p>
          </div>
        )}
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 w-full rounded-md" role="alert">
            <p className="font-bold">Error!</p>
            <p>{error}</p>
          </div>
        )}

        {/* Social Sign-in Options */}
        <div className="space-y-4 w-full mb-6">
          <AnimatedButton
            onClick={handleGoogleSignIn} // Use the imported handler directly
            disabled={loading}
            className={`flex items-center justify-center w-full px-6 py-3 border border-gray-300 rounded-lg shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 ease-in-out ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <Mail className="w-5 h-5 mr-2" />
            {isLogin ? 'Sign in with Google' : 'Sign up with Google'}
          </AnimatedButton>

          <AnimatedButton
            onClick={handleFacebookSignIn} // Use the imported handler directly
            disabled={loading}
            className={`flex items-center justify-center w-full px-6 py-3 border border-gray-300 rounded-lg shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 ease-in-out ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
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
        <form onSubmit={localHandleFormSubmit} className="w-full space-y-4">
          {!isLogin && (
            <AnimatedDiv>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name (Optional)
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-200 ease-in-out"
                placeholder="John Doe"
              />
            </AnimatedDiv>
          )}

          <AnimatedDiv>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-200 ease-in-out"
              placeholder="********"
            />
          </AnimatedDiv>

          {!isLogin && (
            <AnimatedDiv>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-200 ease-in-out"
                placeholder="********"
              />
            </AnimatedDiv>
          )}

          <AnimatedButton
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 ease-in-out transform hover:scale-105 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? (isLogin ? 'Signing In...' : 'Signing Up...') : (isLogin ? 'Sign In' : 'Sign Up')}
          </AnimatedButton>
        </form>

        <AnimatedP className="mt-6 text-center text-sm text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
          <button
            onClick={toggleForm}
            className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline transition-all duration-200 ease-in-out"
            disabled={loading}
          >
            {isLogin ? 'Sign Up' : 'Sign In'}
          </button>
        </AnimatedP>
      </AnimatedDiv>
    </AnimatedSection>
  );
};

export default AccountPage;