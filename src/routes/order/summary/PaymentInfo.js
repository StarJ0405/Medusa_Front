import FlexChild from "layouts/flex/FlexChild";
import VerticalFlex from "layouts/flex/VerticalFlex";
import style from "./PaymentInfo.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { faSlash } from "@fortawesome/free-solid-svg-icons";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import InputText from "components/inputs/InputText";
import ButtonEclipse from "components/buttons/ButtonEclipse";
import { propTypes } from "react-ui-tree/dist/react-ui-tree";

function PaymentInfo(props) {

 

    
    return (
        <>
            <div className={style.container}>
                <VerticalFlex>
                    <FlexChild>
                        <div className={style.newCard}>
                            <span className={style.cardImg}><FontAwesomeIcon icon={faCreditCard} /></span> <p> 새로운 카드 추가</p>
                        </div>
                    </FlexChild>
                    <FlexChild>
                        <HorizontalFlex>
                            <div>
                                <InputText placeHolder={"카드 번호"} />
                                &nbsp;
                                &nbsp;
                                &nbsp;
                                <InputText placeHolder={"카드 소지자 이름"} />
                            </div>
                        </HorizontalFlex>
                        <HorizontalFlex>
                            <div>
                                <InputText placeHolder={"MM"} />
                                &nbsp;
                                <p className={style.slash}><FontAwesomeIcon icon={faSlash} /></p>
                                &nbsp;
                                <InputText placeHolder={"YY"} />

                            </div>
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            <InputText placeHolder={"CVV"} />
                        </HorizontalFlex>
                    </FlexChild>
                    <FlexChild>
                        <div className={style.contentWrap}>
                           <input type="radio" className={style.radio} /> <p>카드 정보 저장하기</p>
                        </div>
                        <div className={style.border}></div>
                    </FlexChild>
                    <FlexChild>
                        <HorizontalFlex>
                            <FlexChild>
                        <div >
                            <p className={style.guide}>귀하의 결제 정보는 기밀로 처리됩니다</p>
                        </div>
                        </FlexChild>
                        <FlexChild>
                        <ButtonEclipse width={130} borderRadius={5} text={"저장 & 확인"} />
                        </FlexChild>
                        </HorizontalFlex>
                    </FlexChild>
                </VerticalFlex>
            </div>
        </>
    );
}

export default PaymentInfo;