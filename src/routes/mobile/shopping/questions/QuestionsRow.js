import { faCircleQuestion, faCommentDots } from "@fortawesome/free-regular-svg-icons";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { t } from "i18next";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import VerticalFlex from "layouts/flex/VerticalFlex";
import style from "./QuestionsRow.module.css"

function QuestionsRow(props) {
    const { data } = props;
    return (
        <div className={style.questionArea}>
            <VerticalFlex>
                <FlexChild>
                    <HorizontalFlex>
                        <FlexChild width={"max-content"} padding={10}>
                            <FontAwesomeIcon icon={faCircleQuestion} size={"2x"} />
                        </FlexChild>
                        <FlexChild>
                            <p className={style.question}>{data.question}</p>
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
                        <a className={style.color}>{t("answer")} : {data.count}개</a>
                        <p className={style.date}>{data.date}</p>
                    </HorizontalFlex>
                </FlexChild>
                <FlexChild>
                    <HorizontalFlex>
                        <FlexChild justifyContent={"flex-end"}>
                            <p className={style.original}>{t("showOriginal")}</p>
                        </FlexChild>
                    </HorizontalFlex>
                </FlexChild>
            </VerticalFlex>
        </div>
    );
}

export default QuestionsRow;