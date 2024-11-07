
import { faClock, faHeart, faStar } from "@fortawesome/free-regular-svg-icons";
import { faTicketSimple } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import VerticalFlex from "layouts/flex/VerticalFlex";
import { useTranslation } from "react-i18next";
import style from "./MobileMyPage.module.css"

function MobileMyPage() {
    const { t } = useTranslation();

    return (
        <HorizontalFlex >
            <FlexChild justifyContent={"center"} >
                <div className={style.wrap}>
                    <VerticalFlex>
                        <FlexChild>
                            <FontAwesomeIcon icon={faHeart} size={"lg"} />
                        </FlexChild>
                        <FlexChild>
                            <p className={style.text}>{t("wishList")}</p>
                        </FlexChild>
                    </VerticalFlex>
                </div>
            </FlexChild>
            <FlexChild justifyContent={"center"} >
                <div className={style.wrap}>
                    <VerticalFlex>
                        <FlexChild>
                            <FontAwesomeIcon icon={faStar} size={"lg"} />
                        </FlexChild>
                        <FlexChild>
                            <p className={style.text}>{t("following")}</p>
                        </FlexChild>
                    </VerticalFlex>
                </div>
            </FlexChild>
            <FlexChild justifyContent={"center"} >
                <div className={style.wrap}>
                    <VerticalFlex>
                        <FlexChild>
                            <FontAwesomeIcon icon={faClock} size={"lg"} />
                        </FlexChild>
                        <FlexChild>
                            <p className={style.text}>{t("thisProduct")}</p>
                        </FlexChild>
                    </VerticalFlex>
                </div>
            </FlexChild>
            <FlexChild justifyContent={"center"} >
                <div className={style.wrap}>
                    <VerticalFlex>
                        <FlexChild>
                            <FontAwesomeIcon icon={faTicketSimple} size={"lg"} />
                        </FlexChild>
                        <FlexChild>
                            <p className={style.text}>{t("coupon")}</p>
                        </FlexChild>
                    </VerticalFlex>
                </div>
            </FlexChild>
        </HorizontalFlex>
    );
}

export default MobileMyPage;