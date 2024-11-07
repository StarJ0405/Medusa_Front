import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import clsx from "classnames";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import FlexChild from "layouts/flex/FlexChild";
import useLocalStorage from "shared/hooks/useLocalStorage";
import i18n from "lang/i18n";
import { languages } from "InitialData/languages.js";
import style from "routes/main/top/TopBar.module.css";
import VerticalMiddleWrapper from "layouts/wrapper/VerticalMiddleWrapper";
import Center from "layouts/wrapper/Center";

function DesktopLanguageSwitcher(props) {
    const [isSubListVisible, setSubListVisible] = useState(false);
    const [selectedLanguageCode, setSelectedLanguageCode] = useLocalStorage("i18nextLng");
    const [selectedLanguage, setSelectedLanguage] = useState();

    const onMouseOver = () => {
        setSubListVisible(true);
    };

    const onMouseLeave = () => {
        setSubListVisible(false);
    };

    const onLanguageClick = (e, language) => {
        e.stopPropagation();
        setSelectedLanguageCode(language.code);
    }

    useEffect(() => {
        if (selectedLanguageCode) {
            setSelectedLanguage(languages.filter((language) => language.code === selectedLanguageCode)[0]);
            i18n.changeLanguage(selectedLanguageCode);
        }
    }, [selectedLanguageCode]);

    return (
        <VerticalMiddleWrapper>
            <div className={style.topBarItem} onMouseOver={onMouseOver} onMouseLeave={onMouseLeave} >
                <HorizontalFlex gap={5}>
                    <FlexChild>
                        <Center>
                            {
                                selectedLanguage && <img className={style.topBarFlag} style={{ width: "20px" }} src={selectedLanguage.image} />
                            }
                        </Center>
                    </FlexChild>
                    <FlexChild>
                        <Center>
                            <FontAwesomeIcon icon={isSubListVisible ? fas["faAngleUp"] : fas["faAngleDown"]} />
                        </Center>
                    </FlexChild>
                </HorizontalFlex>
                <div className={clsx(style.subItemList, { [style.show]: isSubListVisible })}>
                    {
                        languages.map((language, index) =>
                            <div className={style.topBarSubItem} onClick={(e) => onLanguageClick(e, language)} key={index}>
                                <img className={style.topBarSubItemFlag} src={language.image} style={{ width: "30px", paddingRight: "0px" }} alt={""} key={index} />
                            </div>
                        )
                    }
                </div>
            </div>
        </VerticalMiddleWrapper>
    );
}

export default DesktopLanguageSwitcher;