import OrderStatus from "./statistics/OrderStatus";
import style from "./DashboardCard.module.css";
import clsx from "clsx";
import StatisticsExchangeAndRefund from "./statistics/StatisticsExchangeAndRefund";
import DelayStatistics from "./statistics/DelayStatistics";
import ProductManagement from "./product/ProductManagement";
import ArticleStatistics from "./statistics/ArticleStatistics";
import WorkSharing from "./work/WorkSharing";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import SalesStatus from "./statistics/SalesStatus";
import CustomIcon from "components/icons/CustomIcon";
import Center from "layouts/wrapper/Center";
import CourierInterlocking from "./orderManagement/addition/CourierInterlocking";
import DirectDeposit from "./orderManagement/addition/DirectDeposit";
import ProductStatus from "./product/ProductStatus";
import OutOfStock from "./product/OutOfStock";
import NeedToBeManagedProduct from "./product/NeedToBeManagedProduct";
import ProductSetting from "./product/ProductSetting";
import ProductManagementBanner from "./product/ProductManagementBanner";
import MemberStatisticsTotal from "./statistics/MemberStatisticsTotal";
import Notice from "routes/admin/dashboardCard/notice/Notice";
import Manual from "./manual/Manual";
import Faq from "routes/admin/dashboardCard/faq/Faq";
import ChoiceToggleMenu from "./product/setting/ChoiceToggleMenu";
import UserStatus from "./statistics/UserStatus";
import UserStatusInfo from "./statistics/UserStatusInfo";
import ArticleOperStatus from "../article/ArticleOperStatus";
import ArticleStatus from "../article/ArticleStatus";
import LatestArticles from "../article/LatestArticles";
import EventsInProgress from "../promotion/EventsInProgress";
import CouponStatus from "../promotion/CouponStatus";
import SalesTodayStatus from "./statistics/detail/SalesTodayStatus";
import SalesTodayStatusData from "./statistics/detail/SalesTodayStatusData";
import WeeklySalesVolume from "./statistics/detail/WeeklySalesVolume";
import WeeklyCartVolume from "./statistics/detail/WeeklyCartVolume";
import WeeklyCancelAndReturn from "./statistics/detail/WeeklyCancelAndReturn";
import OrderStatusDetail from "../order/OrderStatusDetail";
import DateChoice from "components/inputs/datePicker/dateChoice/DateChoice";
import ProductManagementDetail from "../product/ProductManagementDetail";
import ProductStatusDetail from "../product/page/ProductStatusDetail";
import ProductRegisterDetail from "../product/page/ProductRegisterDetail";
import RegisteredProduct from "../product/page/RegisteredProduct";
import MainProductManegement from "../product/page/MainProductManegement";
import ProductOption from "../product/page/ProductOption";
import ProductOptionDetail from "../product/page/ProductOptionDetail";
import StockManagement from "../product/page/StockManagement";
import ReservationRegistrationManual from "../product/page/ReservationRegistrationManual";
import UserInfoManagement from "../user/UserInfoManagement";
import UserActivityManagement from "../user/UserActivityManagement";
import ProductDetailRegister from "../product/page/ProductDetailRegister";
import ProductRegisterOptionDetail from "../product/page/ProductRegisterOptionDetail";
import AdminDatePicker from "../datePicker/AdminDatePicker";
import PartnersStatisticsTotal from "./statistics/PartnersStatisticsTotal";
import ExhibitionProgress from "./exhibition/ExhibitionProgress";

function DashboardCard(props) {
    const { index, data } = props;
    // console.log(props.index);
    return (
        <div className={style.card}>
            {/* <div className={clsx(draggableHandle, { [style.handle]: props.index != 0 || props.index != 1 || props.index != 2 } )}>
                <div style={{
                    display: "flex",
                }}>
                    <CustomIcon name={"move"} width={15} />
                </div>
            </div> */}
            {
                {
                    0: <OrderStatus />,
                    1: <StatisticsExchangeAndRefund />,
                    2: <DelayStatistics />,
                    3: <ProductManagement />,
                    4: <ArticleStatistics />,
                    5: <WorkSharing />,
                    6: <SalesStatus />,
                    7: <MemberStatisticsTotal />,
                    8: <Notice />,
                    9: <Manual />,
                    10: <Faq />,
                    11: <ChoiceToggleMenu name={"courierInterlocking"} />,
                    12: <ChoiceToggleMenu name={"autoDepositConfirm"} />,
                    13: <ProductStatus />,
                    14: <OutOfStock />,
                    15: <NeedToBeManagedProduct />,
                    16: <ChoiceToggleMenu name={"productRegistration"} />,
                    17: <ChoiceToggleMenu name={"registeredProductManagement"} />,
                    18: <ChoiceToggleMenu name={"productCategory"} />,
                    19: <ChoiceToggleMenu name={"mainProductManagement"} />,
                    20: <ChoiceToggleMenu name={"productOptionManagement"} />,
                    21: <ChoiceToggleMenu name={"stockManagement"} />,
                    22: <ProductManagementBanner />,
                    23: <UserStatus />,
                    24: <UserStatusInfo />,
                    25: <ChoiceToggleMenu name={"userInfoInquiry"} />,
                    26: <ChoiceToggleMenu name={"userManagement"} />,
                    27: <ArticleOperStatus />,
                    28: <ArticleStatus />,
                    29: <LatestArticles />,
                    30: <ChoiceToggleMenu name={"articleManagement"} />,
                    31: <ChoiceToggleMenu name={"postManagement"} />,
                    32: <EventsInProgress />,
                    33: <CouponStatus />,
                    34: <ChoiceToggleMenu name={"eventManagement"} />,
                    35: <ChoiceToggleMenu name={"couponManagement"} />,
                    36: <SalesTodayStatus />,
                    37: <SalesTodayStatusData />,
                    38: <WeeklySalesVolume />,
                    39: <WeeklyCartVolume />,
                    40: <WeeklyCancelAndReturn />,
                    41: <ChoiceToggleMenu name={"statistics"} />,
                    42: <ChoiceToggleMenu name={"productStatistics"} />,
                    43: <OrderStatusDetail type={"single"} />,
                    44: <CourierInterlocking />,
                    45: <DirectDeposit />,
                    46: <ProductManagementDetail />,
                    47: <ProductStatusDetail />,
                    48: <ProductRegisterDetail />,
                    49: <RegisteredProduct />,
                    50: <MainProductManegement />,
                    51: <ProductOption />,
                    52: <ProductOptionDetail />,
                    53: <StockManagement />,
                    54: <ReservationRegistrationManual />,
                    55: <UserInfoManagement />,
                    56: <UserActivityManagement />,
                    57: <ProductRegisterOptionDetail />,
                    58: <ProductDetailRegister />,
                    59: <OrderStatusDetail type={"tab"} />,
                    60: <PartnersStatisticsTotal />,
                    61: <ExhibitionProgress />
                    
                    
                    // 0: <OrderStatus orderManagement />,
                    // 1: <StatisticsExchangeAndRefund orderManagement />,
                    // 2: <DelayStatistics />,
                    // 3: <CourierInterlocking />,
                    // 4: <DirectDeposit />
                }[index]
            }
        </div>
    )
}
export default DashboardCard;