import _ from "lodash";
import "react-grid-layout/css/styles.css";
import DashboardContainer from "../DashboardContainer";
import OrderStatusDetail from "./OrderStatusDetail";

function OrderStatusDetailLayout() {
    return (
        <OrderStatusDetail type={"single"} />
    );
}

export default OrderStatusDetailLayout;