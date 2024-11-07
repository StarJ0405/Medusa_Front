import style from "./DelayStatistics.module.css";
import FlexChild from "layouts/flex/FlexChild";
import Center from "layouts/wrapper/Center";
import P from "components/P";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import CustomIcon from "components/icons/CustomIcon";
import Inline from "layouts/container/Inline";
import VerticalFlex from "layouts/flex/VerticalFlex";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { requester } from "App";
import { useTranslation } from "react-i18next";



function DelayStatistics() {
    const navigate = useNavigate();
    const [mounted, setMounted] = useState(false);
    const [delayStatistics, setDelayStatistics] = useState();
    const {t} = useTranslation();

    useEffect(() => {
        setMounted(true);
    }, [])

    useEffect(() => {
        if (mounted) {
            let now = new Date();
            let oneMonthAgo = new Date(new Date().setMonth(now.getMonth() - 1));
            let data = {
                fromDateTime: oneMonthAgo,
                toDateTime: now
            }
            requester.getDelayStatistics(data, (result) => {
                console.log("delay", result);
                const orderStatusData = [
                    {
                        text: t("deliveryDelay"),
                        value: "deliveryDelay",
                        count: result.data.deliveryDelay
                    },
                    {
                        text: t("returnDelay"),
                        value: "returnDelay",
                        count: result.data.returnDelay
                    },
                    {
                        text: t("exchangeDelay"),
                        value: "exchangeDelay",
                        count: result.data.exchangeDelay
                    },
                    {
                        text: t("delayedResponse"),
                        value: "delayedResponse",
                        count: result.data.delayedResponse
                    },
                ]
            
                setDelayStatistics(orderStatusData)
            })
        }

        // "deliveryDelay" : "배송지연",
        // "returnDelay" : "반품지연",
        // "exchangeDelay" : "교환지연",
        // "delayedResponse" : "답변지연"

    }, [mounted])


    const onStatusClick = (value) => {
        navigate(`/admin/orderStatus/${value}`)
    }
    return (

        <HorizontalFlex>
            <FlexChild height={"100%"} width={"max-content"}>
                <div className={style.label}>
                    <VerticalFlex gap={5}>
                        <FlexChild width={100}>
                            <CustomIcon name={"delay"} width={30} color={"white"} />
                        </FlexChild>
                        <FlexChild>
                            <Center>
                                <P size={15}>처리지연</P>
                            </Center>
                        </FlexChild>
                    </VerticalFlex>
                </div>
            </FlexChild>
            <FlexChild height={"100%"}>
                <div className={style.contentArea}>
                    <VerticalFlex gap={5}>
                        {
                            delayStatistics &&
                            delayStatistics.map((data, index) => (
                                <FlexChild key={index} width={"95%"}>
                                    <VerticalFlex gap={5}>
                                        <FlexChild>
                                            <HorizontalFlex>
                                                <FlexChild>
                                                    <P>{data.text}</P>
                                                </FlexChild>
                                                <FlexChild justifyContent={"flex-end"}>
                                                    <Inline>
                                                        <P hover onClick={() => onStatusClick(data.value)} cursor weight={"bold"} color={"var(--main-color)"}>{data.count}</P>
                                                        <P>건</P>
                                                    </Inline>
                                                </FlexChild>
                                            </HorizontalFlex>
                                        </FlexChild>
                                        <FlexChild>
                                            <div className={style.line} />
                                        </FlexChild>
                                    </VerticalFlex>
                                </FlexChild>
                            ))
                        }
                    </VerticalFlex>
                </div>
            </FlexChild>
        </HorizontalFlex>

    );

}

export default DelayStatistics;