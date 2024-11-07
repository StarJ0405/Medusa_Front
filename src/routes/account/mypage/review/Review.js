import { CButton } from "@coreui/react";
import { requester } from "App";
import P from "components/P";
import Inline from "layouts/container/Inline";
import Flex from "layouts/flex/Flex";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import VerticalFlex from "layouts/flex/VerticalFlex";
import Center from "layouts/wrapper/Center";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./Review.module.css"
import NiceModal from "@ebay/nice-modal-react";
import initialSearchCondition from "InitialData/InitialSearchCondition.json";
import { clone } from "shared/utils/Utils";
import { useTranslation } from "react-i18next";
import StarRate from "components/star/StarRate";

function Review(props) {
    const { data } = props;
    const [product, setProduct] = useState();
    const [reviews, setReviews] = useState();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const onProductClick = () => {
        navigate(`/product/detail/${data.productId}`);
    }

    const onReviewClick = () => {
        NiceModal.show("review", { id: data.productId, content: data.content });
    }

    const onReviewModifyClick = () => {
        NiceModal.show("reviewModify", { id: data.productId, content: data.content });
    }

    useEffect(() => {
        if (data) {
            let searchCondition = clone(initialSearchCondition);
            searchCondition.productId = data.productId;
            requester.searchProducts(searchCondition, (result) => {
                setProduct(result.data[0]);
            });

            let reviewProductId = { productId: data.productId }
            requester.getAllReviews(reviewProductId, (result) => {
                setReviews(result.data);
            })
        }
    }, [data])

    return (
        <>
            {product
                &&
                reviews
                &&
                reviews.map((data, index) => (
                    <div className={style.wrap}>
                        <VerticalFlex>
                            <FlexChild>
                                <HorizontalFlex>
                                    <FlexChild justifyContent={"center"} width={"100px"}>

                                        <img className={style.img} onClick={onProductClick} src={product.image} width={"100px"} />
                                    </FlexChild>
                                    <FlexChild justifyContent={"flex-start"}>
                                        <VerticalFlex flexStart>
                                            <Center alignItems={"flex-start"} textAlign={"left"}>
                                                <P>작성일자 2022.12.01</P>
                                                <StarRate score={4} />
                                                <P>{data.content}</P>
                                                <Inline>
                                                    <P>옵션 | </P>
                                                    <P>{product.brandTitleKr}시리즈 - </P>
                                                    <P>{product.titleKr}</P>
                                                </Inline>
                                            </Center>
                                        </VerticalFlex>
                                    </FlexChild>
                                    <FlexChild >
                                        <VerticalFlex gap={10} >
                                            {
                                                data.content
                                                    ?
                                                    <FlexChild alignItems={"flex-end"} padding={"0 10px 0 0"}>
                                                        <CButton disabled className={style.button} size={"sm"} color="dark" variant="outline">작성완료</CButton>
                                                    </FlexChild>
                                                    :
                                                    <FlexChild alignItems={"flex-end"} padding={"0 10px 0 0"}>
                                                        <CButton onClick={onReviewClick} className={style.button} size={"sm"} color="danger" variant="outline">리뷰 작성</CButton>
                                                    </FlexChild>
                                            }
                                            <FlexChild alignItems={"flex-end"} padding={"0 10px 0 0"}>
                                                <CButton className={style.button} onClick={onReviewModifyClick} size={"sm"} color="dark" variant="outline">리뷰수정&보기</CButton>
                                            </FlexChild>
                                        </VerticalFlex>
                                    </FlexChild>

                                </HorizontalFlex>
                            </FlexChild>
                            <FlexChild padding={"10px 0"}>
                                <div className={style.line}></div>
                            </FlexChild>
                        </VerticalFlex>
                    </div>
                ))
            }
        </>
    );
}

export default Review;