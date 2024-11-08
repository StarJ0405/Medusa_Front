import { Navigate, Outlet } from "react-router-dom";
import { getRoleFromTokenPayload, getTokenPayload } from "shared/utils/Utils";
import { Provider, useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import useLocalStorage from "shared/hooks/useLocalStorage";
import { toast } from "react-toastify";
import { adminRequester } from "App";
function RequireAdminAuth(props) {
  //   const [token, setToken] = useLocalStorage("token");
  const { allowedRoles } = props;
  const [user, setUser] = useState();
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    adminRequester.getUser((r) => {
      setUser(r.user);
      setLoading(false);
    });
  }, []);

  if (!isLoading) {
    if (user) {
      // let tokenPayload = getTokenPayload(token);
      // if (tokenPayload) {
      //   let roles = getRoleFromTokenPayload(tokenPayload);
      //   // console.log(roles);
      //   let isValid =
      //     allowedRoles.filter((allowedRole) => roles.indexOf(allowedRole) >= 0)
      //       .length > 0;
      //   if (isValid) {
      //     return <Outlet />;
      //   } else {
      //     return <Navigate replace to="/admin/login" />;
      //   }
      // } else {
      //   return <Navigate replace to="/admin/login" />;
      // }
      return <Outlet />;
    } else {
      return <Navigate replace to="/admin/login" />;
    }
  } else {
    return <></>;
  }
}

export default RequireAdminAuth;
