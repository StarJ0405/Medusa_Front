import InputText from "components/inputs/InputText";
import style from "./SingleSummary.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import FlexChild from "layouts/flex/FlexChild";
import VerticalFlex from "layouts/flex/VerticalFlex";
import { useEffect, useState } from "react";
import { requester } from "App";
import { Provider, useSelector, useDispatch } from "react-redux";

function SingleSummary(props) {
    const { userId } = useSelector((state) => ({ userId: state.auth.userId }));
    const { quantity, product,  result, row } = props;

    const onClick = () => {
        let data = { orderProducts : product, quantity: quantity , total: result };
        
        requester.orderProducts(data, (result) => {
            
        })
    }


    return (
        <div className={style.container}>
            <VerticalFlex>
                <FlexChild>
                    <p className={style.title}>주문 내역 요약</p>
                    <HorizontalFlex>
                        <FlexChild>
                            <div className={style.couponRow}>
                                <FontAwesomeIcon icon={faCreditCard} />
                                <p className={style.coupon}> 셀렉트 쿠폰 </p>
                            </div>
                        </FlexChild>
                        <FlexChild width={15}>
                            <FontAwesomeIcon icon={faAngleDown} />
                        </FlexChild>
                    </HorizontalFlex>
                </FlexChild>
                <FlexChild>
                    <HorizontalFlex>
                        <FlexChild>
                            <div className={style.couponRow}>
                                <FontAwesomeIcon icon={faCreditCard} />
                                <p className={style.coupon}> AliExporess 쿠폰 </p>
                            </div>
                        </FlexChild>
                        <FlexChild width={15}>
                            <FontAwesomeIcon icon={faAngleDown} />
                        </FlexChild>
                    </HorizontalFlex>
                </FlexChild>
                <FlexChild>
                    <div>
                        <p className={style.codeTitle}>프로모션 코드</p>
                        <div className={style.codeWrap}>
                            <input type="text" placeholder="" className={style.code} />
                            <p className={style.codeButton}>적용</p>
                        </div>
                        <div className={style.border}></div>
                        <FlexChild>
                            <HorizontalFlex>
                                <FlexChild>
                                    <p className={style.priceTitle}>총액</p>
                                </FlexChild>
                                <FlexChild>
                                    <p className={style.price}>{result}</p>
                                </FlexChild>
                            </HorizontalFlex>
                        </FlexChild>
                        <FlexChild>
                            <p className={style.button} onClick={onClick}>주문</p>
                        </FlexChild>
                    </div>
                </FlexChild>
            </VerticalFlex>
        </div>
    );
}

export default SingleSummary;