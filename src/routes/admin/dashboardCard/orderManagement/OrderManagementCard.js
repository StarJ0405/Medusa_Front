
import DelayStatistics from "../statistics/DelayStatistics";
import OrderStatus from "../statistics/OrderStatus";
import StatisticsExchangeAndRefund from "../statistics/StatisticsExchangeAndRefund";
import style from "./OrderManagementCard.module.css";
import CourierInterlocking from "./addition/CourierInterlocking";
import DirectDeposit from "./addition/DirectDeposit";



function OrderManagementCard(props) {
    const { index, data, template, type, border, skeleton, draggableHandle } = props;


    return (
        <div className={style.card}>
            {/* <div style={{
                display: "flex"
            }}>
                <div className={draggableHandle} >sd</div>
            </div> */}
            {
                {
                    0: <OrderStatus orderManagement />,
                    1: <StatisticsExchangeAndRefund orderManagement />,
                    2: <DelayStatistics />,
                    3: <CourierInterlocking />,
                    4: <DirectDeposit />
                }[index]

            }
        </div>
    )
}

export default OrderManagementCard;