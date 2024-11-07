import FlexChild from "layouts/flex/FlexChild";
import style from "./UserStatusInfo.module.css";
import { Versions } from "@stomp/stompjs";
import VerticalFlex from "layouts/flex/VerticalFlex";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import P from "components/P";
import CustomIcon from "components/icons/CustomIcon";
import Dummy from "components/Dummy";
import Inline from "layouts/container/Inline";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { requester } from "App";

function UserStatusInfo() {
    const navigate = useNavigate();
    const [todayVisitor, setTodayVisitor] = useState();
    const [todaynew, setTodaynew] = useState();
    const [thisMonthNew, setThisMonthNew] = useState();
    const [thisMonthWithdrawal, setThisMonthWithdrawal] = useState();
    const [totalUser, setTotalUser] = useState();

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true)
    }, [])
    useEffect(() => {
        requester.getUserManagementStatistics((result) => {
            if (result.code === 0) {
                result.data.map((data, index) => {
                    switch (data.status) {
                        case data.status = 'todayVisitor':
                            setTodayVisitor(data)
                            break;
                        case data.status = 'todaynew':
                            setTodaynew(data);
                            break;
                        case data.status = 'thisMonthNew':
                            setThisMonthNew(data);
                            break;
                        case data.status = 'thisMonthWithdrawal':
                            setThisMonthWithdrawal(data);
                            break;
                        case data.status = 'totalUser':
                            setTotalUser(data);
                            break;


                    }
                })

            }
        })
    }, [mounted])
    useEffect(() => {
        console.log(todayVisitor);
    }, [todayVisitor])

    const Box = (props) => {
        const { data } = props;
        const onClick = () => {
            navigate(`/admin/userInfoManagement/${props.value}`)
        }

        return (
            <div className={style.boxWrap}>
                <HorizontalFlex gap={20}>
                    <FlexChild width={"max-content"}>
                        <div className={style.iconArea}>
                            {props.icon}
                            <Dummy height={"5px"} />
                        </div>
                    </FlexChild>
                    <FlexChild>
                        <VerticalFlex flexStart>
                            <FlexChild>
                                <P size={17}>{props.title}</P>
                            </FlexChild>
                            <FlexChild>
                                <Inline>
                                    <P onClick={onClick} cursor hover size={20} weight={"bold"} color={"var(--main-color)"}>{data && data.totalCount}</P>
                                    <P>명</P>
                                </Inline>
                            </FlexChild>
                        </VerticalFlex>
                    </FlexChild>
                </HorizontalFlex>
            </div>
        );
    }

    return (
        <div className={style.container}>
            <VerticalFlex gap={15}>
                <FlexChild>
                    <HorizontalFlex gap={5}>
                        <FlexChild>
                            <Box title={"일일 방문회원"} data={todayVisitor} value={"todayVisitor"} count={200} icon={<CustomIcon name={"todayVisitor"} width={20} />} />
                        </FlexChild>
                        <FlexChild>
                            <Box title={"당일 신규가입"} data={todaynew} value={"todaynew"} count={200} icon={<CustomIcon name={"todayNewUser"} width={20} />} />
                        </FlexChild>
                    </HorizontalFlex>
                </FlexChild>
                <FlexChild>
                    <HorizontalFlex gap={5}>
                        <FlexChild>
                            <Box title={"당월 신규가입"} data={thisMonthNew} value={"thisMonthNew"} count={200} icon={<CustomIcon name={"currentMonthNewUser"} width={20} />} />
                        </FlexChild>
                        <FlexChild>
                            <Box title={"당일 탈퇴회원"} data={thisMonthWithdrawal} value={"thisMonthWithdrawal"} count={10} icon={<CustomIcon name={"currentMonthWithdrawalUser"} width={20} />} />
                        </FlexChild>
                    </HorizontalFlex>
                </FlexChild>
                <FlexChild>
                    <div className={style.totalUserArea}>
                        <HorizontalFlex>
                            <FlexChild>
                                <P weight={"bold"} size={17}>총 회원수</P>
                            </FlexChild>
                            <FlexChild justifyContent={"flex-end"}>
                                <P hover cursor weight={"bold"} size={17} color={"var(--main-color)"}>{totalUser && totalUser.totalCount}명</P>
                            </FlexChild>
                        </HorizontalFlex>
                    </div>
                </FlexChild>
            </VerticalFlex>
        </div>
    );
}

export default UserStatusInfo;