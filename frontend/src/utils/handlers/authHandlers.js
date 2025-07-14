// frontend/src/utils/handlers/authHandlers.js

import { loginUserThunk, registerUserThunk, setError, clearAuthMessages } from '../../reduxStore/user/userSlice';

export const handleGoogleSignIn = () => {
  console.log('[authHandlers] Google Sign-In initiated.');
  // Implement actual Google Sign-In logic here
  // For now, it's just a placeholder. You might integrate with Firebase, an OAuth provider, etc.
  // You might want to dispatch an action here as well, e.g., dispatch(googleSignInThunk());
};

export const handleFacebookSignIn = () => {
  console.log('[authHandlers] Facebook Sign-In initiated.');
  // Implement actual Facebook Sign-In logic here
  // Similar to Google, integrate with Facebook SDK or an OAuth provider.
  // You might want to dispatch an action here as well, e.g., dispatch(facebookSignInThunk());
};

export const handleFormSubmit = async ({ isLogin, email, password, confirmPassword, name, dispatch }) => {
  console.log('[authHandlers] Form submitted. Clearing previous messages.');
  dispatch(clearAuthMessages());

  if (!isLogin && password !== confirmPassword) {
    console.warn('[authHandlers] Password mismatch during registration.');
    dispatch(setError('Passwords do not match.'));
    return;
  }

  try {
    if (isLogin) {
      console.log('[authHandlers] Dispatching loginUserThunk...');
      dispatch(loginUserThunk({ email, password }));
    } else {
      console.log('[authHandlers] Dispatching registerUserThunk...');
      dispatch(registerUserThunk({ email, password, name }));
    }
  } catch (err) {
    // This catch block is mostly for synchronous errors during dispatch itself,
    // async errors from thunks are handled in extraReducers.
    console.error("[authHandlers] Unexpected error during form submit dispatch:", err);
  }
};