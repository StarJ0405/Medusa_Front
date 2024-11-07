import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import style from "./LanguageSwitcher.module.css";
import clsx from "classnames";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import FlexChild from "layouts/flex/FlexChild";
import { getLocalStorage } from "shared/utils/Utils";
import useLocalStorage from "shared/hooks/useLocalStorage";
import i18n from "lang/i18n";
import OutsideClickDetector from "components/buttons/OutsideClickDetector";
import {languages} from "InitialData/languages.js";

function MobileLanguageSwitcher() {
    const [selectedLanguageCode, setSelectedLanguageCode] = useLocalStorage("i18nextLng");
    const [selectedLanguage, setSelectedLanguage] = useState();
    const [isListVisible, setListVisible] = useState(false);
    const onCurrentLanguageClick = () => {
        setListVisible((before) => !before);
    };

    const onLanguageClick = (e, language) => {
        e.stopPropagation();
        setSelectedLanguageCode(language.code);
        setListVisible(false);
    }

    const onOutsideClick = () => {
        setListVisible(false);
    }

    useEffect(() => {
        if (selectedLanguageCode) {
            setSelectedLanguage(languages.filter((language) => language.code === selectedLanguageCode)[0]);
            i18n.changeLanguage(selectedLanguageCode);
        }
    }, [selectedLanguageCode]);

    return (
        <OutsideClickDetector onOutsideClick={onOutsideClick}>
            <div className={style.container}  onClick={onCurrentLanguageClick}>
                <HorizontalFlex gap={5}>
                    <FlexChild>
                        {
                            selectedLanguage && <img className={style.flag} src={selectedLanguage.image} />
                        }

                    </FlexChild>
                    <FlexChild width={"initial"}>
                        <FontAwesomeIcon icon={isListVisible ? fas["faAngleUp"] : fas["faAngleDown"]} />
                    </FlexChild>
                </HorizontalFlex>
                <div className={clsx(style.list, { [style.show]: isListVisible })}>
                    {
                        languages.map((language, index) =>
                            <img className={style.flag} src={language.image} alt={""} key={index} onClick={(e) => onLanguageClick(e, language)} />
                        )
                    }

                </div>
            </div >
        </OutsideClickDetector>
    );
}

export default MobileLanguageSwitcher;