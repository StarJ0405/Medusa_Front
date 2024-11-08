import style from "./OrderStatusDetail.module.css";
import VerticalFlex from "layouts/flex/VerticalFlex";
import FlexChild from "layouts/flex/FlexChild";
import AdminDateChoice from "../datePicker/AdminDateChoice";
import AdminTable from "../table/AdminTable";
import { useEffect, useState } from "react";
import { requester, adminRequester } from "App";
import TableSearchCard from "routes/table/search/TableSearchCard";
import SingleAdminTable from "../table/SingleAdminTable";
import { useParams } from "react-router-dom";
import { timers } from "jquery";

function OrderStatusDetail(props) {
  const [mounted, setMounted] = useState(false);
  const [data, setData] = useState([]);
  const [type, setType] = useState("single");

  const date = new Date();
  const koreaTimeDiff = 9 * 60; // 한국은 UTC+9
  const koreaTime = new Date(date.getTime() + koreaTimeDiff * 60000);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const now = new Date();
    now.setTime(now.getTime() - now.getTimezoneOffset() - 60 * 1000);
    if (mounted) {
      // requester.getSearchForOrderTerms(data, (result) => {
      //     console.log("mounted", result.data);
      //     setDummyData(result.data);
      // })
      const end = new Date();
      end.setTime(end.getTime() - end.getTimezoneOffset() * 60 * 1000);
      const start = new Date(end);
      start.setHours(0, 0, 0, 0);
      start.setTime(start.getTime() - start.getTimezoneOffset() * 60 * 1000);
      adminRequester.getOrders(
        {
          startDate: start.getTime(),
          endDate: end.getTime(),
        },
        (result) => {
          console.log("searched orders!!!!!!!!!!!!", result);
        }
      );
    }
  }, [mounted]);

  const callback = (searchCondition) => {
    // let data = searchCondition;

    // data.status = null;

    // requester.getSearchForOrderTerms(searchCondition, (result) => {
    //   console.log("callback", result.data);
    //   setDummyData(result.data);
    // });
    console.log(searchCondition);
    adminRequester.getOrders(searchCondition, (result) => {
      console.log("searchCondition!!!!!!!!!!!!", result);
      setData(result.orders);
    });
  };

  const dataCallback = (value) => {
    setData(value);
  };

  const theader = [
    {
      width: 150,
      text: "주문일(결제일)",
      justifyContent: "flex-start",
      weight: "bold",
      code: "createDateTime",
    },
    {
      width: 120,
      text: "주문번호",
      justifyContent: "flex-start",
      weight: "bold",
      code: "id",
    },
    {
      width: 100,
      text: "주문자",
      justifyContent: "flex-start",
      weight: "bold",
      code: "receiverName",
    },
    {
      width: null,
      text: "상품명",
      justifyContent: "flex-start",
      weight: "bold",
      code: "orderProducts",
    },
    {
      width: 80,
      text: "수량",
      justifyContent: "flex-start",
      weight: "bold",
      code: "orderProducts",
    },
    {
      width: 80,
      text: "구매금액",
      justifyContent: "flex-start",
      weight: "bold",
      code: "amount",
    },
    {
      width: 150,
      text: "상태",
      justifyContent: "flex-start",
      weight: "bold",
      code: "status",
    },
    {
      width: 120,
      text: "운송장 번호",
      justifyContent: "flex-start",
      weight: "bold",
    },
    { width: 70, text: "기타", justifyContent: "flex-start", weight: "bold" },
  ];
  return (
    <div className={style.container}>
      <VerticalFlex>
        <FlexChild>
          <TableSearchCard callback={callback} index={4} />
        </FlexChild>
        <FlexChild>
          {type && type === "single" ? (
            <SingleAdminTable
              theader={theader}
              mockData={data}
              initTabIndex={0}
              callback={dataCallback}
            />
          ) : (
            <AdminTable theader={theader} mockData={data} initTabIndex={0} />
          )}
        </FlexChild>
      </VerticalFlex>
    </div>
  );
}

export default OrderStatusDetail;
