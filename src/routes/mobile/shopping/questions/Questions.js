import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import VerticalFlex from "layouts/flex/VerticalFlex";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import style from "./Questions.module.css"
import QuestionsRow from "./QuestionsRow";
import NiceModal from "@ebay/nice-modal-react";
import useAltEffect from "shared/hooks/useAltEffect";
import { requester } from "App";
import { useEffect } from "react";

function Questions(props) {
    const { t } = useTranslation();
    const [questions, setQuestions] = useState([]);
    const { productId } = props;

    const onQuestionsClick = () => {
        NiceModal.show("questions", { productId: productId });

    }

    useEffect(() => {
        let isQuestions = { productId: productId };
        requester.getAllQuestions(isQuestions, (result) => {
            setQuestions(result.data);
            
        })
    }, [])


    return (
        <div className={style.container} >
            <VerticalFlex>
                <FlexChild backgroundColor={"white"} marginBottom={"10px"} justifyContent={"flex=start"}>
                    <HorizontalFlex>
                        <p className={style.title}>{t("questions")}</p>
                    </HorizontalFlex>
                </FlexChild>
                <FlexChild>
                    <div onClick={onQuestionsClick}>
                        {questions && questions.length > 1 ?
                            <>
                                <FlexChild>
                                    <QuestionsRow data={questions[0]} />
                                </FlexChild>
                            </>
                            :
                            <FlexChild>
                                <p>문의가 없습니다.</p>
                            </FlexChild>
                        }
                    </div>
                </FlexChild>
            </VerticalFlex>
        </div>
    );
}

export default Questions;