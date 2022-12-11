
const isAuth = () => {
    if(localStorage.getItem("userInfo"))
        return true;
    return false;
}

export {isAuth}