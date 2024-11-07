import { BrowserRouter as Router, Routes, Route, unstable_HistoryRouter as HistoryRouter, Navigate, useNavigate, useLocation, Outlet } from "react-router-dom";
import VendorLayout from "routes/vendor/VendorLayout";
import Dashboard from "components/manager/views/dashboard/Dashboard";
import RequireAuth from "shared/utils/RequireAuth";
import PeriodSalesStatistics from "routes/admin/vendor/sales/PeriodSalesStatistics";
import AccountSalesStatistics from "routes/admin/vendor/sales/AccountSalesStatistics";
import CategorySalesStatistics from "routes/admin/vendor/sales/CategorySalesStatistics";

function VendorRouter({ allowedRoles }) {
    return (
        <Routes>
            <Route path="" element={<RequireAuth allowedRoles={allowedRoles} />}>
                <Route path="" element={<VendorLayout />}>
                    <Route path="periodSales" element={<PeriodSalesStatistics />} />
                    <Route path="accountSales" element={<AccountSalesStatistics />} />
                    <Route path="categorySales" element={<CategorySalesStatistics />} />
                </Route>
            </Route>
        </Routes>
    );
}

export default VendorRouter;