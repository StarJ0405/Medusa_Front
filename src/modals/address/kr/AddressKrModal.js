import { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import NiceModal from "@ebay/nice-modal-react";
import VerticalFlex from "layouts/flex/VerticalFlex";
import P from "components/P";
import ModalBase from "modals/base/ModalBase";
import FlexChild from "layouts/flex/FlexChild";
import style from "./AddressKrModal.module.css"
import { BrowserDetectContext } from "providers/BrowserEventProvider";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import Dummy from "components/Dummy";
import Center from "layouts/wrapper/Center";
import DaumPostcodeEmbed from "react-daum-postcode";
import InputText from "components/inputs/InputText";
import CustomButton from "components/buttons/CustomButton";




const AddressKrModal = NiceModal.create(
    (props, ref) => {
        const { isMobile } = useContext(BrowserDetectContext);
        const modal = useRef();
        const [withHeader, withFooter] = [true,
            false];
        const [width, height] = [isMobile ? "90%" : "40%", isMobile ? "60vh" : "50%"];
        const withCloseButton = false;
        const clickOutsideToClose = false;
        const title = "주소 찾기";
        const { id } = props;
        const buttonText = "close";
        const { t } = useTranslation();
        const inputRef = useRef();
        const [data, setData] = useState();
        const [modalData, setModalData] = useState(null);
        const [text, setText] = useState("");


        const complete = (data) => {
            let fullAddress = data.address;
            let extraAddress = '';

            if (data.addressType === 'R') {
                if (data.bname !== '') {
                    extraAddress += data.bname;
                }
                if (data.buildingName !== '') {
                    extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
                }
                fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
            }
            const dataToPassBack = {
                address: fullAddress,
                zonecode: data.zonecode,
                // ... 기타 데이터
            };
            console.log(data)
            console.log(fullAddress)
            console.log(data.zonecode)
            console.log(dataToPassBack);
            setData(dataToPassBack);
            inputRef.current.setValue(fullAddress);
            // setText("나머지 주소를 입력해주세요");


        }
        const onClick = () => {
            let resultData = {
                ...data,
                address: inputRef.current.getValue()
            }
            console.log(resultData);
            if (props.onCallback) {
                props.onCallback(resultData);
            }

            modal.current.close();
        }

        return (
            <ModalBase borderRadius={"25px"} ref={modal} width={width} height={height} withHeader={withHeader} withFooter={withFooter} withCloseButton={withCloseButton} clickOutsideToClose={clickOutsideToClose} title={title} buttonText={buttonText}>
                <div className={style.wrap}>
                    <VerticalFlex gap={20}>
                        <FlexChild>

                            <DaumPostcodeEmbed
                                className={style.postmodal}
                                // autoClose
                                onComplete={complete} />

                        </FlexChild>
                        <FlexChild>

                        </FlexChild>
                        <FlexChild>
                            <HorizontalFlex gap={20}>
                                <FlexChild width={"70%"}>
                                    <VerticalFlex>
                                        {/* <FlexChild>
                                            <P>{text}</P>
                                        </FlexChild> */}
                                        <FlexChild>
                                            <InputText readOnly ref={inputRef} />
                                        </FlexChild>
                                    </VerticalFlex>
                                </FlexChild>
                                <FlexChild>
                                    <CustomButton text={"입력"} onClick={onClick} />
                                </FlexChild>
                            </HorizontalFlex>
                        </FlexChild>
                    </VerticalFlex>
                </div>
            </ModalBase>
        );
    }
);

export default AddressKrModal;