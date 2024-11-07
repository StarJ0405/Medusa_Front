import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import { faAngleLeft, faArrowLeft, faGear, faHome, fas, faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import style from "./MobileHeader.module.css";
import VerticalFlex from "layouts/flex/VerticalFlex";
import NiceModal from "@ebay/nice-modal-react";
import { Link, useNavigate } from "react-router-dom";
import Cart from "routes/front/header/CartButton";
import VerticalMiddleWrapper from "layouts/wrapper/VerticalMiddleWrapper";
import { ReactComponent as Logo1 } from "resources/img/logo/logo.svg";
import { ReactComponent as Logo2 } from "resources/img/logo/01.svg";
import { ReactComponent as Logo3 } from "resources/img/logo/02.svg";
import { ReactComponent as Logo4 } from "resources/img/logo/03.svg";
import { ReactComponent as Logo5 } from "resources/img/logo/04.svg";
import { ReactComponent as Logo6 } from "resources/img/logo/05.svg";
import { faMessage } from "@fortawesome/free-regular-svg-icons";
import P from "components/P";
import BackButton from "components/buttons/BackButton";
import Center from "layouts/wrapper/Center";
import { ReactComponent as HomeIcon } from "resources/img/icons/home.svg";
import CustomIcon from "components/icons/CustomIcon";
import PaddingWrapper from "layouts/wrapper/PaddingWrapper";
import LanguageSwitcher from "components/countryFlag/MobileLanguageSwitcher";
import MobileSearchBar from "components/MobileSearchBar";
import WorldvapeLogo from "resources/img/logo/worldvape_logo.png";
import { AuthContext } from "providers/AuthProvider";
import { useContext } from "react";

function MobileHeader() {
    const {userName} = useContext(AuthContext);
    const onSideMenuClick = () => {
        NiceModal.show("sideMenu", {userName : userName});
    }

    return (
        <div className={style.container}>
            <VerticalFlex>
                <FlexChild height={50}>
                    <HorizontalFlex gap={20}>
                        <FlexChild width={140}>
                            <HorizontalFlex>
                                <FlexChild width={45}>
                                    <Center>
                                        <BackButton color={"var(--main-color)"} />
                                    </Center>
                                </FlexChild>
                                <FlexChild>
                                    <Link to={"/"}>
                                        <Center>
                                            <img className={style.logoIcon} src={WorldvapeLogo} />
                                        </Center>
                                    </Link>
                                </FlexChild>
                            </HorizontalFlex>
                        </FlexChild>
                        <FlexChild>
                            <MobileSearchBar />
                        </FlexChild>
                        {/* <FlexChild width={"initial"}>
                            <LanguageSwitcher />
                        </FlexChild> */}
                        <FlexChild width={45}>
                            <div className={style.sideMenuButton} onClick={onSideMenuClick}>
                                <Center>
                                    <FontAwesomeIcon icon={fas["faBars"]} color={"var(--main-color)"} />
                                </Center>
                            </div>
                        </FlexChild>
                        {/* <FlexChild width={50}>
                            <Center>
                                <HorizontalFlex width={"max-content"}>
                                    <FlexChild>
                                        <Link to="/">
                                            <Center>
                                                <CustomIcon color={"#e94619"} name={"home"} width={20} />
                                            </Center>
                                        </Link>
                                    </FlexChild>
                                    <FlexChild >
                                        <Cart width={20} color={"#e94619"} />
                                    </FlexChild>
                                </HorizontalFlex>
                            </Center>
                        </FlexChild> */}
                    </HorizontalFlex>
                </FlexChild>
            </VerticalFlex>
        </div>
    );
}

export default MobileHeader;