import {
  BrowserRouter as Router,
  Routes,
  Route,
  unstable_HistoryRouter as HistoryRouter,
  Navigate,
  useNavigate,
  useLocation,
  Outlet,
} from "react-router-dom";
import AdminLayout from "routes/admin/AdminLayout";
import VendorList from "routes/admin/vendor/VendorList";
import RequireAuth from "shared/utils/RequireAuth";
import { USER, VENDOR, ADMIN } from "shared/Roles";

import CategoryManager from "routes/admin/vendor/CategoryManager";
import BrandManager from "routes/admin/vendor/BrandManager";
import ProductManager from "routes/admin/vendor/ProductManager";
import SignUpList from "routes/account/signUp/SignUpList";
import AdminCategoryLayout from "routes/admin/AdminCategoryLayout";
import AdminBrandLayout from "routes/admin/AdminBrandLayout";
import PeriodSalesStatistics from "routes/admin/vendor/sales/PeriodSalesStatistics";
import CategorySalesStatistics from "routes/admin/vendor/sales/CategorySalesStatistics";
import AccountSalesStatistics from "routes/admin/vendor/sales/AccountSalesStatistics";
import CreatePartnersLink from "routes/partners/CreatePartnersLink";
import PartnersHistory from "routes/partners/PartnersHistory";
import MyPartnersAccount from "routes/partners/MyPartnersAccount";
import MyPartnersTotal from "routes/partners/MyPartnersTotal";
import ShippingInfo from "routes/admin/dashboardCard/order/ShippingInfo";
import AllCartsInfo from "routes/admin/cartInfo/AllCartsInfo";
import AdminOrderManagement from "routes/admin/AdminOrderManagement";
import AdminDashboard from "routes/admin/AdminDashboard";
import AdminProductManagement from "routes/admin/AdminProductManagement";
import AdminUserManagement from "routes/admin/AdminUserManagement";
import AdminArticleManagement from "routes/admin/AdminArticleManagement";
import AdminPromotionManagement from "routes/admin/AdminPromotionManagement";
import AdminStatisticsManagement from "routes/admin/AdminStatisticsManagement";
import OrderStatusDetail from "routes/admin/order/OrderStatusDetail";
import OrderStatusDetailLayout from "routes/admin/order/OrderStatusDetailLayout";
import CourierInterlockingLayout from "routes/admin/dashboardCard/orderManagement/addition/CourierInterlockingLayout";
import DirectDepositLayout from "routes/admin/dashboardCard/orderManagement/addition/DirectDepositLayout";
import ProductManagementLayout from "routes/admin/product/ProductManagementLayout";
import ProductStatusDetailLayout from "routes/admin/product/page/ProductStatusDetailLayout";
import ProductRegisterDetailLayout from "routes/admin/product/page/ProductRegisterDetailLayout";
import RegisteredProductLayout from "routes/admin/product/page/RegisteredProductLayout";
import MainProductManagementLayout from "routes/admin/product/page/MainProductManegementLayout";
import ProductOptionLayout from "routes/admin/product/page/ProductOptionLayout";
import ProductOptionDetailLayout from "routes/admin/product/page/ProductOptionDetailLayout";
import StockManagementLayout from "routes/admin/product/page/StockManagementLayout";
import ReservationRegistrationManualLayout from "routes/admin/product/page/ReservationRegistrationManualLayout";

import UserInfoManagementLayout from "routes/admin/user/UserInfoManagementLayout";
import UserActivityManagementLayout from "routes/admin/user/UserActivityManagementLayout";

import UserGroupManagement from "routes/admin/user/UserGroupManagement";
import PromotionRegister from "routes/admin/promotion/PromotionRegister";
import VendorRegister from "routes/vendor/VendorRegister";
import VendorManagement from "routes/vendor/VendorManagement";
import AminExhibitionManagement from "routes/admin/dashboardCard/exhibition/AminExhibitionManagement";
import ExhibitionRegister from "routes/admin/dashboardCard/exhibition/ExhibitionRegister";
import NewProductList from "routes/admin/dashboardCard/product/new/NewProductList";
import RestockProductList from "routes/admin/dashboardCard/product/restock/RestockProductList";
import BestProductList from "routes/admin/dashboardCard/product/best/BestProductList";
import RequireAdminAuth from "shared/utils/RequireAdminAuth";
import FrontLayout from "routes/front/FrontLayout";
import AdminLogin from "components/manager/views/pages/adminLogin/adminLogin";

function AdminRouter({ allowedRoles }) {
  return (
    <Routes>
      <Route path="" element={<RequireAdminAuth allowedRoles={allowedRoles} />}>
        <Route path="" element={<AdminLayout />}>
          <Route path="" element={<AdminDashboard />} />
          <Route path="orderManagement" element={<AdminOrderManagement />} />
          <Route
            path="orderStatus/:keyword"
            element={<OrderStatusDetailLayout />}
          />
          <Route path="user/list" element={<SignUpList />} />
          <Route path="vendor/list" element={<VendorList />} />
          <Route
            path="productManagement"
            element={<AdminProductManagement />}
          />
          <Route path="userManagement" element={<AdminUserManagement />} />
          <Route
            path="articleManagement"
            element={<AdminArticleManagement />}
          />
          <Route
            path="promotionManagement"
            element={<AdminPromotionManagement />}
          />
          <Route path="exhibition" element={<AminExhibitionManagement />} />
          <Route path="exhibition/register" element={<ExhibitionRegister />} />
          <Route path="newProduct" element={<NewProductList />} />
          <Route path="restockProduct" element={<RestockProductList />} />
          <Route path="bestProduct" element={<BestProductList />} />
          <Route path="promotion/register" element={<PromotionRegister />} />
          <Route
            path="statisticsManagement"
            element={<AdminStatisticsManagement />}
          />
          <Route
            path="courierInterlocking"
            element={<CourierInterlockingLayout />}
          />
          <Route path="autoDepositConfirm" element={<DirectDepositLayout />} />
          <Route
            path="productStatus/:id"
            element={<ProductManagementLayout />}
          />
          <Route path="product/:id" element={<ProductStatusDetailLayout />} />
          <Route
            path="productRegistration"
            element={<ProductRegisterDetailLayout />}
          />
          <Route
            path="registeredProductManagement"
            element={<RegisteredProductLayout />}
          />
          <Route
            path="mainProductManagement"
            element={<MainProductManagementLayout />}
          />
          <Route
            path="productOptionManagement"
            element={<ProductOptionLayout />}
          />
          <Route
            path="reservationRegistrationManual"
            element={<ReservationRegistrationManualLayout />}
          />
          <Route
            path="productOption/:id"
            element={<ProductOptionDetailLayout />}
          />
          <Route path="stockManagement" element={<StockManagementLayout />} />
          <Route
            path="userInfoManagement/:id"
            element={<UserInfoManagementLayout />}
          />
          <Route path="userGroupManagement" element={<UserGroupManagement />} />
          <Route
            path="userActivityManagement"
            element={<UserActivityManagementLayout />}
          />
          <Route path="brand" element={<AdminBrandLayout />}>
            <Route path="brand/manager/:id" element={<BrandManager />} />
            <Route path="product/manager/:id" element={<ProductManager />} />
          </Route>
          <Route path="productCategory" element={<AdminCategoryLayout />}>
            <Route path="category/manager/:id" element={<CategoryManager />} />
            <Route path="product/manager/:id" element={<ProductManager />} />
            <Route path="brand/manager/:id" element={<BrandManager />} />
          </Route>
          <Route path="periodSales" element={<PeriodSalesStatistics />} />
          <Route path="accountSales" element={<AccountSalesStatistics />} />
          <Route path="categorySales" element={<CategorySalesStatistics />} />
          <Route path="createPartnersLink" element={<CreatePartnersLink />} />
          <Route path="partnersLinkHistory" element={<PartnersHistory />} />
          <Route path="myPartnersAccount" element={<MyPartnersAccount />} />
          <Route path="myPartnersTotal" element={<MyPartnersTotal />} />
          <Route path="shippingInfo" element={<ShippingInfo />} />
          <Route path="allCarts" element={<AllCartsInfo />} />
          <Route path="vendorRegister" element={<VendorRegister />} />
          <Route path="vendorManagement" element={<VendorManagement />} />
        </Route>
      </Route>
      <Route path="" element={<FrontLayout />}>
        <Route path="login" element={<AdminLogin />} />
      </Route>
    </Routes>
  );
}
export default AdminRouter;
