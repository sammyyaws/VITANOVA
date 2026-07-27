"use client";

import { Provider } from "react-redux";
import { store } from "../store/store";
import { useEffect } from "react";
import { loginSuccess } from "../store/auth/authSlice";
import { loadAuth } from "../utils/authStorage";


function ReduxInitializer({
    children
}:{
    children: React.ReactNode
}){

    useEffect(()=>{

        const auth = loadAuth();

        if(auth){

            store.dispatch(
                loginSuccess(auth)
            );

        }

    },[]);


    return children;
}



export default function ReduxProvider({
    children,
}:{
    children: React.ReactNode;
}) {

    return (
        <Provider store={store}>
            <ReduxInitializer>
                {children}
            </ReduxInitializer>
        </Provider>
    );
}