import {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import style from "./OrderInquirySearch.module.css";
import { BrowserDetectContext } from "providers/BrowserEventProvider";
import { useTranslation } from "react-i18next";
import VerticalFlex from "layouts/flex/VerticalFlex";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import Center from "layouts/wrapper/Center";
import P from "components/P";
import CustomButton from "components/buttons/CustomButton";
import AdminDateChoice from "routes/admin/datePicker/AdminDateChoice";
import InputText from "components/inputs/InputText";
import TestDatePicker from "components/inputs/datePicker/TestDatePicker";
import { requester } from "App";
import { useParams } from "react-router-dom";
import DateChoice2 from "components/inputs/datePicker/dateChoice/DateChoice2";
export const Types = [
  { name: "주문일", value: "order" },
  { name: "결제일", value: "payment" },
];
export const Searches = [
  { name: "회원아이디", value: "customer_id" },
  { name: "주문자명", value: "order_name" },
  { name: "주문번호", value: "order_id" },
];
const NewOrderInquirySearch = forwardRef((props, ref) => {
  const { isMobile } = useContext(BrowserDetectContext);
  const [type, setType] = useState(Types[0].value);
  const [search, setSearch] = useState(Searches[0].value);
  const { keyword } = useParams();

  const now = new Date();
  const today = new Date(now.getTime() - now.getTimezoneOffset() * 60 * 1000);
  const [startDate, setStartDate] = useState(today);
  const [endDate, setsEndDate] = useState(today);

  const { t } = useTranslation();

  const dateRef = useRef();
  const input = useRef();

  //   const koreaTimeDiff = 9 * 60; // 한국은 UTC+9

  const maxDate = new Date();

  maxDate.setFullYear(maxDate.getFullYear() + 10);

  const onSearchClick = () => {
    let data = {};
    let startDateStr = dateRef.current.getStartDate().getTime();
    let endDateStr = dateRef.current.getEndDate().getTime();
    data.startDate = startDateStr;
    data.endDate = endDateStr;
    data.type = type;
    data.search = search;
    data.keyword = input.current.getValue();
    data.expand = "payments,customer,items";
    // data.purchaseOrderId = inputs.current[0].getValue();
    // data.userName = inputs.current[1].getValue();
    // data.name = inputs.current[2].getValue();

    props.callback && props.callback(data);
  };
  const onInitializationClick = () => {
    input.current.setValue("");
    setStartDate(today);
    setsEndDate(today);
  };

  const searchStyle = {
    backgroundColor: "var(--admin-main-color)",
    padding: "7px 20px",
    border: "1px solid #ddd",
  };

  const initializationStyle = {
    backgroundColor: "white",
    padding: "7px 20px",
    color: "black",
    border: "1px solid #ddd",
  };

  return (
    <div className={style.container}>
      <VerticalFlex>
        <FlexChild>
          <div
            style={{
              width: "100%",
              textAlign: "left",
              fontSize: 18,
              paddingBottom: "8px",
              fontWeight: "700",
            }}
          >
            전체 주문 조회
          </div>
        </FlexChild>
        <FlexChild>
          <HorizontalFlex gap={10}>
            <FlexChild
              width={"10%"}
              backgroundColor={"var(--admin-table-bg-color)"}
            >
              <div className={style.titleWrap}>
                <Center>
                  <P size={15} weight={"bold"}>
                    기간
                  </P>
                </Center>
              </div>
            </FlexChild>
            <FlexChild>
              <HorizontalFlex gap={10}>
                <FlexChild width={"max-content"}>
                  <select
                    className={style.select}
                    onChange={(e) => setType(e.target.value)}
                    value={type}
                  >
                    {Types?.map((type, index) => (
                      <option key={`type_${index}`} value={type.value}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                  {/* <TestDatePicker ref={dateRef} startDate={startDate} endDate={endDate} maxDate={maxDate} /> */}
                  <DateChoice2
                    ref={dateRef}
                    startDate={startDate}
                    endDate={endDate}
                    maxDate={maxDate}
                  />
                </FlexChild>
                <FlexChild />
              </HorizontalFlex>
            </FlexChild>
          </HorizontalFlex>
        </FlexChild>
        <FlexChild>
          <HorizontalFlex gap={10} justifyContent={"flex-start"}>
            <FlexChild
              width={"10%"}
              backgroundColor={"var(--admin-table-bg-color)"}
            >
              <div className={style.titleWrap}>
                <Center>
                  <P size={15} weight={"bold"}>
                    주문번호
                  </P>
                </Center>
              </div>
            </FlexChild>
            <FlexChild width={"max-content"}>
              <select
                className={style.select}
                onChange={(e) => setType(e.target.value)}
                value={type}
              >
                {Searches?.map((search, index) => (
                  <option key={`search_${index}`} value={search.value}>
                    {search.name}
                  </option>
                ))}
              </select>
              <FlexChild width={300} paddingLeft={10}>
                <InputText ref={(el) => (input.current = el)} />
              </FlexChild>
            </FlexChild>
          </HorizontalFlex>
        </FlexChild>
        <FlexChild backgroundColor={"#f5f6fb"} padding={"15px 0"}>
          <HorizontalFlex gap={20}>
            <FlexChild justifyContent={"flex-end"}>
              <CustomButton
                text={"조건검색"}
                style={searchStyle}
                onClick={onSearchClick}
              />
            </FlexChild>
            <FlexChild>
              <CustomButton
                text={"초기화"}
                style={initializationStyle}
                onClick={onInitializationClick}
              />
            </FlexChild>
          </HorizontalFlex>
        </FlexChild>
      </VerticalFlex>
    </div>
  );
});

export default NewOrderInquirySearch;
