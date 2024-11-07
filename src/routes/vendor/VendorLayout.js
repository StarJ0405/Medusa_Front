import { CContainer, CSpinner } from "@coreui/react";
import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import ManagerFooter from "components/manager/ManagerFooter";
import ManagerHeader from "components/manager/ManagerHeader";

import VendorSideBar from "./VendorSideBar";

function VendorLayout() {
  return (
    <div>
      <VendorSideBar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <ManagerHeader />
        <div className="body flex-grow-1 px-3">
          <CContainer lg>
            <Suspense fallback={<CSpinner color="primary" />}>
              <Outlet />
            </Suspense>
          </CContainer>
        </div>
        <ManagerFooter />
      </div>
    </div>
    
  )
}

export default VendorLayout;
