import { requester } from "App";
import P from "components/P";
import FlexChild from "layouts/flex/FlexChild";
import VerticalFlex from "layouts/flex/VerticalFlex";
import { AuthContext } from "providers/AuthProvider";
import { useContext, useEffect, useRef, useState } from "react";
import useAltEffect from "shared/hooks/useAltEffect";
import style from "./MyPartnersAccount.module.css"
import PagenationTable from "routes/table/PagenationTable";
import DateChoice from "components/inputs/datePicker/dateChoice/DateChoice";
import InputText from "components/inputs/InputText";
import { format } from "date-fns";
import { toast, ToastContainer } from "react-toastify";
import { useTranslation } from "react-i18next";

function MyPartnersAccount() {
    const { userName } = useContext(AuthContext);
    const { t } = useTranslation();
    const dateRef = useRef();
    const tableRef = useRef();
    const inputRef = useRef();
    const [account, setAccount] = useState([]);
    const [userEmail, setUserEmail] = useState('');
    const [mounted, setMounted] = useState(false);
    const fields = ['번호', '', '', '이메일', '가입일', '누적금액'];
    const today = new Date();


    useEffect(() => {
        setUserEmail(userName);
    }, [userName])
    useAltEffect(() => {

        if (userEmail) {
            let data = { userName: userEmail, myUser: '' }
            console.log(data);
            requester.findMyAccount(data, (result) => {
                console.log(result.data);
                setAccount(result.data);
            })
        }
        
        
    }, [userEmail])


    const onClick = (start, end, active) => {
        const startDate = start ? start : null;
        const endDate = end ? end : null;
        const inputValue = inputRef.current.getValue();
        const selectedDate = new Date(); // 이 부분은 선택한 날짜를 의미합니다.


        const resultStartDate = format(startDate, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
        const resultEndDate = format(endDate, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");

        console.log(resultStartDate);
        let data = { userName: userEmail, myUser: inputValue, startDate: resultStartDate, endDate: resultEndDate }
        console.log(data);


        // if (inputValue.length > 0) {
            requester.findMyAccount(data, (result) => {
                console.log(result.data);
                setAccount(result.data);
            })
        // } else {
            // toast.error(t("아이디를 입력해주세요"), {
            //     autoClose: 1000, position: toast.POSITION.BOTTOM_CENTER
            // });
        // }
    }

    return (
        <VerticalFlex gap={30}>
            <FlexChild>
                <P size={"24pt"}>나의 파트너스 회원 목록</P>
            </FlexChild>
            <FlexChild>
                <DateChoice ref={dateRef} lookUp={onClick} />
            </FlexChild>
            <FlexChild>
                <InputText ref={inputRef} />
            </FlexChild>
            <FlexChild>
                {account && account.length > 0 ? (
                    <PagenationTable ref={tableRef} columns={fields} data={account} />
                ) : (
                    <P size={"24pt"}>데이터가 없습니다</P>
                )}
            </FlexChild>
        </VerticalFlex>

    );

}

export default MyPartnersAccount;