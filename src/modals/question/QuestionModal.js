import style from "./QuestionModal.module.css"
import NiceModal from "@ebay/nice-modal-react";
import VerticalFlex from "layouts/flex/VerticalFlex";
import FlexChild from "layouts/flex/FlexChild";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import ModalBase from "modals/base/ModalBase";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import InputText from "components/inputs/InputText";
import ButtonEclipse from "components/buttons/ButtonEclipse";
import { useState } from "react";
import { requester } from "App";
import { useEffect } from "react";
import useAltEffect from "shared/hooks/useAltEffect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion, faCommentDots } from "@fortawesome/free-regular-svg-icons";


const QuestionModal = NiceModal.create(
    (props, ref) => {
        const modal = useRef();
        const questionRef = useRef();
        const scrollRef = useRef();
        const { t } = useTranslation();
        const [withHeader, withFooter] = [true, false];
        const [width, height] = ["100%", "100%"];
        const withCloseButton = true;
        const clickOutsideToClose = true;
        const title = "질문 목록";
        const buttonText = "close";
        const [questions, setQuestions] = useState([]);
        const { productId } = props;

        const onQuestionClick = () => {
            let questionContent = questionRef.current.getValue();
            

            let reviewData = { productId: productId, question: questionContent }
            requester.createQuestion(reviewData, (result) => {
                setQuestions(result.data);
                
            })
        }

        // const onQuestionAnswerClick = () => {
        //     NiceModal.show("answers", { productId: productId });
        // }

        useAltEffect(() => {
            let id = { productId: productId }
            requester.getAllQuestions(id, (result) => {
                setQuestions(result.data);
            })
            
        }, [])



        return (
            <ModalBase ref={modal} width={width} height={height} withHeader={withHeader} withFooter={withFooter} withCloseButton={withCloseButton} clickOutsideToClose={clickOutsideToClose} title={title} buttonText={buttonText} borderRadius={0}>
                <div className={style.wrap}>
                    <VerticalFlex gap={20} height={"max-content"}>

                        {questions && questions.map((data, index) => {
                            let questionId = data.id
                            return (
                                <FlexChild key={index}>
                                <div className={style.questionsWrap}>
                                    <VerticalFlex>
                                        <FlexChild>
                                            <HorizontalFlex>
                                                <FlexChild width={"max-content"} padding={10}>
                                                    <FontAwesomeIcon icon={faCircleQuestion} size={"2x"} />
                                                </FlexChild>
                                                <FlexChild>
                                                    <p className={style.questionContent}>{data.question}</p>
                                                </FlexChild>
                                            </HorizontalFlex>
                                        </FlexChild>
                                        <FlexChild>
                                            <HorizontalFlex>
                                                <FlexChild width={"max-content"} padding={10}>
                                                    <FontAwesomeIcon icon={faCommentDots} size={"2x"} />
                                                </FlexChild>
                                                <FlexChild>
                                                    <p>{data.answer}</p>
                                                </FlexChild>
                                            </HorizontalFlex>
                                        </FlexChild>
                                        <FlexChild>
                                            <HorizontalFlex>
                                                <FlexChild>
                                                    <p className={style.answer} onClick={ () => NiceModal.show("answers", { productId: productId , questionId: questionId })}>답변 보기</p>
                                                </FlexChild>
                                                <FlexChild justifyContent={"flex-end"}>
                                                    <p>날짜</p>
                                                </FlexChild>
                                            </HorizontalFlex>
                                        </FlexChild>
                                    </VerticalFlex>
                                </div>
                            </FlexChild>
                            );
                        }
                        )}

                        <FlexChild height={"max-content"}>

                            <div className={style.inputWrap}>
                                <HorizontalFlex>
                                    <FlexChild>
                                        <InputText ref={questionRef} />
                                    </FlexChild>
                                    <FlexChild width={"20%"}>
                                        <ButtonEclipse onClick={onQuestionClick} lineHeight={2} height={35} text={"문의"} borderRadius={"5px"} backgroundColor={"gray"} />
                                    </FlexChild>
                                </HorizontalFlex>
                            </div>

                        </FlexChild>
                    </VerticalFlex>
                </div>
            </ModalBase>
        );
    }

)

export default QuestionModal;