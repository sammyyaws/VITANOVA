


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


//loadAuth

export const loadAuth = () => {

    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    const user = localStorage.getItem("user");


    if(!accessToken || !refreshToken || !user){
        return null;
    }


    return {
        access: accessToken,
        refresh: refreshToken,
        user: JSON.parse(user)
    };

};