// frontend/src/utils/handlers/authHandlers.js

import {
  loginUserThunk,
  registerUserThunk,
  setError,
  clearAuthMessages,
} from "../../reduxStore/user/userSlice";

export const handleGoogleSignIn = () => {
  // console.log("Google Sign-In initiated.");
};

export const handleFacebookSignIn = () => {
  // console.log("Facebook Sign-In initiated.");
};

export const handleFormSubmit = async ({
  isLogin,
  email,
  password,
  confirmPassword,
  name,
  dispatch,
}) => {
  dispatch(clearAuthMessages());

  if (!isLogin && password !== confirmPassword) {
    dispatch(setError("Passwords do not match."));
    return;
  }

  try {
    if (isLogin) {
      dispatch(loginUserThunk({ email, password }));
    } else {
      dispatch(registerUserThunk({ email, password, name }));
    }
  } catch (err) {
    // console.error("Unexpected error during form submit dispatch:", err);
  }
};
