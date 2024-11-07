import { useContext, useEffect, useState } from "react";
import { requester } from "App";
import { BrowserDetectContext } from "providers/BrowserEventProvider";
import Container from "layouts/container/Container";
import style from "./PolicyContainer.module.css";
import P from "components/P";
import VerticalFlex from "layouts/flex/VerticalFlex";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import { getCurrentLanguageCode } from "shared/utils/Utils";
import Center from "layouts/wrapper/Center";
import TopButton from "components/buttons/TopButton";

function PolicyContainer(props) {
    const { isMobile} = useContext(BrowserDetectContext);
    const {title, policies} = props;

    return (
        <Container>
            <Container maxWidth={1200} padding={"0px 30px"}>
                <VerticalFlex gap={10}>
                    <FlexChild>
                        <div className={style.pageHeader}>
                            <P size={30}>TERMS &amp; POLICIES</P>
                        </div>
                    </FlexChild>
                    <FlexChild alignItems={"flex-start"}>
                        <div className={style.pageGuide}>
                            <P size={20}>{title}</P>
                        </div>
                    </FlexChild>
                    {
                        !isMobile && !props.narrow &&
                        <FlexChild padding={"20px 0px"}>
                            <Container border={"1px solid #e4e4e4"} backgroundColor={"#fafafa"} padding={"20px 50px"}>
                                <HorizontalFlex flexWrap={"wrap"} gap={5}>
                                    {
                                        policies && policies.map((policy, index) =>
                                            <FlexChild key={index} flex={"1 1 30%"} >
                                                <a href={`#Policy${policy.orderNo}`}>
                                                    <HorizontalFlex gap={5} alignItems={"flex-start"}>
                                                        <FlexChild width={"initial"}>
                                                            <P size={13} color={"#222"}>{getCurrentLanguageCode() === 'Kr' ? "제" : "Article"}</P>
                                                        </FlexChild>
                                                        <FlexChild width={20} >
                                                            <Center width={"100%"} textAlign={"center"}>
                                                                <P size={13} color={"#222"}>{policy.orderNo}</P>
                                                            </Center>
                                                        </FlexChild>
                                                        {
                                                            getCurrentLanguageCode() === 'Kr' &&
                                                            <FlexChild width={"initial"}>
                                                                <Center width={"100%"} textAlign={"right"}>
                                                                    <P size={13} color={"#222"}>{"조"}</P>
                                                                </Center>
                                                            </FlexChild>
                                                        }
                                                        <FlexChild padding={"0px 5px"}>
                                                            <P size={13} color={"#222"}>{getCurrentLanguageCode() === 'Kr' ? policy.titleKr : policy.titleEn}</P>
                                                        </FlexChild>
                                                    </HorizontalFlex>
                                                </a>
                                            </FlexChild>
                                        )
                                    }
                                </HorizontalFlex>
                            </Container>
                        </FlexChild>
                    }
                    <FlexChild>
                        <VerticalFlex gap={30}>
                            {
                                policies && policies.map((policy, index) =>
                                    <FlexChild key={index}>
                                        <div id={`Policy${policy.orderNo}`}>
                                            <VerticalFlex gap={10}>
                                                <FlexChild alignItems={"flex-start"}>
                                                    <P size={15} weight={600} color={"#222"}>{getCurrentLanguageCode() === 'Kr' ? `제 ${policy.orderNo} 조 (${policy.titleKr})` : `Article ${policy.orderNo} (${policy.titleEn})`}</P>
                                                </FlexChild>
                                                {
                                                    (policy.contentKr || policy.contentEn) &&
                                                    <FlexChild alignItems={"flex-start"}>
                                                        <P size={13} color={"#666"}>{getCurrentLanguageCode() === 'Kr' ? policy.contentKr : policy.contentEn}</P>
                                                    </FlexChild>
                                                }

                                                {
                                                    policy.children &&
                                                    <FlexChild>
                                                        <VerticalFlex gap={5}>
                                                            {
                                                                policy.children.map((child, index) =>
                                                                    <VerticalFlex key={index}>
                                                                        <FlexChild key={index} alignItems={"flex-start"}>
                                                                            <P size={12} color={"#666"} margin={"0 0 0 12px"} textIndent={-12}>{getCurrentLanguageCode() === 'Kr' ? child.contentKr : child.contentEn}</P>
                                                                        </FlexChild>
                                                                        {
                                                                            child.children &&
                                                                            <FlexChild>
                                                                                <VerticalFlex gap={5}>
                                                                                    {
                                                                                        child.children.map((grandChild, index) =>
                                                                                            <FlexChild key={index} alignItems={"flex-start"}>
                                                                                                <P size={12} color={"#666"} margin={"0 0 0 24px"} textIndent={"-12px"}>{getCurrentLanguageCode() === 'Kr' ? grandChild.contentKr : grandChild.contentEn}</P>
                                                                                            </FlexChild>
                                                                                        )
                                                                                    }
                                                                                </VerticalFlex>
                                                                            </FlexChild>
                                                                        }
                                                                    </VerticalFlex>
                                                                )
                                                            }
                                                        </VerticalFlex>
                                                    </FlexChild>
                                                }
                                            </VerticalFlex>
                                        </div>
                                    </FlexChild>
                                )
                            }
                        </VerticalFlex>
                    </FlexChild>
                </VerticalFlex>
                {!props.narrow && <TopButton />}
            </Container>
        </Container>
    );
}

export default PolicyContainer;