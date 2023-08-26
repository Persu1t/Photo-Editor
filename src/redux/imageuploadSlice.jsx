import { createSlice } from "@reduxjs/toolkit";

const imageState = JSON.parse(localStorage.getItem("imageUpload"));

const initialState = {
    uploadedImage: imageState?.uploadedImage || {
        image: "https://i0.wp.com/thinkfirstcommunication.com/wp-content/uploads/2022/05/placeholder-1-1.png?fit=1200%2C800&ssl=1",
        width: 1000,
        height: 550
    },
}

const imgUploadSlice = createSlice({
    name: "imageUpload",
    initialState,
    reducers: {
        uploadImage: (state, action) => {
            const { imageDimensions } = action.payload
            console.log(imageDimensions)
            state.uploadedImage.image = imageDimensions.src || initialState.uploadedImage.image;
            state.uploadedImage.width = imageDimensions.width || initialState.uploadedImage.width;
            state.uploadedImage.height = imageDimensions.height || initialState.uploadedImage.height;
            localStorage.setItem("imageUpload", JSON.stringify(state));
        },

        removeUploadedImage: (state, action) => {
            state.uploadedImage.image = "https://i0.wp.com/thinkfirstcommunication.com/wp-content/uploads/2022/05/placeholder-1-1.png?fit=1200%2C800&ssl=1";
            state.uploadedImage.width = 1000;
            state.uploadedImage.height = 550;
            localStorage.removeItem("imageUpload");
            localStorage.removeItem("imageDimensions");
        }
    }
});

export const imgUploadReducer = imgUploadSlice.reducer;
export const imgUploadAction = imgUploadSlice.actions;
export const imgUploadSelector = (state) => state.imgUploadReducer;