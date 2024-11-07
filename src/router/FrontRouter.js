import Login from "components/manager/views/pages/login/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dispute from "routes/account/dispute/Dispute";
import Inquiry from "routes/account/inquiry/Inquiry";
import AccountInfoLayout from "routes/account/mypage/accountInfo/AccountInfoLayout";
import AccountDisabledLayout from "routes/account/mypage/accoutndDisabled/AccountDisabledLayout";
import CartLayout from "routes/account/mypage/cart/CartLayout";
import CouponLayout from "routes/account/mypage/coupon/CouponLayout";
import DisputeListLayout from "routes/account/mypage/dispute/DisputeListLayout";
import InquiryLayout from "routes/account/mypage/inquiry/InquiryLayout";
import LoginHistoryLayout from "routes/account/mypage/loginHistory/LoginHistoryLayout";
import Logout from "routes/account/mypage/Logout";
import MyPageInfo from "routes/account/mypage/MyPageInfo";
import MyPageLayout from "routes/account/mypage/MyPageLayout";
import OrderListLayout from "routes/account/mypage/order/OrderListLayout";
import TrackOrderLayout from "routes/account/mypage/order/TrackOrderLayout";
import PointLayout from "routes/account/mypage/point/PointLayout";
import RestockLayout from "routes/account/mypage/restock/RestockLayout";
import ReviewListLayout from "routes/account/mypage/review/ReviewListLayout";
import ShippingAddress from "routes/account/mypage/shippingInfo/ShippingAddress";
import ShippingInfoLayout from "routes/account/mypage/shippingInfo/ShippingInfoLayout";
import WishListLayout from "routes/account/mypage/wishList/WishListLayout";
import SignUp from "routes/account/signUp/SignUp";
import ChoiceCompany from "routes/chat/ChoiceCompany";
import TestPage from "routes/chat/TestPage";
import CreateReadChat from "routes/front/CreateReadChat";
import PrivacyPolicy from "routes/front/footer/PrivacyPolicy";
import ShippingPolicy from "routes/front/footer/ShippingPolicy";
import TermsOfUse from "routes/front/footer/TermsOfUse";
import FrontLayout from "routes/front/FrontLayout";
import Home from "routes/front/main/Home";
import Brand from "routes/front/main/productList/Brand";
import SearchResult from "routes/front/main/productList/SearchResult";
import Cart from "routes/front/main/shopping/Cart";
import OrderComplete from "routes/front/main/shopping/OrderComplete";
import OrderFail from "routes/front/main/shopping/OrderFail";
import OrderSummary from "routes/front/main/shopping/OrderSummary";
import ProductDetail from "routes/front/main/shopping/ProductDetail";
import ShoppingLayout from "routes/front/main/shopping/ShoppingLayout";
import BrandsLayout from "routes/front/menuBar/BrandLayout";
import SeriesLayout from "routes/front/menuBar/SeriesLayout";
import LoginLayout from "routes/login/LoginLayout";
import MobileAccount from "routes/mobile/account/MobileAccount";
import MobilePurchaseOrderList from "routes/order/purchaseOrder/MobilePurchaseOrderList";
import PartnersHome from "routes/partners/front/PartnersHome";
import VendorSignIn from "routes/top/VendorSignIn";
import VendorSignUp from "routes/top/VendorSignUp";
import { ADMIN, PARTNERS, USER } from "shared/Roles";
import RequireAuth from "shared/utils/RequireAuth";

function FrontRouter() {
    return (
        <Routes>
            <Route path="/" element={<FrontLayout />}>
                <Route path="chat" element={<CreateReadChat />} />
                <Route path="" element={<Home />} />
                <Route path="productList" state={{ replace: true }} >
                    <Route path="category/:categoryId" element={<SearchResult />} />
                    {/* <Route path="productList" element={<ProductListLayout />} /> */}
                    <Route path="search" element={<SearchResult />} >

                    </Route>
                    <Route path="series" element={<SeriesLayout />} />
                    <Route path="brand" element={<BrandsLayout />}>
                        <Route path=":brandId" element={<Brand />} />
                    </Route>
                    {/* <Route path="brand" element={<BrandsLayout />}>
                        <Route path=":brandId" element={<Brand />} />
                    </Route>
                    <Route path="category" element={<CategoryLayout />}>
                        <Route path=":categoryId" element={<Liquid />} />
                        <Route path="search" element={<SearchResult />} />


                    </Route>
                    <Route path="series" element={<SeriesLayout />} />
                    <Route path="newProduct" element={<NewProduct />} />
                    <Route path="bestProduct" element={<BestProduct />} /> */}
                </Route>
                <Route path="mypage" exact element={<RequireAuth allowedRoles={[USER, ADMIN, PARTNERS]} />} >
                    <Route path="" element={<MyPageLayout />}>
                        <Route path="" exact element={<MyPageInfo />} />
                        <Route path="review" element={<ReviewListLayout />} />
                        <Route path="inquiry" element={<InquiryLayout />} />
                        <Route path="dispute" element={<DisputeListLayout />} />
                        <Route path="orderList" element={<OrderListLayout />} />
                        <Route path="trackOrder" element={<TrackOrderLayout />} />
                        <Route path="coupon" element={<CouponLayout />} />
                        <Route path="point" element={<PointLayout />} />
                        <Route path="accountInfo" element={<AccountInfoLayout />} />
                        <Route path="accountDisabled" element={<AccountDisabledLayout />} />
                        <Route path="loginHistory" element={<LoginHistoryLayout />} />
                        <Route path="shippingInfo" element={<ShippingInfoLayout />} />
                        <Route path="addressRegister" element={<ShippingAddress />} />
                        <Route path="restock" element={<RestockLayout />} />
                        <Route path="logout" element={<Logout />} />
                    </Route>
                </Route>
                <Route path="wishList" exact element={<RequireAuth allowedRoles={[USER, ADMIN, PARTNERS]} />} >
                    <Route path="" element={<MyPageLayout />}>
                        <Route path="" exact element={<WishListLayout />} />
                    </Route>
                </Route>
                <Route path="shopping" element={<RequireAuth allowedRoles={[USER, ADMIN, PARTNERS]} />} >
                    <Route path="" element={<ShoppingLayout />}>
                        <Route path="cart" element={<Cart />} />
                        <Route path="orderSummary" element={<OrderSummary />} />
                        <Route path="orderComplete" element={<OrderComplete />} />
                    </Route>
                </Route>

                <Route path="orderFail" element={<OrderFail />} />
                <Route path="vendorSignUp" element={<VendorSignUp />} />
                <Route path="vendorSignIn" element={<VendorSignIn />} />
                <Route path="product/detail/:id" element={<ProductDetail />} />
                <Route path="singleInquiry" element={<Inquiry />} />
                <Route path="choiceCompany" element={<ChoiceCompany />} />
                <Route path="account">
                    <Route path="" element={<MobileAccount />} />
                    <Route path="purchaseOrder" element={<MobilePurchaseOrderList />} />
                </Route>
                <Route path="termsOfUse" element={<TermsOfUse />} />
                <Route path="privacyPolicy" element={<PrivacyPolicy />} />
                <Route path="shippingPolicy" element={<ShippingPolicy />} />
                <Route path="dispute" element={<Dispute />} />
                <Route path="signUp" element={<SignUp />} />
                <Route path="login" element={<Login />} />
            </Route>

            <Route path="test11" element={<TestPage />} />
            <Route path="partnersHome" element={<PartnersHome />} />
        </Routes>

    );
}

export default FrontRouter;