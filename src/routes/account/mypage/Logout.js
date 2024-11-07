import P from "components/P";
import Container from "layouts/container/Container";
import FlexChild from "layouts/flex/FlexChild";
import VerticalFlex from "layouts/flex/VerticalFlex";
import Center from "layouts/wrapper/Center";
import style from "./Logout.module.css";
import NiceModal from "@ebay/nice-modal-react";
import { useTranslation } from "react-i18next";
import { removeLocalStorage } from "shared/utils/Utils";
import { useDispatch } from "react-redux";
import { AuthReducer } from "shared/redux/reducers/auth/AuthReducer";
import { CartReducer } from "shared/redux/reducers/shopping/CartReducer";
import { OrderInfoReducer } from "shared/redux/reducers/shopping/OrderInfoReducer";
import { WishReducer } from "shared/redux/reducers/shopping/WishReducer";
import { DirectPurchaseReducer } from "shared/redux/reducers/shopping/DirectPurchaseReducer";
import { SearchConditionReducer } from "shared/redux/reducers/product/SearchConditionReducer";
import { HistoryReducer } from "shared/redux/reducers/history/HistoryReducer";
import { VendorReducer } from "shared/redux/reducers/vendor/VendorReducer";
import { PointReducer } from "shared/redux/reducers/shopping/PointReducer";
import { useNavigate } from "react-router-dom";
import { BrowserDetectContext } from "providers/BrowserEventProvider";
import { useContext } from "react";
import MypageContentHeader from "./header/MypageContentHeader";

function Logout() {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { isMobile } = useContext(BrowserDetectContext);

    const onLogoutClick = () => {
        NiceModal.show("confirm", {
            message: t("confirmLogout"),
            confirmText: t("confirm"),
            cancelText: t("cancel"),
            onConfirm: onConfirm,
            onCancel: onCancel
        });
    }

    const onConfirm = () => {
        removeLocalStorage("token");
        dispatch(AuthReducer.actions.reset());
        dispatch(CartReducer.actions.reset());
        dispatch(OrderInfoReducer.actions.reset());
        dispatch(WishReducer.actions.reset());
        dispatch(DirectPurchaseReducer.actions.reset());
        dispatch(SearchConditionReducer.actions.reset());
        dispatch(HistoryReducer.actions.reset());
        dispatch(VendorReducer.actions.reset());
        dispatch(PointReducer.actions.reset());
        navigate("/", { replace: true });
    }

    const onCancel = () => {

    }
    return (
        <VerticalFlex backgroundColor={"white"} padding={isMobile ? "" : "30px 0"} >
            <FlexChild>
                {
                    isMobile &&
                    <MypageContentHeader />
                }
            </FlexChild>
            <FlexChild padding={isMobile ? "30px 0 0 0 " : ""}>
                <div className={style.horizontalLine}></div>
            </FlexChild>

            <FlexChild>
                <P cursor onClick={onLogoutClick} color={"white"} size={"18pt"} padding={"10px 20px"} backgroundColor={"var(--main-color)"}>로그아웃</P>
            </FlexChild>
        </VerticalFlex>
    );
}

export default Logout;