import { Navigate, Outlet } from "react-router-dom";
import { getRoleFromTokenPayload, getTokenPayload } from "shared/utils/Utils";
import { Provider, useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import useLocalStorage from "shared/hooks/useLocalStorage";
import { toast } from "react-toastify";

function RequireAuth(props) {
    // const [token, setToken] = useLocalStorage("token");
    const [token, setToken] = useLocalStorage("_medusa_jwt");
    const { allowedRoles } = props;

    const getCookie = (cookieName) => {
        const name = `${cookieName}=`;
        const decodedCookie = decodeURIComponent(document.cookie);
        const cookieArray = decodedCookie.split(';');

        for (let i = 0; i < cookieArray.length; i++) {
            let cookie = cookieArray[i].trim();
            if (cookie.indexOf(name) === 0) {
                return cookie.substring(name.length, cookie.length);
            }
        }
        return null;
    };

    const medusaJwt = getCookie('_medusa_jwt');

    if (medusaJwt) {
        let tokenPayload = getTokenPayload(medusaJwt);
        if (tokenPayload) {
            // let roles = getRoleFromTokenPayload(tokenPayload);
            let roles = 'customer';
            // console.log(roles);

            // 로그인한 정보(ex.role)로 valid 해서 루트 페이지로 돌려보내는 방법
            // let isValid = allowedRoles.filter((allowedRole) => roles.indexOf(allowedRole) >= 0).length > 0;
            let isValid = true;
            if (isValid) {
                return <Outlet />;
            } else {
                return <Navigate replace to="/login" />;
            }
        } else {

            return <Navigate replace to="/login" />;
        }
    } else {

        return <Navigate replace to="/login" />;
    }
}

export default RequireAuth;