
import { faAngleRight, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { requester } from "App";
import ProductCard from "components/card/product/ProductCard";
import ProductCardBase from "components/card/product/ProductCardBase";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import VerticalFlex from "layouts/flex/VerticalFlex";
import CardList from "layouts/wrapper/CardList";
import { useState } from "react";
import { Link } from "react-router-dom";
import useAltEffect from "shared/hooks/useAltEffect";
import style from "./ProductReview.module.css"
import Review from "./Review";
import ReviewTag from "./tag/ReviewTag";
import NiceModal from "@ebay/nice-modal-react";
import { useTranslation } from "react-i18next";
import InputText from "components/inputs/InputText";
import { useRef } from "react";
import ButtonEclipse from "components/buttons/ButtonEclipse";
import { useEffect } from "react";

function ProductReview(props) {
    const { productId } = props;
    const [newProducts, setNewProducts] = useState();
    const [reviews, setReviews] = useState();
    const { t } = useTranslation();
    const reviewRef = useRef();

    useAltEffect(() => {
        requester.getNewProducts((result) => {
            setNewProducts(result.data);
        });
        let reviewProductId = { productId: productId }
        requester.getAllReviews(reviewProductId, (result) => {
            setReviews(result.data);
        })
    }, [])

    const onReviewClick = () => {
        let reviewContent = reviewRef.current.getValue();

        let reviewData = { productId: productId, content: reviewContent, score: 5 }
        requester.createReview(reviewData, (result) => {
            setReviews(result.data);
        })
    }

    const onDeleteButtonClick = (value) => {
        let reviewId = { id: value, productId: productId }
        requester.deleteReview(reviewId, (result) => {
            setReviews(result.data);
        })
    }

    const onReviewDetailClick = () => {
        NiceModal.show("review");
    }

    const tagData = [
        {
            id: 1,
            tag: "음질이 좋은 (54)",
            number: 54
        },
        {
            id: 2,
            tag: "좋은 제품 (14)",
            number: 54
        },
        {
            id: 3,
            tag: "아주 좋은 (8)",
            number: 54
        },
        {
            id: 4,
            tag: "빠른 배달 (8)",
            number: 54
        },
        {
            id: 5,
            tag: "빠른 배송 (7)",
            number: 54
        },
        {
            id: 6,
            tag: "품질 우수한 (6)",
            number: 54
        },
    ]

    return (
        <div className={style.container}>
            <VerticalFlex>
                <FlexChild padding={"15px"}>
                    <HorizontalFlex>
                        <FlexChild>
                            <p className={style.title}>{t("review")} (5,954)</p>
                        </FlexChild>
                        <FlexChild width={"max-content"}>
                            <div onClick={onReviewDetailClick}>
                                <HorizontalFlex width={"max-content"}>
                                    <FlexChild width={"max-content"}>
                                        <p>★★★★</p>
                                        <p>☆</p>
                                        <p>4.7 </p>
                                        <FontAwesomeIcon icon={faAngleRight} size={"lg"} color={"#bbb"} />
                                    </FlexChild>
                                </HorizontalFlex>
                            </div>
                        </FlexChild>
                    </HorizontalFlex>
                </FlexChild>
                <FlexChild>
                    <HorizontalFlex>
                        {newProducts ? newProducts.map((data, index) =>
                            <FlexChild key={index}>
                                <div className={style.cardArea}>
                                    <ProductCardBase data={data} key={index} />
                                </div>
                            </FlexChild>
                        ) : null}
                        <FlexChild borderRadius={"15px"} alignItems={"center"} justifyContent={"center"} width={"max-content"} padding={"10px"} marginRight={"5px"} >
                            <div className={style.area} onClick={onReviewDetailClick} >
                                <FontAwesomeIcon icon={faEllipsis} size={"lg"} color={"#aaa"} />
                            </div>
                        </FlexChild>
                    </HorizontalFlex>
                </FlexChild>
                <FlexChild>
                    <HorizontalFlex flexWrap={"wrap"} padding={5}>
                        {
                            tagData && tagData.map((data, index) =>
                                <FlexChild key={index} padding={"3px"} justifyContent={"center"}>
                                    <ReviewTag data={data} />
                                </FlexChild>
                            )
                        }
                    </HorizontalFlex>
                </FlexChild>
                <FlexChild padding={10}>
                    {
                        reviews && reviews.map((review, index) => (
                            <Review data={review} key={index} onDeleteClick={onDeleteButtonClick} />
                        ))
                    }
                </FlexChild>
                <FlexChild alignItems={"flex-start"}>
                    <p onClick={onReviewDetailClick} className={style.allView}>{t("allView")}</p>
                    <HorizontalFlex>
                        <FlexChild>
                            <InputText ref={reviewRef} />
                        </FlexChild>
                        <FlexChild width={"30%"}>
                            <ButtonEclipse onClick={onReviewClick} text={"리뷰쓰기"} lineHeight={"40px"} height={40} backgroundColor={"var(--main-color)"} borderRadius={"5px"} />
                        </FlexChild>
                    </HorizontalFlex>
                </FlexChild>
            </VerticalFlex>
        </div>
    );
}

export default ProductReview;