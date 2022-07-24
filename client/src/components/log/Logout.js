import React from 'react';
import axios from 'axios';
import cookie from "js-cookie";

const Logout = () => {

    const removeCookie = (key) => {
        if(window !== undefined) {
            cookie.remove(key, {expires: 1})
        }
    }

    const handleLogout = async() => {
        await axios({
            methode: "get",
            url: `${process.env.REACT_APP_API_URL}api/user/logout`,
            withCredentials: true
        }).then(() => removeCookie('jwt'))
        .catch((err) => console.log(err))

        window.location.href = "/";
    }
    
    return (
       <li onClick={handleLogout}>
           <img src="./img/icons/logout.svg" alt="logout" />
       </li>
    );


};

export default Logout;