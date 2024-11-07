import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import style from "./AdminLayout.module.css";
import { Routes, Route, NavLink, Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import ManagerHeader from "components/manager/ManagerHeader";
import { CContainer, CSpinner } from "@coreui/react";
import { Suspense, useEffect, useState } from "react";
import ManagerFooter from "components/manager/ManagerFooter";
import AdminSideBar from "./AdminSideBar";

function AdminLayout(props) {
  const [isMounted, setMounted] = useState();
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {
        isMounted &&
        <div style={{ width: "max-content", minWidth: "100%" }}>


          <AdminSideBar />
          <div className="wrapper d-flex flex-column min-vh-100 bg-light">
            <ManagerHeader />
            <div className="body flex-grow-1 px-3" style={{ backgroundColor: "#F5F6FB" }}>
              <CContainer lg>
                <Suspense fallback={<CSpinner color="primary" />}>
                  <Outlet />
                </Suspense>
              </CContainer>
            </div>
            <ManagerFooter />
          </div>
        </div>
      }
    </>
  );
}

export default AdminLayout;
