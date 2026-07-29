import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface User {
    user_id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    role?: string;
}


interface AuthState {

    user: User | null;

    accessToken: string | null;

    refreshToken: string | null;

    isAuthenticated: boolean;

    loading: boolean;

    error: string | null;
}


const initialState: AuthState = {

    user: null,

    accessToken: null,

    refreshToken: null,

    isAuthenticated: false,

    loading: false,

    error: null,

};



const authSlice = createSlice({

    name: "auth",

    initialState,

    reducers: {


        loginSuccess: (
            state,
            action: PayloadAction<{
                user: User;
                access: string;
                refresh: string;
            }>
        ) => {


    state.user = action.payload.user;
    state.accessToken = action.payload.access;
    state.refreshToken = action.payload.refresh;
    state.isAuthenticated = true;
        },


        logout: (state)=>{
            state.user = null;
            state.accessToken = null;

            state.refreshToken = null;

            state.isAuthenticated = false;

        },


        setError: (
            state,
            action: PayloadAction<string>
        )=>{

            state.error = action.payload;

        }

    }

});


export const {
    loginSuccess,
    logout,
    setError
} = authSlice.actions;


export default authSlice.reducer;