


export const saveAuth = (
    access:string,
    refresh:string,
    user:any
) => {

    localStorage.setItem(
        "accessToken",
        access
    );

    localStorage.setItem(
        "refreshToken",
        refresh
    );

    localStorage.setItem(
        "user",
        JSON.stringify(user)
    );

    
};


export const clearAuth = () => {

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");

};