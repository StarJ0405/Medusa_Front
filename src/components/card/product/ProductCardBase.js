import style from "./ProductCardBase.module.css";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import FlexChild from "layouts/flex/FlexChild";
import VerticalFlex from "layouts/flex/VerticalFlex";
import PaddingWrapper from "layouts/wrapper/PaddingWrapper";
import VerticalMiddleWrapper from "layouts/wrapper/VerticalMiddleWrapper";
import clsx from "classnames";

function ProductCardBase(props) {
    return (
        <PaddingWrapper padding={props.wrapPadding}>
            <VerticalFlex>
                <FlexChild overflowY={props.overflow} height={props.imageHeight}>
                    <PaddingWrapper padding={props.imagePadding}>
                        <div className={clsx(style.imageArea, {[style.before] : props.imageBeforeVisible})}>
                            <img className={style.productImage} src={props.data.image} alt="" />
                            {
                                props.spanningStickerVisible ?
                                    <div className={style.spanningStickerArea}>
                                        <HorizontalFlex>
                                            <FlexChild>
                                                <div className={style.spanningSticker}>
                                                    <VerticalMiddleWrapper>
                                                        <p className={style.spanningStickerContent}>{props.spanningStickerContent}</p>
                                                    </VerticalMiddleWrapper>
                                                </div>
                                            </FlexChild>
                                        </HorizontalFlex>
                                    </div>
                                    : null
                            }
                            {
                                props.imageNestedStickerVisible ?
                                    <div className={style.imageNestedStickerArea}>
                                        <HorizontalFlex>
                                            <FlexChild>
                                                <div className={style.imageNestedSticker}>
                                                    <VerticalMiddleWrapper>
                                                        <p className={style.imageNestedStickerContent}>{props.imageNestedStickerContent}</p>
                                                    </VerticalMiddleWrapper>
                                                </div>
                                            </FlexChild>
                                        </HorizontalFlex>
                                    </div>
                                    : null
                            }

                        </div>
                    </PaddingWrapper>
                </FlexChild>
                {
                    props.currentAmountVisible ?
                        <FlexChild height={props.currentAmountHeight}>
                            <div className={style.currentAmountArea}>
                                <VerticalMiddleWrapper>
                                    <p className={style.currentAmount}>{"₩ "}{props.data.currentAmount}</p>
                                </VerticalMiddleWrapper>
                            </div>
                        </FlexChild>
                        : null
                }
                {
                    props.beforeAmountVisible ?
                        <FlexChild height={props.beforeAmountHeight}>
                            <div className={style.beforeAmountArea}>
                                <VerticalMiddleWrapper>
                                    <p className={style.beforeAmount}>{"₩ "}{props.data.beforeAmount}</p>
                                </VerticalMiddleWrapper>
                            </div>
                        </FlexChild>
                        : null
                }
                {
                    props.discountRateVisible ?
                        <FlexChild height={props.discountRateHeight}>
                            <PaddingWrapper padding={props.discountRatePadding}>
                                <div className={style.discountRateArea}>

                                    <VerticalMiddleWrapper>
                                        <p className={style.discountRate}>{"-"}{props.data.discountRate}{"%"}</p>
                                    </VerticalMiddleWrapper>
                                </div>
                            </PaddingWrapper>
                        </FlexChild>
                        : null
                }
                {
                    props.commentVisible ?
                        <FlexChild height={props.commentHeight}>
                            <div className={style.commentArea} style={{backgroundColor:props.commentBackgroundColor?props.commentBackgroundColor:null}}>
                                <VerticalMiddleWrapper>
                                    <p className={style.comment} style={{color:props.commentColor?props.commentColor:null}}>{props.data.comment}</p>
                                </VerticalMiddleWrapper>
                            </div>
                        </FlexChild>
                        : null
                }


            </VerticalFlex>
        </PaddingWrapper>
    )
}

export default ProductCardBase;