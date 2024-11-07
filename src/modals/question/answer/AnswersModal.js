import NiceModal from "@ebay/nice-modal-react";
import { faCircleQuestion, faCommentDots } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { requester } from "App";
import ButtonEclipse from "components/buttons/ButtonEclipse";
import InputText from "components/inputs/InputText";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import VerticalFlex from "layouts/flex/VerticalFlex";
import ModalBase from "modals/base/ModalBase";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import useAltEffect from "shared/hooks/useAltEffect";
import style from "./AnswersModal.module.css"


const AnswersModal = NiceModal.create(
    (props, ref) => {
        const modal = useRef();
        const answerRef = useRef();
        const { t } = useTranslation();
        const [withHeader, withFooter] = [true, false];
        const [width, height] = ["100%", "100%"];
        const withCloseButton = true;
        const clickOutsideToClose = true;
        const title = "답변 목록";
        const buttonText = "close";
        const { questionId } = props;
        const [answers, setAnswers] = useState([]);

        const onAnswerClick = () => {
            let answerContent = answerRef.current.getValue();

            let reviewData = { questionId: questionId, answer: answerContent }
            requester.createAnswer(reviewData, (result) => {
                setAnswers(result.data);
                
            })
        }

        useAltEffect(() => {
            let id = { questionId: questionId }
            requester.getAllAnswers(id, (result) => {
                setAnswers(result.data);
            })

        }, [])

        return (
            <>
                <ModalBase ref={modal} width={width} height={height} withHeader={withHeader} withFooter={withFooter} withCloseButton={withCloseButton} clickOutsideToClose={clickOutsideToClose} title={title} buttonText={buttonText} borderRadius={0}>
                    <div className={style.wrap}>
                        <VerticalFlex gap={20} height={"max-content"}>

                            {answers && answers.map((data, index) => (
                                <FlexChild key={index}>
                                    <div className={style.questionsWrap}>
                                        <VerticalFlex>
                                            <FlexChild>
                                                <HorizontalFlex>
                                                    <FlexChild width={"max-content"} padding={10}>
                                                        <FontAwesomeIcon icon={faCommentDots} size={"2x"} />
                                                    </FlexChild>

                                                    <FlexChild justifyContent={"flex-end"}>
                                                        <p>날짜</p>
                                                    </FlexChild>
                                                </HorizontalFlex>
                                            </FlexChild>
                                            <FlexChild>
                                                <div className={style.area}>
                                                    <p className={style.questionContent}>{data.question}</p>
                                                </div>
                                            </FlexChild>

                                        </VerticalFlex>
                                    </div>
                                </FlexChild>
                            ))}

                            <FlexChild height={"max-content"}>

                                <div className={style.inputWrap}>
                                    <HorizontalFlex>
                                        <FlexChild>
                                            <InputText ref={answerRef} />
                                        </FlexChild>
                                        <FlexChild width={"20%"}>
                                            <ButtonEclipse onClick={onAnswerClick} lineHeight={2} height={35} text={"문의"} borderRadius={"5px"} backgroundColor={"gray"} />
                                        </FlexChild>
                                    </HorizontalFlex>
                                </div>

                            </FlexChild>
                        </VerticalFlex>
                    </div>
                </ModalBase>
            </>
        );
    })

export default AnswersModal;