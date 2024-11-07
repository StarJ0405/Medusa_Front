import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { requester } from "App";
import FlexChild from "layouts/flex/FlexChild";
import VerticalFlex from "layouts/flex/VerticalFlex";
import { useState } from "react";
import useAltEffect from "shared/hooks/useAltEffect";
import style from "./MobileSetting.module.css"
import MobileSettingList from "./MobileSettingList";
import ali_logo from "resources/img/ali_logo.png";
import ButtonEclipse from "components/buttons/ButtonEclipse";
import { removeLocalStorage } from "shared/utils/Utils";
import MobileSettingHeader from "./MobileSettingHeader";
import FixedHeader from "layouts/container/FIxedHeader";
import { useTranslation } from "react-i18next";


function MobileSetting() {
    const {t} = useTranslation();
    const [listData, setListData] = useState("");

    const onSignOutClick = () => {
        removeLocalStorage("token");
        window.location.replace("/account");
      }

    useAltEffect(() => {
        requester.getAllMobileListData((result) => {
            setListData(result);
            
        })
      }, []);
    

    return (
        <VerticalFlex height={"intital"}>
            <FlexChild height={40}>
                <FixedHeader height={40}>
                <MobileSettingHeader text={t("setting")} />
                </FixedHeader>
            </FlexChild>
            <FlexChild>
                
                {listData ? listData.map((data, index) => (
                    <MobileSettingList data={data} key={index} />
                )): null}
                
            </FlexChild>
            <FlexChild>
                <div className={style.button}>
                <ButtonEclipse onClick={onSignOutClick} height={40} text={t("logout")} backgroundColor={"var(--main-color-dark)"} fontWeight={"bold"} lineHeight={"38px"} borderRadius={"0px"} padding={"20px"} />
                </div>
            </FlexChild>
            <FlexChild>
                <div className={style.imgArea}>
                <img src={ali_logo} className={style.img} />
                </div>
                <p className={style.text}>{t("version")} 1.0.0</p>
                <p className={style.text}>ⓒ 2010-2022 AliExpress.com.</p>
                <p className={style.text}>All rights reserved.</p>
                
            </FlexChild>
        </VerticalFlex>
    );
}

export default MobileSetting;