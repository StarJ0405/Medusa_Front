import VerticalFlex from "layouts/flex/VerticalFlex";
import style from "./AdminTable.module.css";
import FlexChild from "layouts/flex/FlexChild";
import excelIcon from "resources/img/excelIcon.png"
import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import Center from "layouts/wrapper/Center";
import Inline from "layouts/container/Inline";
import P from "components/P";
import CustomButton from "components/buttons/CustomButton";
import { BrowserDetectContext } from "providers/BrowserEventProvider";
import { requester } from "App";
import ProductOptionRow from "modals/product/ProductOptionRow";
import CheckCircleGroup from "components/inputs/checkBox/CheckCircleGroup";
import AdminTableRow from "./AdminTableRow";
import Dummy from "components/Dummy";
import TabView from "layouts/view/TabView";
import TabViewChild from "layouts/view/TabViewChild";

function AdminTable(props) {
    const { theader, mockData } = props;
    const { id } = useParams();
    const tabViewRef = useRef();
    const { isMobile } = useContext(BrowserDetectContext);
    const [status, setStatus] = useState("");
    const [pageData, setPageData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [selectedList, setSelectedList] = useState([]);
    const [tabIndex, setTabIndex] = useState();
    const dataPerPage = 10;
    const allData = status && Array.from({ length: 100 }, (_, i) => ({
        id: i + 1,
        date: "2023-07-30",
        content: `과일먹구싶오 외 7`,
        price: 720,
        status: status && status
    }));



    useEffect(() => {
        switch (id) {
            case "waitingForPayment":
                setStatus("입금대기");
                break;
            case "preparingProduct":
                setStatus("상품준비");
                break;
            case "waitingForDelivery":
                setStatus("배송대기");
                break;
            case "shipping":
                setStatus("배송중");
                break;
            case "cancelBeforeDelivery":
                setStatus("배송전 취소");
                break;
            case "exchange":
                setStatus("교환");
                break;
            case "return":
                setStatus("반품");
                break;
            case "refund":
                setStatus("환불");
                break;
            case "inProgress":
                setStatus("처리중");
                break;
            case "deliveryDelay":
                setStatus("배송지연");
                break;
            case "returnDelay":
                setStatus("반품지연");
                break;
            case "exchangeDelay":
                setStatus("교환지연");
                break;
            case "delayedResponse":
                setStatus("답변지연");
                break;
            default:
                setStatus("입금대기");
                break;
        }

        setPageData(allData.slice(currentPage * 10, (currentPage + 1) * 10));
    }, [id])

    useEffect(() => {
        const allData = status && Array.from({ length: 100 }, (_, i) => ({
            id: i + 1,
            date: "2023-07-30",
            content: `과일먹구싶오 외 7`,
            price: 720,
            status: status && status
        }));

        setPageData(allData.slice(currentPage * 10, (currentPage + 1) * 10));

    }, [status])

    useEffect(() => {
        // calculate the start and end index
        const start = currentPage * dataPerPage;
        const end = start + dataPerPage;
        // slice the data array
        const slicedData = allData.slice(start, end);
        setPageData(slicedData);
    }, [currentPage]);

    const excelBtnStyle = {
        backgroundColor: "white",
        color: "#aaa",
        border: "1px solid #ddd"
    }
    const handlePageChange = (change) => {
        // calculate the next page number
        const nextPage = currentPage + change;
        // check if next page is valid
        if (nextPage >= 0 && nextPage < Math.ceil(allData.length / dataPerPage)) {
            setCurrentPage(nextPage);
        }
    };
    const onCheckGroupCallback = (checkedIndex, value) => {
        let selectedProducts = [];
        console.log(checkedIndex);
        console.log(value);
        // checkedIndex && checkedIndex.map((index) => {
        //     selectedProducts.push(products[index]);
        // });
        setSelectedList(selectedProducts);
    }
    const checkBoxStyle = {
    }
    const onTabChange = (activeTabIndex) => {
        setTabIndex(activeTabIndex);
    }



    return (
        <TabView table ref={tabViewRef} height={"100%"} initTabIndex={props.initTabIndex || 0} onTabChange={onTabChange}>
            <TabViewChild tabName={"상품별"}>
                <VerticalFlex>
                    <FlexChild padding={20}>
                        <HorizontalFlex>
                            <FlexChild>
                                <Center width={"100%"} textAlign={"left"}>
                                    <Inline>
                                        <P>검색결과 : </P>
                                        <P weight={"bold"} color={"var(--admin-main-color)"}>32</P>
                                        <P>건</P>
                                    </Inline>
                                </Center>
                            </FlexChild>
                            <FlexChild justifyContent={"flex-end"}>
                                <CustomButton text={"엑셀 다운로드"} style={excelBtnStyle} icon={<img src={excelIcon} />} />
                            </FlexChild>
                        </HorizontalFlex>
                    </FlexChild>
                    <FlexChild padding={20}>

                        <CheckCircleGroup style={checkBoxStyle} gap={10} callback={onCheckGroupCallback} padding={10} backgroundColor={"#f5f6fb"} labelWidth={30} borderTop={"1px solid #ddd"} borderBottom={"1px solid #ddd"}
                            headerGap={30} header={!isMobile && theader}>
                            {
                                mockData
                                &&
                                mockData.length > 0
                                &&
                                mockData.map((data, index) => {
                                    return (<AdminTableRow data={data} index={index} />);
                                })
                            }
                        </CheckCircleGroup>
                    </FlexChild>
                </VerticalFlex>
            </TabViewChild>
            <TabViewChild tabName={"주문번호별"}>
                <VerticalFlex>
                    <FlexChild padding={20}>
                        <HorizontalFlex>
                            <FlexChild>
                                <Center width={"100%"} textAlign={"left"}>
                                    <Inline>
                                        <P>검색결과 : </P>
                                        <P weight={"bold"} color={"var(--admin-main-color)"}>32</P>
                                        <P>건</P>
                                    </Inline>
                                </Center>
                            </FlexChild>
                            <FlexChild justifyContent={"flex-end"}>
                                <CustomButton text={"엑셀 다운로드"} style={excelBtnStyle} icon={<img src={excelIcon} />} />
                            </FlexChild>
                        </HorizontalFlex>
                    </FlexChild>
                    <FlexChild padding={20}>

                        <CheckCircleGroup style={checkBoxStyle} gap={10} callback={onCheckGroupCallback} padding={10} backgroundColor={"#f5f6fb"} labelWidth={30} borderTop={"1px solid #ddd"} borderBottom={"1px solid #ddd"}
                            headerGap={30} header={!isMobile && theader}>
                            {
                                mockData
                                &&
                                mockData.length > 0
                                &&
                                mockData.slice(0, 2).map((data, index) => {
                                    return (<AdminTableRow data={data} index={index} />);
                                })
                            }
                        </CheckCircleGroup>
                    </FlexChild>
                </VerticalFlex>
            </TabViewChild>
        </TabView>
    );
}

export default AdminTable;