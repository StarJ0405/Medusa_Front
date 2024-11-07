import FlexChild from "layouts/flex/FlexChild";
import VerticalFlex from "layouts/flex/VerticalFlex";
import style from "./ChoiceCompany.module.css"
import logo from "resources/img/main/footer/logo2.svg";
import { Link } from "react-router-dom";
import ChoiceCompanyRow from "./ChoiceCompanyRow";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardCheck, faFileInvoice, faVolumeHigh } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";


function ChoiceCompany() {
    const {t} = useTranslation();
    const companyData = [
        {
            img: logo
        }
    ]

    return (
        <VerticalFlex>
            <FlexChild height={100}>
                <div className={style.headerArea}>
                    <VerticalFlex>
                        <FlexChild>
                            <div>
                                <p className={style.title}>{t("message")}</p>
                            </div>
                        </FlexChild>
                        <FlexChild>
                            <div className={style.icon}>
                                <HorizontalFlex>
                                    <FlexChild>
                                        <div className={style.content}>
                                            <FontAwesomeIcon icon={faFileInvoice} size={"2x"} color={"green"} />
                                            <p className={style.text}>{t("order")}</p>
                                        </div>
                                    </FlexChild>

                                    <FlexChild>
                                        <div className={style.content}>
                                            <FontAwesomeIcon icon={faClipboardCheck} size={"2x"} color={"orange"} />
                                            <p className={style.text}>{t("promotion")}</p>
                                        </div>
                                    </FlexChild>
                                    <FlexChild>
                                        <div className={style.content}>
                                            <FontAwesomeIcon icon={faVolumeHigh} size={"2x"} color={"skyblue"} />
                                            <p className={style.text}>{t("activity")}</p>
                                        </div>
                                    </FlexChild>
                                </HorizontalFlex>
                            </div>
                        </FlexChild>
                    </VerticalFlex>
                </div>
            </FlexChild>
            <FlexChild height={65} />
            <FlexChild>
                <VerticalFlex>
                    {companyData ? companyData.map((data) => (
                        <>
                            <FlexChild>
                                <div className={style.company}>
                                    <ChoiceCompanyRow data={data} />
                                </div>
                            </FlexChild>
                        </>

                    )) : null}
                </VerticalFlex>
            </FlexChild>
        </VerticalFlex>
    );
}

export default ChoiceCompany;