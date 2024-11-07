import style from "./CouponLayout.module.css"
import { requester } from "App";
import P from "components/P";
import Container from "layouts/container/Container";
import Inline from "layouts/container/Inline";
import Flex from "layouts/flex/Flex";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import VerticalFlex from "layouts/flex/VerticalFlex";
import Center from "layouts/wrapper/Center";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useAltEffect from "shared/hooks/useAltEffect";
import { useTranslation } from "react-i18next";
import { addCommas } from "shared/utils/Utils";


function CouponLayout() {
    const { t } = useTranslation();
    const [coupon, setCoupon] = useState([]);


    useEffect(() => {
        requester.findAllCoupon((result) => {
            
            setCoupon(result.data);
        })
    }, [])

    const CouponRow = (props) => {
        const { data } = props;
        return (
            <FlexChild>
                <HorizontalFlex >
                    <FlexChild justifyContent={"center"} width={"30%"}>
                        <img src={data.image} width={"80%"} />

                    </FlexChild>
                    <FlexChild justifyContent={"center"}>
                        <P>{data.name}</P>
                    </FlexChild>
                    <FlexChild justifyContent={"center"} width={"15%"}>
                        <VerticalFlex>
                            <P>{addCommas(data.term)}&#8361; 이상 구매시</P>
                            <P>(최대 {data.limitTerm})</P>
                        </VerticalFlex>
                    </FlexChild>
                    <FlexChild justifyContent={"center"} width={"15%"}>
                        <VerticalFlex>
                            <P>{data.createDateTime.slice(0, 10)} ~</P>
                            <P>{data.expirationDateTime.slice(0, 10)}</P>
                        </VerticalFlex>
                    </FlexChild>
                </HorizontalFlex>
            </FlexChild>
        );

    }

    return (
        <Container backgroundColor={"white"}>
            <VerticalFlex>
                <FlexChild>
                    <Center width={"100%"} textAlign={"left"}>
                        <P padding={"15px"} size={"18pt"} weight={"bold"}>{t("coupon")}</P>
                    </Center>

                </FlexChild>
                <FlexChild>
                    <div className={style.header}>
                        <HorizontalFlex >
                            <FlexChild justifyContent={"center"} width={"30%"}>
                                <P>{t("benefit")}</P>
                            </FlexChild>
                            <FlexChild justifyContent={"center"}>
                                <P>{t("coupon")}{t("name")}</P>
                            </FlexChild>
                            <FlexChild justifyContent={"center"} width={"15%"}>
                                <P>{t("condition")}</P>
                            </FlexChild>
                            <FlexChild justifyContent={"center"} width={"15%"}>
                                <P>{t("date")}</P>
                            </FlexChild>
                        </HorizontalFlex>
                    </div>
                </FlexChild>
                {/* {
                    coupon &&

                        coupon.length > 0
                        ?
                        coupon.map((data, index) => (
                            <CouponRow data={data} key={index} />
                        ))
                        :
                        <FlexChild>
                            <P>사용가능한 쿠폰이 없습니다.</P>
                        </FlexChild>
                } */}
            </VerticalFlex>
        </Container>
    );
}

export default CouponLayout;