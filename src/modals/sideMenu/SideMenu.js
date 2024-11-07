import { useContext, useEffect, useRef, useState } from "react";
import NiceModal from "@ebay/nice-modal-react";
import ModalBase from "modals/base/ModalBase";
import { useTranslation } from "react-i18next";
import OverlayMenuBase from "modals/base/OverlayMenuBase";
import { requester } from "App";
import VerticalFlex from "layouts/flex/VerticalFlex";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import { rpad2D } from "shared/utils/Utils";
import FlexChild from "layouts/flex/FlexChild";
import style from "./SideMenu.module.css";
import P from "components/P";
import allProductImg from "resources/img/icons/전제상품.svg";
import allProductTransImg from "resources/img/icons/전제상품_흰색.png";
import mouth from "resources/img/icons/입호흡.svg";
import mouthTrans from "resources/img/icons/입호흡_흰색.png";
import breath from "resources/img/icons/폐호흡.svg";
import breathTrans from "resources/img/icons/폐호흡_흰색.png";
import device from "resources/img/icons/기계.svg";
import deviceTrans from "resources/img/icons/기계_흰색.png";
import etc from "resources/img/icons/코일 및 기타용품.svg";
import etcTrans from "resources/img/icons/코일-및-기타용품_흰색.png";
import dataImg from "resources/img/icons/자료실.svg";
import dataImgTrans from "resources/img/icons/자료실_흰색.png";
import Center from "layouts/wrapper/Center";
import CustomIcon from "components/icons/CustomIcon";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "providers/AuthProvider";

const SideMenu = NiceModal.create((props, ref) => {
    const { userName } = props;
    const modal = useRef();
    const { t } = useTranslation();
    const [withHeader, withFooter] = [true, false];
    const [width, height] = ["80%", "100%"];
    const withCloseButton = true;
    const clickOutsideToClose = true;
    const title = "월드베이프";
    const navigate = useNavigate();

    const onLoginClick = () => {
        NiceModal.show("memberSignIn");
    }
    const onSignUpClick = () => {
        NiceModal.show("memberSignTabModal");
    }


    const Item = (props) => {
        const [hover, setHover] = useState(false);
        let onMouseEnter = () => setHover(true);
        let onMouseLeave = () => setHover(false);

        const onClick = () => {
            navigate(props.to);
            modal.current.close();
        }

        return (
            <div className={style.item} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onClick={onClick}>
                <VerticalFlex gap={10}>
                    <FlexChild>
                        <img width={"28%"} src={hover ? props.hoverImg : props.img} color={"black"} backgroundColor={"white"} />
                    </FlexChild>
                    <FlexChild justifyContent={"center"}>
                        <P height={42} weight={"bold"}>{props.text}</P>
                    </FlexChild>
                </VerticalFlex>
            </div>
        )
    }

    return (
        <OverlayMenuBase backgroundColor={"var(--main-color)"} ref={modal} title={title} width={width} height={height} withHeader={withHeader} withCloseButton={withCloseButton} clickOutsideToClose={clickOutsideToClose} >
            <VerticalFlex gap={10}>
                <FlexChild padding={"0% 10%"}>
                    {
                        !userName &&
                        <HorizontalFlex alignItems={"flex-start"} gap={10} justifyContent={"flex-start"}>
                            <FlexChild width={"initial"}>
                                <div className={style.textButton} onClick={onLoginClick}>
                                    <P>로그인</P>
                                </div>
                            </FlexChild>
                            <FlexChild width={"initial"}>
                                <div className={style.textButton} onClick={onSignUpClick}>
                                    <P>회원가입</P>
                                </div>
                            </FlexChild>
                        </HorizontalFlex>
                    }

                </FlexChild>
                <FlexChild>
                    <div className={style.wrap}>
                        <Item text={"전체상품"} img={allProductImg} hoverImg={allProductTransImg} to={"productList/category/all"} />
                        <Item text={"입호흡 액상"} img={mouth} hoverImg={mouthTrans} to={"productList/category/0847d7c5-89d7-45c8-8f68-250ef8274c31"} />
                        <Item text={"모드액상"} img={breath} hoverImg={breathTrans} to={"productList/category/5979e86b-dbae-4e9f-869f-bc7f1d4c5531"} />
                        <Item text={"기계"} img={device} hoverImg={deviceTrans} to={"productList/category/7473b35c-24c5-46f3-8f61-032d59de15b2"} />
                        <Item text={"코일 및 \n기타용품"} img={etc} hoverImg={etcTrans} to={"productList/category/b1018b4d-efd4-4f64-a73d-2aa9d48d4222"} />
                        <Item text={"자료실"} img={dataImg} hoverImg={dataImgTrans} />
                    </div>
                </FlexChild>
            </VerticalFlex>

        </OverlayMenuBase>
    );
});

export default SideMenu;
