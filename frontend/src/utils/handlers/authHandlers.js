// frontend/src/utils/handlers/authHandlers.js

import {
  loginUserThunk,
  registerUserThunk,
  setError,
  clearAuthMessages,
} from "../../reduxStore/user/userSlice";

export const handleGoogleSignIn = () => {
  // console.log("[authHandlers] Google Sign-In initiated.");
};

export const handleFacebookSignIn = () => {
  // console.log("[authHandlers] Facebook Sign-In initiated.");
};

export const handleFormSubmit = async ({
  isLogin,
  email,
  password,
  confirmPassword,
  name,
  dispatch,
}) => {
  // console.log("[authHandlers] Form submitted. Clearing previous messages.");
  dispatch(clearAuthMessages());

  if (!isLogin && password !== confirmPassword) {
    // console.warn("[authHandlers] Password mismatch during registration.");
    dispatch(setError("Passwords do not match."));
    return;
  }

  try {
    if (isLogin) {
      // console.log("[authHandlers] Dispatching loginUserThunk...");
      dispatch(loginUserThunk({ email, password }));
    } else {
      // console.log("[authHandlers] Dispatching registerUserThunk...");
      dispatch(registerUserThunk({ email, password, name }));
    }
  } catch (err) {
    // This catch block is mostly for synchronous errors during dispatch itself,
    // async errors from thunks are handled in extraReducers.
    console.error(
      "[authHandlers] Unexpected error during form submit dispatch:",
      err,
    );
  }
};
