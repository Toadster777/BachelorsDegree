import { createContext, useContext } from "react";

export const AuthContext = createContext({
    user: undefined,
    isLoading: false,
    isLoggedIn: false,
    setUser: () => { },
});

export const useAuthContext = () => useContext(AuthContext);