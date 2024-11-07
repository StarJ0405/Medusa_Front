import P from "components/P";
import { useContext, useEffect, useRef, useState } from "react";
import useAltEffect from "shared/hooks/useAltEffect";
import { requester } from "App";
import VerticalFlex from "layouts/flex/VerticalFlex";
import FlexChild from "layouts/flex/FlexChild";
import InputText from "components/inputs/InputText";
import { AuthContext } from "providers/AuthProvider";
import PagenationTable from "routes/table/PagenationTable";
import MyPartnersPaginatedTable from "routes/table/MyPartnersPaginatedTable";
import CustomButton from "components/buttons/CustomButton";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import { toast, ToastContainer } from "react-toastify";

import { useTranslation } from "react-i18next";
import { CChartBar } from "@coreui/react-chartjs";
import { CButton, CButtonGroup, CCardBody, CCol, CRow } from "@coreui/react";
import DateChoice from "components/inputs/datePicker/dateChoice/DateChoice";
import { format } from "date-fns";
import { BrowserDetectContext } from "providers/BrowserEventProvider";
import PartnersStatisticsTotal from "routes/admin/dashboardCard/statistics/PartnersStatisticsTotal";

function MyPartnersTotal() {
    const { userName } = useContext(AuthContext);
    const { isMobile } = useContext(BrowserDetectContext);
    const { t } = useTranslation();
    const inputRef = useRef();
    const tableRef = useRef();
    const dateRef = useRef();
    const [userEmail, setUserEmail] = useState('');
    const [account, setAccount] = useState([]);
    const [mounted, setMounted] = useState(false);
    const [history, setHistory] = useState([]);
    const [userInfo, setUserInfo] = useState();
    const fields = ['순위', '', '', '이메일', '가입일', '누적금액'];
    const mobileFields = ['순위', '이메일', '누적금액'];

    useEffect(() => {
        if (userName) {
            setUserEmail(userName);
            let data = { userName: userName }



            requester.findByUser(data, (result) => {

                setUserInfo(result.data);
            });
        }
    }, [userName])

    useAltEffect(() => {

        if (userEmail) {
            let data = { userName: userEmail }
            console.log(data);
            requester.findMyPartnersAccountSalesTop5(data, (result) => {
                console.log(result.data);
                setAccount(result.data);
            })
            requester.findMyPartnersAccounthistoryAll(data, (result) => {
                console.log(result.data);
                setHistory(result.data);
            })
        }
    }, [userEmail])




    const historyRef = useRef();
    const handleNextPage = () => {
        const currentPage = historyRef.current.getCurrentPage();
        const totalPages = historyRef.current.getTotalPages();
        if (currentPage < totalPages) {
            historyRef.current.handlePageChange(currentPage + 1);
        }
    };
    const handlePrevPage = () => {
        const currentPage = historyRef.current.getCurrentPage();
        if (currentPage > 1) {
            historyRef.current.handlePageChange(currentPage - 1);
        }
    };

    const onClick = (start, end) => {
        const startDate = start ? start : null;
        const endDate = end ? end : null;
        const myUser = inputRef.current.getValue();
        if (myUser.length > 0) {
            const resultStartDate = format(startDate, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
            const resultEndDate = format(endDate, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
            console.log(resultStartDate, resultEndDate);
            let data = { startDate: resultStartDate, endDate: resultEndDate, userName: userEmail, myUser: myUser }
            requester.findMyPartnersAccounthistoryByMyUser(data, (result) => {
                console.log(result.data)
                setHistory(result.data);
                if (history.length > 0 && JSON.stringify(history) === JSON.stringify(result.data)) {
                    toast.error(t("현재 찾은 유저이거나 해당 유저가 없습니다."), {
                        autoClose: 1000, position: toast.POSITION.BOTTOM_CENTER
                    });
                }
            })

        } else {
            toast.error(t("아이디를 입력해주세요"), {
                autoClose: 1000, position: toast.POSITION.BOTTOM_CENTER
            });
        }

    }




    const chartData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Example Dataset',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: [65, 59, 80, 81, 56, 55, 40]
            }
        ]
    };

    const columns = [
        "번호",
        "상품사진",
        "상품명",
        "상품가격",
        "수량",
        "총합",
        "주문날짜",
        "이메일"
    ];
    const mobileColumns = [

        "상품명",
        "총합",
        "이메일"
    ]


    return (
        <VerticalFlex gap={20}>
            <FlexChild>
                <P size={isMobile ? "16pt" : "24pt"}>나의 파트너스 회원 통계</P>
            </FlexChild>
            <FlexChild>
                <DateChoice ref={dateRef} lookUp={onClick} />
            </FlexChild>
            <FlexChild>
                <InputText ref={inputRef} />
            </FlexChild>
            <FlexChild>
                <VerticalFlex>
                    <FlexChild>
                        <P size={isMobile ? "14pt" : "18pt"}>누적 주문금액 TOP5</P>
                    </FlexChild>
                    <FlexChild>
                        {account && account.length > 0 ? (
                            <PagenationTable ref={tableRef} columns={isMobile ? mobileFields : fields} data={account} />
                        ) : (
                            <P size={"24pt"}>로딩중</P>
                        )}
                    </FlexChild>
                </VerticalFlex>
            </FlexChild>

            <FlexChild>
                <P size={"18pt"}>접속통계</P>
            </FlexChild>
            <FlexChild>
                <VerticalFlex>
                    <FlexChild>
                        {
                            history && history.length > 0
                                ?
                                <MyPartnersPaginatedTable ref={historyRef} data={history} columns={isMobile ? mobileColumns : columns} />
                                :
                                <P size={"24pt"}>데이터가 없습니다</P>
                        }

                    </FlexChild>
                    <FlexChild>
                        <HorizontalFlex gap={15}>
                            <FlexChild justifyContent={"flex-end"}>
                                <CustomButton onClick={handlePrevPage} text={"이전"} itemsPerPage={5} />

                            </FlexChild>
                            <FlexChild>
                                <CustomButton onClick={handleNextPage} text={"다음"} itemsPerPage={5} />
                            </FlexChild>
                        </HorizontalFlex>
                    </FlexChild>
                </VerticalFlex>

            </FlexChild>
            <FlexChild>
                <PartnersStatisticsTotal userInfo={userInfo && userInfo} />
            </FlexChild>
        </VerticalFlex>

    );
}

export default MyPartnersTotal;