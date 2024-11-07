import style from "./PointLayout.module.css"
import { requester } from "App";
import P from "components/P";
import Container from "layouts/container/Container";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import VerticalFlex from "layouts/flex/VerticalFlex";
import Center from "layouts/wrapper/Center";
import { BrowserDetectContext } from "providers/BrowserEventProvider";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import MypageContentHeader from "../header/MypageContentHeader";


function PointLayout() {
    const { t } = useTranslation();
    const [pointHistory, setPointHistory] = useState();
    const { isMobile } = useContext(BrowserDetectContext);


    useEffect(() => {

        requester.pointHistory((result) => {

            setPointHistory(result.data);
        });
    }, [])

    useEffect(() => {

    }, [pointHistory])

    const Row = (props) => {
        const { data } = props;
        const [type, setType] = useState();

        useEffect(() => {
            if (data) {
                if (data.type = 'ACCUMULATE') {

                    setType("적립");
                } else if (data.type = 'USE') {

                    setType("사용");
                } else {

                    setType("소멸");
                }
            }
        }, [data])

        return (
            <FlexChild >
                <div className={style.borderBottom}>
                    <HorizontalFlex padding={"20px 0"}>
                        <FlexChild justifyContent={"center"} width={"30%"}>
                            <P>{data.createDatetime.slice(0, 10)}</P>
                        </FlexChild>
                        <FlexChild justifyContent={"center"}>
                            <VerticalFlex>
                                <Center width={"100%"} textAlign={"left"}>
                                    <P>{type && type}</P>
                                </Center>
                            </VerticalFlex>
                        </FlexChild>
                        <FlexChild justifyContent={"center"} width={"30%"}>
                            <P weight={"bold"} color={"var(--main-color)"}>{data.pointHistory}P</P>
                        </FlexChild>
                    </HorizontalFlex>
                </div>
            </FlexChild>
        );
    }

    return (
        <Container backgroundColor={"white"}>
            <VerticalFlex>
                {/* <FlexChild>
                    <Center width={"100%"} textAlign={"left"}>
                        <P padding={"15px"} size={"18pt"} weight={"bold"}>{t("point")}</P>
                    </Center>

                </FlexChild> */}
                <FlexChild>
                    {
                        isMobile &&
                        <MypageContentHeader />
                    }
                </FlexChild>
                <FlexChild>
                    <div className={style.header}>
                        <HorizontalFlex >
                            <FlexChild justifyContent={"center"} width={"30%"}>
                                <P>{t("date")}</P>
                            </FlexChild>
                            <FlexChild justifyContent={"center"}>
                                <P>{t("condition")}</P>
                            </FlexChild>
                            <FlexChild justifyContent={"center"} width={"30%"}>
                                <P>{t("etc")}</P>
                            </FlexChild>

                        </HorizontalFlex>
                    </div>
                </FlexChild>
                <FlexChild >
                    {/* <VerticalFlex>
                        {
                            pointHistory
                                ?
                                pointHistory.map((data, index) => (
                                    <Row data={data} key={index} />
                                ))
                                :
                                <FlexChild>
                                    <P>내역이 없습니다.</P>
                                </FlexChild>
                        }
                    </VerticalFlex> */}

                </FlexChild>

            </VerticalFlex>
        </Container>
    );
}

export default PointLayout;