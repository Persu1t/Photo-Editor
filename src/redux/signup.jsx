import { createSlice } from "@reduxjs/toolkit";
const userState = JSON.parse(localStorage.getItem("user"))
const initialState = {
    user: userState?.user || null,
}

const signupSlice = createSlice({
    name: 'signup',
    initialState,
    reducers:{
        login: (state, action)=>{
            state.user = action.payload
            localStorage.setItem("user", JSON.stringify(state))
            console.log(state.user)

        },

        logout: (state, action)=>{
            localStorage.clear()
            state.user = null

        }
    },
})


export const signupReducer = signupSlice.reducer
export const action = signupSlice.actions
export const signupSelector = (state)=> state.signupReducer
