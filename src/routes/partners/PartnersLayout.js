import { BrowserDetectContext } from "providers/BrowserEventProvider";
import { Suspense, useContext } from "react";
import { Outlet } from "react-router-dom";
import ManagerHeader from "components/manager/ManagerHeader";
import { CContainer, CSpinner } from "@coreui/react";
import ManagerFooter from "components/manager/ManagerFooter";
import PartnersSideBar from "./front/PartnersSideBar";

function PartnersLayout() {
    const { isMobile } = useContext(BrowserDetectContext);

    return (
        <>
            <div>
                <PartnersSideBar />
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
        </>
    );
}

export default PartnersLayout;
