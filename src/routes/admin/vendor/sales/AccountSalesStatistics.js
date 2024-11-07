import { requester } from "App";
import CustomButton from "components/buttons/CustomButton";
import DateChoice from "components/inputs/datePicker/dateChoice/DateChoice";
import InputText from "components/inputs/InputText";
import { toast, ToastContainer } from "react-toastify";
import { format } from "date-fns";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import VerticalFlex from "layouts/flex/VerticalFlex";
import { useEffect, useRef, useState } from "react";
import PagenationTable from "routes/table/PagenationTable";
import useAltEffect from "shared/hooks/useAltEffect";
import { useTranslation } from "react-i18next";


function AccountSalesStatistics() {
    const dateRef = useRef();
    const inputRef = useRef();
    const { t } = useTranslation();
    const [period, setPeriod] = useState();
    const [accountData, setAccountData] = useState([]);



    useAltEffect(() => {
        setTimeout(() => {
            requester.searchAccountSalesSearchAll((result) => {
                console.log(result.data);
                setPeriod(result.data);
                setAccountData(result.data);
            })
        }, 1500)
    }, [])


    useEffect(() => {
        console.log(accountData);
    }, [accountData])

    const onClick = (start, end) => {
        const startDate = start ? start : null;
        const endDate = end ? end : null;

        const userName = inputRef.current.getValue();
        const selectedDate = new Date(); // 이 부분은 선택한 날짜를 의미합니다.





        if (userName.length > 0) {
            const resultStartDate = format(startDate, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
            const resultEndDate = format(endDate, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
            let data = { startDate: resultStartDate, endDate: resultEndDate, userName: userName }
            console.log(data);
            requester.searchAccountSalesByUserName(data, (result) => {
                console.log(result.data);
                setPeriod(result.data);
                setAccountData(result.data);
            })
        }
        else {
            toast.error(t("아이디를 입력해주세요"), {
                autoClose: 1000, position: toast.POSITION.BOTTOM_CENTER
            });

        }


    }

    const fields = ['번호', '', '누적주문금액', '아이디', '연락처', '기타', '기타', '기타'];

    const tableRef = useRef();
    const handleNextPage = () => {
        const currentPage = tableRef.current.getCurrentPage();
        const totalPages = tableRef.current.getTotalPages();
        if (currentPage < totalPages) {
            tableRef.current.handlePageChange(currentPage + 1);
        }
    };
    const handlePrevPage = () => {
        const currentPage = tableRef.current.getCurrentPage();
        if (currentPage > 1) {
            tableRef.current.handlePageChange(currentPage - 1);
        }
    };

    return (
        <VerticalFlex gap={20}>
            <FlexChild>
                <DateChoice ref={dateRef} lookUp={onClick} />
            </FlexChild>
            <FlexChild>
                <InputText ref={inputRef} />
            </FlexChild>
            <FlexChild>
                <VerticalFlex>
                    <FlexChild>
                        {accountData && accountData.length > 0 ? (
                            <PagenationTable ref={tableRef} columns={fields} data={accountData} />
                        ) : (
                            <p>데이터가 없습니다.</p>
                        )}
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
        </VerticalFlex>

    );
}

export default AccountSalesStatistics;