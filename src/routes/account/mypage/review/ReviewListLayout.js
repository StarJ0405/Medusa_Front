import { requester } from "App";
import P from "components/P";
import Container from "layouts/container/Container";
import Inline from "layouts/container/Inline";
import Flex from "layouts/flex/Flex";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import VerticalFlex from "layouts/flex/VerticalFlex";
import Center from "layouts/wrapper/Center";
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProductReview from "routes/mobile/shopping/productDetail/review/ProductReview";
import style from "./ReviewListLayout.module.css"
import Review from "./Review";
import { BrowserDetectContext } from "providers/BrowserEventProvider";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomIcon from "components/icons/CustomIcon";
import StarRate from "components/star/StarRate";
import { CButton } from "@coreui/react";
import NiceModal from "@ebay/nice-modal-react";
import { AuthContext } from "providers/AuthProvider";
import { useTranslation } from "react-i18next";
import initialSearchCondition from "InitialData/InitialSearchCondition.json";
import { clone } from "shared/utils/Utils";

function ReviewListLayout(props) {
    const { isMobile } = useContext(BrowserDetectContext);
    const { userName } = useContext(AuthContext);
    const { t } = useTranslation();
    const [product, setProduct] = useState();
    const { products } = useSelector((state) => ({
        products: state.wish.products,
    }));

    const onReviewClick = () => {
        NiceModal.show("review", { id: "af7b6114-4a63-485c-8c73-23bab7230227" });
    }

    const onReviewModifyClick = () => {
        NiceModal.show("reviewModify", { id: "af7b6114-4a63-485c-8c73-23bab7230227" });
    }

    useEffect(() => {
        if (userName) {
            let searchCondition = clone(initialSearchCondition);
            searchCondition.productId = "af7b6114-4a63-485c-8c73-23bab7230227";
            requester.searchProducts(searchCondition, (result) => {
                setProduct(result.data[0]);
            });
        } else {
            // NiceModal.show("memberSignIn");
        }
    }, [])

    const modifyBtnStyle = {
        backgroundColor: "#bebebe",
        borderRadius: "3px",
        border: "1px solid var(--line-color)",
        padding: "0",
        height: "30px",
        width: "70px",
        fontSize: "var(--font-size)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--font-color)",
    }
    const deleteBtnStyle = {
        backgroundColor: "white",
        borderRadius: "3px",
        border: "1px solid var(--line-color)",
        padding: "0",
        height: "30px",
        width: "70px",
        fontSize: "var(--font-size)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--font-color)",
    }
    const btnStyle = {
        backgroundColor: "white",
        borderRadius: "3px",
        border: "1px solid var(--main-color)",
        padding: "0",
        height: "30px",
        width: "70px",
        fontSize: "var(--font-size)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--font-color)",
    }

    const MobileReview = (props) => {
        return (
            <HorizontalFlex>
                {
                    product
                    &&
                    <FlexChild>
                        <HorizontalFlex padding={"12px 20px"} gap={15}>
                            <FlexChild width={"initial"}>
                                <img width={"100px"} src={product.image} />
                            </FlexChild>
                            <FlexChild>
                                <VerticalFlex>
                                    <FlexChild>
                                        <HorizontalFlex>
                                            <FlexChild>
                                                <P>작성일자</P>
                                            </FlexChild>
                                            <FlexChild>
                                                <P>{props.content ? "2022.12.01" : "-"}</P>
                                            </FlexChild>
                                        </HorizontalFlex>
                                    </FlexChild>
                                    <FlexChild>
                                        <StarRate score={5} />
                                    </FlexChild>
                                    <FlexChild>
                                        {
                                            props.content
                                                ?
                                                <Center width={"100%"} textAlign={"left"}>
                                                    <P weight={"bold"} size={"var(--font-size-sm)"}>수박이나 멜론 맛 액상들은 밍밍한 맛이 많이 부각되었는데 수박...</P>
                                                </Center>
                                                :
                                                <Center width={"100%"} textAlign={"left"}>
                                                    <P weight={"bold"} size={"var(--font-size-sm)"}>-</P>
                                                </Center>
                                        }
                                    </FlexChild>
                                    <FlexChild>
                                        <Center width={"100%"} textAlign={"left"}>
                                            <P weight={"bold"} size={"var(--font-size-sm)"}>옵션 : 수박꽁꽁</P>
                                        </Center>
                                    </FlexChild>
                                </VerticalFlex>
                            </FlexChild>
                            <FlexChild width={"70px"}>
                                <FlexChild>
                                    {
                                        props.complete
                                            ?
                                            <VerticalFlex gap={15} >
                                                <FlexChild>
                                                    <CButton style={modifyBtnStyle} variant="outline">작성 완료</CButton>
                                                </FlexChild>
                                                <FlexChild >
                                                    <CButton onClick={onReviewModifyClick} style={deleteBtnStyle} variant="outline">수정&보기</CButton>
                                                </FlexChild>
                                            </VerticalFlex>
                                            :
                                            <CButton onClick={onReviewClick} style={btnStyle} variant="outline">작성 가능</CButton>
                                    }
                                </FlexChild>
                            </FlexChild>
                        </HorizontalFlex>
                    </FlexChild>
                }
            </HorizontalFlex>
        );
    }

    return (
        <div>
            {
                isMobile
                    ?
                    <VerticalFlex>
                        < FlexChild >
                            <VerticalFlex>
                                <FlexChild height={"40px"} backgroundColor={"var(--main-color)"} >
                                    <HorizontalFlex>
                                        {/* <FlexChild padding={" 0 0 0 20px"}>
                                            <P color={"white"} size={"16pt"}><FontAwesomeIcon icon={faAngleLeft} /></P>
                                        </FlexChild> */}
                                        <FlexChild justifyContent={"center"}>
                                            <P color={"white"} size={"var(--font-size-lg)"}>{t("myActivity")}</P>
                                        </FlexChild>
                                        {/* <FlexChild justifyContent={"flex-end"} padding={"0 20px 5px 0 "}>
                                            <div className={style.iconWrap}>
                                                <CustomIcon name={"shoppingBag"} color={"white"} />
                                            </div>
                                        </FlexChild> */}
                                    </HorizontalFlex>

                                </FlexChild >
                                <FlexChild height={"44px"}>
                                    <HorizontalFlex>
                                        <Center padding={"0 0 0 20px"} width={"100%"} textAlign={"left"} >
                                            <P size={"var(--font-size-lg)"} weight={"bold"} >{t("review")}</P>
                                        </Center>
                                    </HorizontalFlex>
                                    <div className={style.topLine}></div>
                                </FlexChild>
                            </VerticalFlex>
                        </FlexChild >
                        <FlexChild>
                            {
                                userName
                                    ?
                                    <VerticalFlex>
                                        {/* <FlexChild height={"130px"}>
                                            <MobileReview complete content />
                                            <div className={style.line}></div>
                                        </FlexChild>
                                        <FlexChild height={"130px"}>
                                            <MobileReview />
                                            <div className={style.line}></div>
                                        </FlexChild>
                                        <FlexChild height={"130px"}>
                                            <MobileReview />
                                            <div className={style.line}></div>
                                        </FlexChild> */}
                                    </VerticalFlex>
                                    :
                                    <P>{t("pleaseLogin")}</P>
                            }
                        </FlexChild>
                    </VerticalFlex >
                    :
                    <Container backgroundColor={"white"}>
                        <VerticalFlex>
                            {/* <FlexChild>
                                <Center width={"100%"} textAlign={"left"}>
                                    <P padding={"15px"} size={"18pt"} weight={"bold"}>{t("review")}</P>
                                </Center>

                            </FlexChild> */}
                            <FlexChild>
                                {/* <div className={style.header}>
                                    <HorizontalFlex >
                                        <FlexChild justifyContent={"center"} width={"30%"}>
                                            <P>상품</P>
                                        </FlexChild>
                                        <FlexChild justifyContent={"center"}>
                                            <P>리뷰</P>
                                        </FlexChild>
                                    </HorizontalFlex>
                                </div> */}
                            </FlexChild>
                            <FlexChild>
                                {/* {products
                                    &&
                                    products.map((data, index) => (
                                        <Review key={index} data={data} />
                                    ))
                                } */}
                            </FlexChild>
                            {/* <ProductReview /> */}
                        </VerticalFlex>
                    </Container>
            }
        </div >
    );
}

export default ReviewListLayout;