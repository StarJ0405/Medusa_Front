import { useEffect, useState, useRef } from "react";
import NiceModal from "@ebay/nice-modal-react";
import { useTranslation } from "react-i18next";
import { requester } from "App";
import InputText from "components/inputs/InputText";
import Select from 'react-select'
import CheckCircle from "components/inputs/checkBox/CheckCircle";
import ButtonEclipse from "components/buttons/ButtonEclipse";
import ModalBase from "modals/base/ModalBase";
import VerticalFlex from "layouts/flex/VerticalFlex";
import FlexChild from "layouts/flex/FlexChild";
import style from "./ShippingInfoAddModal.module.css";
import { validateInputs } from "shared/utils/Utils";
import SuperExpressive from "super-expressive";
import CustomButton from "components/buttons/CustomButton";
import P from "components/P";
import Inline from "layouts/container/Inline";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import { toast } from "react-toastify";

const ShippingInfoAddKrModal = NiceModal.create(
    (props) => {
        const { t } = useTranslation();
        const [withHeader, withFooter] = [true, false];
        const [width, height] = ["min(100%, 500px)", "initial"];
        const withCloseButton = true;
        const clickOutsideToClose = true;
        const title = t("addShippingInfo");
        const buttonText = t("close");

        const modal = useRef();
        const inputs = useRef([]);
        const [provinces, setProvinces] = useState();
        const [cities, setCities] = useState();
        const [postalCodes, setPostalCodes] = useState();
        const [selectedProvince, setSelectedProvince] = useState();
        const [selectedCity, setSelectedCity] = useState();
        const [selectedPostalCode, setSelectedPostalCode] = useState();
        const provinceSelectRef = useRef();
        const citySelectRef = useRef();
        const postalCodeSelectRef = useRef();

        const textFormat = {
            exp: SuperExpressive()
                .startOfInput
                .caseInsensitive
                .oneOrMore.anyChar
                .endOfInput
                .toRegex(),
            description: "text format",
            sample: "빈칸 없어야 함"
        };

        useEffect(() => {
            requester.getAllProvinces((result) => {
                setProvinces(result.data);
            });

            return () => {
                if (props.onClose) {
                    props.onClose();
                }
            }
        }, []);

        const onSaveButtonClick = () => {
            validateInputs(inputs.current).then((result) => {
                if (result.isValid) {

                    let data = {
                        shippingName: inputs.current[0].getValue(),
                        receiverName: inputs.current[1].getValue(),
                        addressKr: inputs.current[2].getValue(),
                        postalCodeKr: inputs.current[3].getValue(),
                        addressDetail: inputs.current[4].getValue(),
                        provinceId: inputs.current[5].getValue(),
                        cityId: inputs.current[6].getValue(),
                        postalCodeId: inputs.current[7].getValue(),
                        defaultYn: inputs.current[8].getValue(),
                        mobileNo: inputs.current[9].getValue()
                    };

                    requester.saveNewShippingInfo(data, (result) => {
                        if (result.code === 0) {
                            modal.current.close();
                            if (props.callback) {
                                props.callback(result.data);
                            }
                        }
                    });
                } else {
                    toast.error(t("정보를 다시 확인해주세요"), {
                        autoClose: 1000, position: toast.POSITION.BOTTOM_CENTER
                    });
                }
            });
        }

        const onProvinceChanged = (value) => {
            setSelectedProvince(value);
        }

        const onCityChanged = (value) => {
            setSelectedCity(value);
        }

        const onPostalCodeChanged = (value) => {
            setSelectedPostalCode(value);
        }

        useEffect(() => {
            if (selectedProvince) {
                let data = { provinceId: selectedProvince.id }
                requester.getAllCitiesByProvinceId(data, (result) => {
                    setCities(result.data);
                    setPostalCodes();
                    setSelectedCity();
                    setSelectedPostalCode();
                })
            }
        }, [selectedProvince]);

        useEffect(() => {
            if (selectedCity) {

                let data = { cityId: selectedCity.id }
                requester.getAllPostalCodesByCityId(data, (result) => {
                    setPostalCodes(result.data);
                    setSelectedPostalCode();
                })
            }
        }, [selectedCity]);

        const customStyles = {
            menu: (provided, state) => {
                const height = "initial";
                return { ...provided, height };
            },
            menuList: (provided, state) => {
                const height = "initial";
                const maxHeight = 200;
                return { ...provided, height, maxHeight };
            },
            option: (provided, state) => {
                const height = "initial";
                return { ...provided, height };
            },
            valueContainer: (provided, state) => {
                const width = "initial";
                return { ...provided, width };
            },
            indicatorsContainer: (provided, state) => {
                const width = "initial";
                return { ...provided, width };
            },
            singleValue: (provided, state) => {
                const height = "initial";
                return { ...provided, height };
            }
        }

        /* 국내 주소 관련  */
        const [enroll_company, setEnroll_company] = useState({
            address: '',
            zonecode: ''
        });

        const [popup, setPopup] = useState(false);

        const handleInput = (e) => {

        }

        const handleComplete = (data) => {
            setPopup(!popup);
        }
        /* 국내 주소 관련 끝 */
        const addressKrModalClick = () => {
            NiceModal.show("addressKr", { onCallback: addressKrCallback });
        }
        const addressKrCallback = (dataFromModal) => {
            console.log('Data received from modal:', dataFromModal);
            // 여기에서 모달에서 받은 데이터를 처리합니다.

            setEnroll_company((prevState) => ({
                ...prevState,
                address: dataFromModal.address,
                zonecode: dataFromModal.zonecode // zonecode도 받고 싶다면 이런 식으로 추가할 수 있습니다.
            }));
        };

        const addressBtnStyle = {
            backgroundColor: "#4d4f56",
            color: "white",
            padding: "5px 15px"

        }

        return (
            <ModalBase slideUp ref={modal} width={width} height={height} withHeader={withHeader} withFooter={withFooter} withCloseButton={withCloseButton} clickOutsideToClose={clickOutsideToClose} title={title} buttonText={buttonText} overflow={"visible"}>
                <div style={{ padding: "15px" }}>
                    <VerticalFlex padding={10} gap={10} flexStart>
                        <FlexChild>
                            <Inline>
                                <P weight={"bold"}>배송지 명 </P>
                                <P weight={"bold"} color={"var(--main-color)"}>*</P>
                            </Inline>
                        </FlexChild>
                        <FlexChild>
                            <InputText ref={el => (inputs.current[0] = el)} placeHolderMoveUp={true} placeHolder={t("예) 집, 회사(최대 10자)")} regExp={[textFormat]} />
                        </FlexChild>
                        <FlexChild>
                            <Inline>
                                <P weight={"bold"}>받으실 분 </P>
                                <P weight={"bold"} color={"var(--main-color)"}>*</P>
                            </Inline>
                        </FlexChild>
                        <FlexChild>
                            <InputText ref={el => (inputs.current[1] = el)} placeHolderMoveUp={true} placeHolder={t("받으실 분의 이름을 작성하세요")} regExp={[textFormat]} />
                        </FlexChild>
                        <FlexChild>
                            <Inline>
                                <P weight={"bold"}>주소 </P>
                                <P weight={"bold"} color={"var(--main-color)"}>*</P>
                            </Inline>
                        </FlexChild>
                        <FlexChild>
                            <InputText value={`${enroll_company.address}`} disabled ref={el => (inputs.current[2] = el)} placeHolderMoveUp={true} placeHolder={t("주소를 검색해주세요.")} regExp={[textFormat]} />
                        </FlexChild>
                        <FlexChild>
                            <HorizontalFlex gap={20}>
                                <FlexChild>
                                    <InputText value={`${enroll_company.zonecode}`} disabled ref={el => (inputs.current[3] = el)} placeHolderMoveUp={true} placeHolder={t("우편번호")} regExp={[textFormat]} />
                                </FlexChild>
                                <FlexChild width={"max-content"}>
                                    <CustomButton onClick={addressKrModalClick} text={"주소 검색"} style={addressBtnStyle} />
                                </FlexChild>
                            </HorizontalFlex>
                        </FlexChild>
                        <FlexChild>
                            <InputText ref={el => (inputs.current[4] = el)} placeHolderMoveUp={true} placeHolder={t("상세주소를 입력해주세요")} regExp={[textFormat]} />
                        </FlexChild>

                        <FlexChild>
                            <div className={style.pure}>
                                {/* <Select ref={provinceSelectRef} styles={customStyles} options={provinces} placeholder={t("province")} value={selectedProvince ? selectedProvince : null} onChange={onProvinceChanged} />
                                <Select ref={citySelectRef} styles={customStyles} options={cities} placeholder={t("city")} value={selectedCity ? selectedCity : null} onChange={onCityChanged} />
                                <Select ref={postalCodeSelectRef} styles={customStyles} options={postalCodes} placeholder={t("postalCode")} value={selectedPostalCode ? selectedPostalCode : null} onChange={onPostalCodeChanged} /> */}
                                <InputText value={"d221df3e-5f43-11ed-af22-00163e916a3b"} ref={el => (inputs.current[5] = el)} hidden regExp={[textFormat]} targetRef={provinceSelectRef} />
                                <InputText value={"d9f19a46-5f43-11ed-af22-00163e916a3b"} ref={el => (inputs.current[6] = el)} hidden regExp={[textFormat]} targetRef={citySelectRef} />
                                <InputText value={"21194cfb-5f51-11ed-af22-00163e916a3b"} ref={el => (inputs.current[7] = el)} hidden regExp={[textFormat]} targetRef={postalCodeSelectRef} />
                            </div>
                        </FlexChild>
                        <FlexChild>

                        </FlexChild>
                        <FlexChild>
                            <CheckCircle ref={el => (inputs.current[8] = el)} label={t("saveAsDefaultShippingInfo")} />
                        </FlexChild>
                        <FlexChild>
                            <Inline>
                                <P weight={"bold"}>휴대폰 번호 </P>
                                <P weight={"bold"} color={"var(--main-color)"}>*</P>
                            </Inline>
                        </FlexChild>
                        <FlexChild>
                            <InputText ref={el => (inputs.current[9] = el)} placeHolderMoveUp={true} placeHolder={t("- 빼고 입력해주세요")} regExp={[textFormat]} />
                        </FlexChild>
                        <FlexChild>
                            <ButtonEclipse text={t("등록 완료")} lineHeight={"47px"} height={50} backgroundColor={"#4d4f56"} onClick={onSaveButtonClick} borderRadius={"5px"} />
                        </FlexChild>
                    </VerticalFlex>
                </div>
            </ModalBase>
        );
    }
);

export default ShippingInfoAddKrModal;