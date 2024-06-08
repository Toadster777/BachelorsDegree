import React, { useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { API, BEARER } from "../constants";
import { useEffect } from "react";
import { getToken } from "../helpers";

const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState();
    const [loginStatus, setLoginStatus] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const authToken = getToken();

    const fetchLoggedInUser = async (token) => {
        setIsLoading(true);
        try {
            const response = await fetch(`${API}/users/me?populate=*`, {
                headers: { Authorization: `${BEARER} ${token}` },
            });
            const data = await response.json();

            setUserData(data);
        } catch (error) {
            console.error(error);
            message.error("Error While Getting Logged In User Details");
        } finally {
            setIsLoading(false);
        }
    };

    const handleUser = (user) => {
        setUserData(user);
    };

    useEffect(() => {
        if (authToken) {
            fetchLoggedInUser(authToken);
            setLoginStatus(true);
        }
    }, [authToken]);
    return (
        <AuthContext.Provider
            value={{ user: userData, setUser: handleUser, isLoading, isLoggedIn: loginStatus }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;