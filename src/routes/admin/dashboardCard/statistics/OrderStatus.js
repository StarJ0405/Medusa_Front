import style from "./OrderStatus.module.css";
import { CChartBar, CChartLine } from "@coreui/react-chartjs";
import P from "components/P";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import VerticalFlex from "layouts/flex/VerticalFlex";
import Center from "layouts/wrapper/Center";
import CustomIcon from "components/icons/CustomIcon";
import Inline from "layouts/container/Inline";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { requester, adminRequester } from "App";
import { useTranslation } from "react-i18next";

function OrderStatus(props) {
  const { type } = props;
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  const [orderStatus, setOrderStatus] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      adminRequester.getOrderStatus({ status: "order" }, (result) => {
        const data = result.data;
        const orderStatusData = [
          {
            text: t("WaitingForPayment"),
            value: "waitingForPayment",
            count: data.paid_ready,
            icon: (
              <CustomIcon
                name={"waitingForPayment"}
                width={30}
                color={"black"}
              />
            ),
          },
          {
            text: t("PreparingShipment"),
            value: "preparingShipment",
            count: data.product_ready,
            icon: (
              <CustomIcon
                name={"preparingShipment"}
                width={30}
                color={"black"}
              />
            ),
          },
          {
            text: t("ReadyForShipment"),
            value: "readyForShipment",
            count: data.ship_ready,
            icon: (
              <CustomIcon
                name={"readyForShipment"}
                width={30}
                color={"black"}
              />
            ),
          },
          {
            text: t("Shipping"),
            value: "shipping",
            count: data.shipping,
            icon: <CustomIcon name={"shipping"} width={30} color={"black"} />,
          },
        ];
        setOrderStatus(orderStatusData);
      });
    }
  }, [mounted]);

  const onStatusClick = (value) => {
    navigate(`/admin/orderStatus/${value}`);
  };

  return (
    <HorizontalFlex>
      <FlexChild height={"100%"} width={"max-content"}>
        <div className={style.label}>
          <VerticalFlex gap={5}>
            <FlexChild width={100}>
              <CustomIcon name={"orderList"} width={30} color={"white"} />
            </FlexChild>
            <FlexChild>
              <Center>
                <P size={15}>주문현황</P>
              </Center>
            </FlexChild>
          </VerticalFlex>
        </div>
      </FlexChild>
      <FlexChild height={"100%"}>
        <div className={style.contentArea}>
          <Inner
            type={type}
            orderStatus={orderStatus}
            onStatusClick={onStatusClick}
          />
        </div>
      </FlexChild>
    </HorizontalFlex>
  );
}
const Inner = ({ type, orderStatus, onStatusClick }) => {
  switch (type) {
    case "order":
      return (
        <HorizontalFlex gap={5}>
          {orderStatus &&
            orderStatus.map((data, index) => (
              <FlexChild key={index} height={"100%"}>
                <div className={style.boxArea}>
                  <VerticalFlex gap={5}>
                    <FlexChild width={30}>{data.icon}</FlexChild>
                    <FlexChild>
                      <P>{data.text}</P>
                    </FlexChild>
                    <FlexChild justifyContent={"flex-end"}>
                      <Inline>
                        <P
                          hover
                          onClick={() => onStatusClick(data.value)}
                          cursor
                          weight={"bold"}
                          color={"var(--main-color)"}
                        >
                          {data.count}
                        </P>
                        <P>건</P>
                      </Inline>
                    </FlexChild>
                  </VerticalFlex>
                </div>
              </FlexChild>
            ))}
        </HorizontalFlex>
      );
    default:
      return (
        <VerticalFlex gap={5} padding={10}>
          {orderStatus &&
            orderStatus.map((data, index) => (
              <FlexChild key={index} height={"100%"}>
                <HorizontalFlex gap={5}>
                  <FlexChild>
                    <P>{data.text}</P>
                  </FlexChild>
                  <FlexChild justifyContent={"flex-end"}>
                    <Inline>
                      <P
                        hover
                        onClick={() => onStatusClick(data.value)}
                        cursor
                        weight={"bold"}
                        color={"var(--main-color)"}
                      >
                        {data.count}
                      </P>
                      <P>건</P>
                    </Inline>
                  </FlexChild>
                </HorizontalFlex>
              </FlexChild>
            ))}
        </VerticalFlex>
      );
  }
};

export default OrderStatus;
