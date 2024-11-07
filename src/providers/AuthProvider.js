import { createContext, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import useAltEffect from "shared/hooks/useAltEffect";
import useLocalStorage from "shared/hooks/useLocalStorage";
import { AuthReducer } from "shared/redux/reducers/auth/AuthReducer";
import { getRoleFromTokenPayload, getTokenPayload, removeLocalStorage } from "shared/utils/Utils";

export const AuthContext = createContext({ userName: String, isAuthenticated: Boolean, roles: [], authCheckDone : Boolean });

function AuthProvider(props) {
    const [userName, setUserName] = useState("");
    const [isAuthenticated, setAuthenticated] = useState(false);
    const [tokenInStorage, setTokenInStorage] = useLocalStorage("token");
    const [roles, setRoles] = useState();
    const dispatch = useDispatch();
    const { token } = useSelector((state) => ({
        token: state.auth.token,
    }));

    useEffect(() => {
        dispatch(AuthReducer.actions.setToken(tokenInStorage));
    }, []);

    useAltEffect(() => {
        if (token) {
            try {
                let tokenPayload = getTokenPayload(token);
                let userName = "";
                let isAuthenticated = false;

                if (tokenPayload) {
                    let { exp } = tokenPayload;
                    if (Date.now() >= exp * 1000) {
                        removeLocalStorage("token");
                    } else {
                        userName = tokenPayload.userName;
                        let roles = getRoleFromTokenPayload(tokenPayload);
                        isAuthenticated = true;
                        setUserName(userName);
                        setAuthenticated(isAuthenticated);
                        setRoles(roles);
                    }
                } else {
                    
                }
            } catch (e) {

            }
        } else {
            setUserName(null);
            setAuthenticated(false);
            setRoles(null);
        }    
    }, [token]);

    return (
        <AuthContext.Provider value={{userName, isAuthenticated, roles}}>
            {props.children}
        </AuthContext.Provider >
    );
}

export default AuthProvider;