import { BrowserRouter as Router, Routes, Route, unstable_HistoryRouter as HistoryRouter, Navigate, useNavigate, useLocation, Outlet } from "react-router-dom";
import { USER, VENDOR, ADMIN, PARTNERS } from "shared/Roles";
import FrontRouter from "./FrontRouter";
import VendorRouter from "./VendorRouter";
import AdminRouter from "./AdminRouter";
import PartnersRouter from "./PartnersRouter";

function RootRouter(props) {
    return (
        <Routes>
            <Route path={"/*"} element={<FrontRouter />} />
            <Route path={"/partners/*"} element={<PartnersRouter />} />
            <Route path={"/vendor/*"} element={<VendorRouter allowedRoles={[VENDOR, ADMIN]} />} />
            <Route path={"/admin/*"} element={<AdminRouter allowedRoles={[ADMIN, PARTNERS]} />} />
            {/* 미분류 */}
            {/* <Route path="chat" element={<Chat />} />
        <Route path="setting" element={<MobileSetting />} />
        <Route path="alarm" element={<MobileAlarm />} />
        <Route path="recentlyViewed" element={<MobileViewed />} />
        <Route path="appVideo" element={<MobileAppVideo />} />
        <Route path="quality" element={<MobileAppQuality />} />
        <Route path="profile" element={<MobileProfile />} /> */}
        </Routes>
    );
}

export default RootRouter;