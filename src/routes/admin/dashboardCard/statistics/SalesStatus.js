import { useEffect, useRef, useState, useContext } from "react";
import style from "./SalesStatus.module.css";
import {
  Chart,
  LineController,
  BarController,
  LineElement,
  BarElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Legend,
} from "chart.js";
import FlexChild from "layouts/flex/FlexChild";
import VerticalFlex from "layouts/flex/VerticalFlex";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import P from "components/P";
import Center from "layouts/wrapper/Center";
import { useNavigate } from "react-router-dom";
import { requester, adminRequester } from "App";
import { BrowserDetectContext } from "providers/BrowserEventProvider";
import { order } from "InitialData/accounts/myPageData";

Chart.register(
  LineController,
  BarController,
  LineElement,
  BarElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Legend
);
function SalesStatus(props) {
  const { isMobile } = useContext(BrowserDetectContext);
  const chartContainer2 = useRef(null);
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  const hours = today.getHours();
  const minutes = today.getMinutes();
  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedDate = date < 10 ? `0${date}` : date;
  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  // 오늘 날짜를 'MM월 dd일' 형식으로 표시 (한국어로)
  const todayDateFormatted = today.toLocaleDateString("ko-KR", {
    month: "long",
    day: "numeric",
  });
  const currentMonth = today.toLocaleDateString("ko-KR", { month: "long" });
  const formattedToday = `${year}-${formattedMonth}-${formattedDate} ${formattedHours}:${formattedMinutes}`;
  const [view, setView] = useState("day");
  const [chartInstance, setChartInstance] = useState();
  const [mounted, setMounted] = useState(false);
  const [summary, setSummary] = useState();
  const [data, setData] = useState();
  useEffect(() => {
    setMounted(true);
  }, []);
  const [message, setMessage] = useState();
  useEffect(() => {
    if (mounted) {
      adminRequester.getOrderStatus({ status: `sales_${view}` }, (result) => {
        setData(result.data);
      });
    }

    switch (view) {
      case "day": {
        setMessage("*최근 7일간의 데이터입니다.");
        break;
      }
      case "week": {
        setMessage("*최근 4주간의 데이터입니다.");
        break;
      }
      case "month": {
        setMessage("*최근 6개월간의 데이터입니다.");
        break;
      }
      default: {
        break;
      }
    }

    if (chartInstance) {
      chartInstance.destroy();
    }
  }, [mounted, isMobile, view]);

  const onStatusClick = () => {};
  useEffect(() => {
    if (data && chartContainer2.current) {
      let labels = data?.map((d) => d.label);

      let refunds = data?.map((d) => d.refund.sum);
      let pays = data?.map((d) => d.pay.sum);
      let orders = data?.map((d) => d.order.sum);
      const chartData = {
        labels: labels,
        datasets: [
          {
            label: "환불(반품/취소)",
            data: refunds,
            backgroundColor: "transparent",
            borderColor: "aqua",
            tension: 0.1,
            fill: true,
            type: "line", // Specify this dataset is a line chart
          },
          {
            label: "결제",
            data: pays,
            backgroundColor: "transparent",
            borderColor: "red",
            tension: 0.1,
            fill: true,
            type: "line", // Specify this dataset is a line chart
          },
          {
            label: "총주문",
            data: orders,
            backgroundColor: "#5471e6",
            type: "bar", // Specify this dataset is a bar chart
          },
        ],
      };
      const config = {
        type: "line", // This is irrelevant when the type is specified on the dataset
        data: chartData,
        options: {
          maintainAspectRatio: false,
          //   scales: {
          //       y: {
          //           type: 'linear',
          //           ticks: {
          //               stepSize: 500000,
          //               callback: function (value) {
          //                   if (value === 0) return '0';
          //                   if (value === 2000000) return '200';
          //                   if (value === 4000000) return '400';
          //                   if (value === 6000000) return '600';
          //                   if (value === 8000000) return '800';
          //                   return null;
          //               },
          //           },
          //       },
          //   },
          scales: {
            y: {
              type: "linear",
              ticks: {
                // stepSize: 1000000,
                callback: function(value) {
                  //   if (value === 0) return "0";
                  //   if (value === 2000000) return "200";
                  //   if (value === 4000000) return "400";
                  //   if (value === 6000000) return "600";
                  //   if (value === 8000000) return "800";
                  return Number(value) / 10000;
                },
              },
            },
          },
          plugins: {
            legend: {
              display: true, // legend 표시 여부
              position: "bottom", // 'top'|'left'|'bottom'|'right'
              align: "center", // 'start'|'center'|'end'
              labels: {
                padding: 10,
                boxWidth: 13,
              },
            },
          },
        },
      };
      // const chartInstance = new Chart(chartContainer.current, config);
      setChartInstance(new Chart(chartContainer2.current, config));
    }
    // return () => {
    //     chartContainer.destroy();
    // };
  }, [data]);

  return (
    <div className={style.container_outer}>
      <div
        style={{
          width: "100%",
          textAlign: "left",
          fontSize: 18,
          paddingBottom: "8px",
          fontWeight: "700",
        }}
      >
        매출 현황
      </div>

      <div
        className={style.container}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <div style={{ flex: 1 }}>
          <div className={style.label}>
            <p
              style={{
                paddingRight: "5px",
                textAlign: "left",
                fontSize: 15,
                cursor: "pointer",
                textDecorationLine: view !== "day" ? "" : "underline",
              }}
              onClick={() => setView("day")}
            >
              일일 매출 현황
            </p>
            <p
              style={{
                paddingRight: "5px",
                textAlign: "left",
                fontSize: 15,
                cursor: "pointer",
                textDecorationLine: view !== "week" ? "" : "underline",
              }}
              onClick={() => setView("week")}
            >
              주별 매출 현황
            </p>
            <p
              style={{
                paddingRight: "5px",
                textAlign: "left",
                fontSize: 15,
                cursor: "pointer",
                textDecorationLine: view !== "month" ? "" : "underline",
              }}
              onClick={() => setView("month")}
            >
              월별 매출 현황
            </p>
          </div>
        </div>

        <div style={{ flex: 9, padding: "35px", display: "flex", gap: "30px" }}>
          {isMobile ? (
            <VerticalFlex height={"100%"}>
              <FlexChild>
                <div style={{ flex: 3, position: "relative" }}>
                  <div style={{ position: "absolute", top: "-30px", left: 0 }}>
                    <HorizontalFlex>
                      <FlexChild>
                        <P color={"#bbb"}>단위/만원</P>
                      </FlexChild>
                      <FlexChild
                        justifyContent={"flex-end"}
                        width={"max-content"}
                      >
                        <VerticalFlex>
                          <FlexChild>
                            <P color={"#bbb"}>
                              최종 업데이트(1시간 마다 업데이트)
                            </P>
                          </FlexChild>
                          <FlexChild>
                            <Center width={"100%"} textAlign={"right"}>
                              <P color={"#5471e6"}>{formattedToday}</P>
                            </Center>
                          </FlexChild>
                        </VerticalFlex>
                      </FlexChild>
                    </HorizontalFlex>
                  </div>
                  <canvas ref={chartContainer2} />
                </div>
              </FlexChild>
              <FlexChild>
                <div style={{ flex: 6 }}>
                  {summary && (
                    <VerticalFlex height={"100%"}>
                      <FlexChild height={30}>
                        <HorizontalFlex>
                          <FlexChild height={"100%"}></FlexChild>
                          <FlexChild
                            height={"100%"}
                            backgroundColor={"#B9CAF6"}
                            justifyContent={"center"}
                          >
                            <P>{todayDateFormatted} (오늘)</P>
                          </FlexChild>
                          <FlexChild
                            height={"100%"}
                            backgroundColor={"#B9CAF6"}
                            justifyContent={"center"}
                          >
                            <P>{currentMonth} 전체</P>
                          </FlexChild>
                        </HorizontalFlex>
                      </FlexChild>
                      <FlexChild>
                        <HorizontalFlex>
                          <FlexChild
                            height={"100%"}
                            backgroundColor={"#F5F6FB"}
                            border={"1px solid #E6E6E6"}
                            justifyContent={"center"}
                          >
                            <P>총주문금액(건수)</P>
                          </FlexChild>
                          <FlexChild
                            height={"100%"}
                            border={"1px solid #E6E6E6"}
                            justifyContent={"center"}
                          >
                            <P
                              cursor
                              hover
                              onClick={() => onStatusClick("waitingForPayment")}
                            >
                              {summary.todayOrderAmount} 원 /{" "}
                              {summary.todayOrderCount} 건
                            </P>
                          </FlexChild>
                          <FlexChild
                            height={"100%"}
                            border={"1px solid #E6E6E6"}
                            justifyContent={"center"}
                          >
                            <P
                              cursor
                              hover
                              onClick={() => onStatusClick("waitingForPayment")}
                            >
                              {" "}
                              {summary.totalOrderAmount} 원 /{" "}
                              {summary.totalOrderCount}건
                            </P>
                          </FlexChild>
                        </HorizontalFlex>
                      </FlexChild>
                      <FlexChild>
                        <HorizontalFlex>
                          <FlexChild
                            height={"100%"}
                            backgroundColor={"#F5F6FB"}
                            border={"1px solid #E6E6E6"}
                            justifyContent={"center"}
                          >
                            <P>총실결제금액(건수)</P>
                          </FlexChild>
                          <FlexChild
                            height={"100%"}
                            border={"1px solid #E6E6E6"}
                            justifyContent={"center"}
                          >
                            <P
                              cursor
                              hover
                              onClick={() => onStatusClick("preparingProduct")}
                            >
                              {summary.todayPaidAmount} 원 /{" "}
                              {summary.todayPaidCount} 건
                            </P>
                          </FlexChild>
                          <FlexChild
                            height={"100%"}
                            border={"1px solid #E6E6E6"}
                            justifyContent={"center"}
                          >
                            <P
                              cursor
                              hover
                              onClick={() => onStatusClick("preparingProduct")}
                            >
                              {summary.totalPaidAmount} 원 /{" "}
                              {summary.totalPaidCount} 건
                            </P>
                          </FlexChild>
                        </HorizontalFlex>
                      </FlexChild>
                      <FlexChild>
                        <HorizontalFlex>
                          <FlexChild
                            height={"100%"}
                            backgroundColor={"#F5F6FB"}
                            border={"1px solid #E6E6E6"}
                            justifyContent={"center"}
                          >
                            <P>총환불금액(건수)</P>
                          </FlexChild>
                          <FlexChild
                            height={"100%"}
                            border={"1px solid #E6E6E6"}
                            justifyContent={"center"}
                          >
                            <P
                              cursor
                              hover
                              onClick={() => onStatusClick("refund")}
                            >
                              {summary.todayRefundAmount} 원 /{" "}
                              {summary.todayRefundCount} 건
                            </P>
                          </FlexChild>
                          <FlexChild
                            height={"100%"}
                            border={"1px solid #E6E6E6"}
                            justifyContent={"center"}
                          >
                            <P
                              cursor
                              hover
                              onClick={() => onStatusClick("refund")}
                            >
                              {summary.totalRefundAmount} 원 /{" "}
                              {summary.totalRefundCount} 건
                            </P>
                          </FlexChild>
                        </HorizontalFlex>
                      </FlexChild>
                      <FlexChild>
                        <HorizontalFlex>
                          <FlexChild
                            height={"100%"}
                            backgroundColor={"#F5F6FB"}
                            border={"1px solid #E6E6E6"}
                            justifyContent={"center"}
                          >
                            <P>총 매출액(건수)</P>
                          </FlexChild>
                          <FlexChild
                            height={"100%"}
                            border={"1px solid #E6E6E6"}
                            justifyContent={"center"}
                          >
                            <P color={"#5572E7"}>
                              {summary.todayValidAmount} 원 /{" "}
                              {summary.todayValidCount} 건
                            </P>
                          </FlexChild>
                          <FlexChild
                            height={"100%"}
                            border={"1px solid #E6E6E6"}
                            justifyContent={"center"}
                          >
                            <P color={"#5572E7"}>
                              {summary.totalValidAmount} 원 /{" "}
                              {summary.totalValidCount} 건
                            </P>
                          </FlexChild>
                        </HorizontalFlex>
                      </FlexChild>
                    </VerticalFlex>
                  )}
                </div>
              </FlexChild>
            </VerticalFlex>
          ) : (
            <HorizontalFlex>
              <FlexChild height={"100%"}>
                <div style={{ flex: 3, position: "relative", height: "100%" }}>
                  <div style={{ position: "absolute", top: "-30px", left: 0 }}>
                    <HorizontalFlex>
                      <FlexChild>
                        <P color={"#bbb"}>단위/만원</P>
                      </FlexChild>
                      <FlexChild
                        justifyContent={"flex-end"}
                        width={"max-content"}
                      >
                        <VerticalFlex>
                          <FlexChild>
                            <P color={"#bbb"}>
                              최종 업데이트(1시간 마다 업데이트)
                            </P>
                          </FlexChild>
                          <FlexChild>
                            <Center width={"100%"} textAlign={"right"}>
                              <P color={"#5471e6"}>{formattedToday}</P>
                            </Center>
                          </FlexChild>
                        </VerticalFlex>
                      </FlexChild>
                    </HorizontalFlex>
                  </div>
                  <canvas ref={chartContainer2} />
                </div>
              </FlexChild>
              <VerticalFlex height={"100%"} width={"100%"}>
                <span style={{ textAlign: "right", alignSelf: "end" }}>
                  {message}
                </span>
                <FlexChild height={"100%"}>
                  {data && (
                    <VerticalFlex height={"100%"}>
                      <FlexChild height={30}>
                        <HorizontalFlex>
                          {/* <FlexChild height={"100%"}></FlexChild> */}
                          <FlexChild
                            height={"100%"}
                            backgroundColor={"#B9CAF6"}
                            justifyContent={"center"}
                          >
                            <P>날짜</P>
                          </FlexChild>
                          <FlexChild
                            height={"100%"}
                            backgroundColor={"#B9CAF6"}
                            justifyContent={"center"}
                          >
                            <P>주문</P>
                          </FlexChild>
                          <FlexChild
                            height={"100%"}
                            backgroundColor={"#B9CAF6"}
                            justifyContent={"center"}
                          >
                            <P>결제완료</P>
                          </FlexChild>
                          <FlexChild
                            height={"100%"}
                            backgroundColor={"#B9CAF6"}
                            justifyContent={"center"}
                          >
                            <P>환불(반품 및 취소)</P>
                          </FlexChild>
                          <FlexChild
                            height={"100%"}
                            backgroundColor={"#B9CAF6"}
                            justifyContent={"center"}
                          >
                            <P>총매출</P>
                          </FlexChild>
                        </HorizontalFlex>
                      </FlexChild>
                      <FlexChild>
                        <Column
                          data={data}
                          onStatusClick={onStatusClick}
                          view={view}
                        />
                      </FlexChild>
                    </VerticalFlex>
                  )}
                </FlexChild>
              </VerticalFlex>
            </HorizontalFlex>
          )}
        </div>
      </div>
    </div>
  );
}

const Column = ({ data, view, onStatusClick }) => {
  return (
    <>
      {data?.map((data, index) => {
        return (
          <FlexChild key={index}>
            <HorizontalFlex>
              <FlexChild
                height={"100%"}
                backgroundColor={"#F5F6FB"}
                border={"1px solid #E6E6E6"}
                justifyContent={"center"}
              >
                <P>{data?.date}</P>
              </FlexChild>
              <FlexChild
                height={"100%"}
                border={"1px solid #E6E6E6"}
                justifyContent={"right"}
                style={{ textAlign: "right" }}
                paddingRight={10}
              >
                <VerticalFlex alignItems={"end"}>
                  <P>{Number(data?.order?.sum).toLocaleString()} 원</P>
                  <P>{Number(data?.order?.count).toLocaleString()} 건</P>
                </VerticalFlex>
              </FlexChild>
              <FlexChild
                height={"100%"}
                border={"1px solid #E6E6E6"}
                justifyContent={"right"}
                style={{ textAlign: "right" }}
                paddingRight={10}
              >
                <VerticalFlex alignItems={"end"}>
                  <P>{Number(data?.pay?.sum).toLocaleString()} 원</P>
                  <P>{Number(data?.pay?.count).toLocaleString()} 건</P>
                </VerticalFlex>
              </FlexChild>
              <FlexChild
                height={"100%"}
                border={"1px solid #E6E6E6"}
                justifyContent={"right"}
                style={{ textAlign: "right" }}
                paddingRight={10}
              >
                <VerticalFlex alignItems={"end"}>
                  <P>{Number(data?.refund?.sum).toLocaleString()} 원</P>
                  <P>{Number(data?.refund?.count).toLocaleString()} 건</P>
                </VerticalFlex>
              </FlexChild>
              <FlexChild
                height={"100%"}
                border={"1px solid #E6E6E6"}
                justifyContent={"right"}
                style={{ textAlign: "right" }}
                paddingRight={10}
              >
                <P cursor hover>
                  {Number(data?.total).toLocaleString()} 원
                </P>
              </FlexChild>
            </HorizontalFlex>
          </FlexChild>
        );
      })}
    </>
  );
};
export default SalesStatus;
