import { configureStore } from '@reduxjs/toolkit';
import { signupReducer } from '../redux/signup';
import { imgUploadReducer } from "../redux/imageuploadSlice"
export const store = configureStore({
  reducer: {
    signupReducer,
    imgUploadReducer
  },
});
