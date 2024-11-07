import CheckCircle from "components/inputs/checkBox/CheckCircle";
import InputText from "components/inputs/InputText";
import P from "components/P";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import VerticalFlex from "layouts/flex/VerticalFlex";
import Center from "layouts/wrapper/Center";
import { forwardRef, useContext, useEffect, useImperativeHandle, useRef, useState } from "react";
import style from "./ShippingInfomation.module.css"
import NiceModal from "@ebay/nice-modal-react";
import { CFormSelect } from "@coreui/react";
import { useTransition } from "react";
import { useTranslation } from "react-i18next";
import { textFormat, mobileNoFormat } from "InitialData/regExp";
import { validateInputs } from "shared/utils/Utils";
import Select from 'react-select'
import { requester } from "App";
import { BrowserDetectContext } from "providers/BrowserEventProvider";
import Flex from "layouts/flex/Flex";
import CustomButton from "components/buttons/CustomButton";


const ShippingInfomationCN = forwardRef((props, ref) => {
    const { width, isMobile } = useContext(BrowserDetectContext);
    const checkRef = useRef();
    const inputs = useRef([]);
    const provinceSelectRef = useRef();
    const citySelectRef = useRef();
    const postalCodeSelectRef = useRef();
    const [provinces, setProvinces] = useState();
    const [cities, setCities] = useState();
    const [postalCodes, setPostalCodes] = useState();
    const [selectedProvince, setSelectedProvince] = useState();
    const [selectedCity, setSelectedCity] = useState();
    const [selectedPostalCode, setSelectedPostalCode] = useState();
    const [shippingInfo, setShippingInfo] = useState();
    const [checked, setChecked] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [data, setData] = useState();
    const [mounted, setMounted] = useState(true);
    const [type, setType] = useState("");
    const { t } = useTranslation();
    const shippingInfoClick = () => {
        NiceModal.show("shippingInfoSelectModal", { callback: shippingInfoCallback });
    }
    const shippingInfoCallback = (value, disabled, check) => {

        setDisabled(disabled);
        setShippingInfo(value);
        if (check) {
            setChecked(check);
            checkRef.current.setChecked(false);
        } else {
            setChecked(false);
        }
        setChecked(check);

    }

    useEffect(() => {
        if (shippingInfo) {
            let data = { provinceId: shippingInfo.provinceId }

            requester.getProvince(data, (result) => {
                console.log(result.data);
                setSelectedProvince(result.data);
            })
        }
    }, [shippingInfo])

    const newCheckCallback = (index, check) => {

        if (check) {
            setType("NEW");
            setChecked(false);
            setDisabled(false);

            inputs.current[0].setValue("");
            inputs.current[1].setValue("");
            inputs.current[2].setValue("");
            setSelectedProvince();
            setSelectedPostalCode();
            setSelectedCity();
            inputs.current[3].setValue("");
            inputs.current[4].setValue("");
            inputs.current[5].setValue("");
            inputs.current[6].setValue("");
        } else {
            setType("EXISTING");


        }
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


    useImperativeHandle(ref, () => ({
        getData() {

            let data = {
                receiverName: inputs.current[0].getValue(),
                mobileNo: inputs.current[1].getValue(),
                provinceId: inputs.current[2].getValue(),
                cityId: inputs.current[3].getValue(),
                postalCodeId: inputs.current[4].getValue(),
                addressDetail: inputs.current[5].getValue(),
                defaultYn: inputs.current[6].getValue()
            };
            return data;
        }
    }));

    useEffect(() => {
        requester.getAllProvinces((result) => {
            setProvinces(result.data);
        });
        setMounted(true);

    }, [])

    useEffect(() => {
        if (selectedProvince) {
            if (type === "EXISTING") {
                let data = { cityId: shippingInfo.cityId }
                requester.getCity(data, (result) => {
                    setSelectedCity(result.data);
                })
            } else {
                let data = { provinceId: selectedProvince.id }
                requester.getAllCitiesByProvinceId(data, (result) => {
                    console.log(result.data);
                    setCities(result.data);
                    setPostalCodes();
                    setSelectedCity();
                    setSelectedPostalCode();
                })
            }
        }
    }, [selectedProvince]);

    useEffect(() => {
        if (selectedCity) {
            if (type === "EXISTING") {
                let data = { postalCodeId: shippingInfo.postalCodeId }

                requester.getpostalCode(data, (result) => {
                    setSelectedPostalCode(result.data);
                })
            } else {
                let data = { cityId: selectedCity.id }
                requester.getAllPostalCodesByCityId(data, (result) => {
                    setPostalCodes(result.data);
                    setSelectedPostalCode();
                })
            }
        }
    }, [selectedCity]);

    useEffect(() => {
        if (props.callback) {
            props.callback(shippingInfo, type);
        }

    }, [type])
    const onChange = () => {
        if (props.callback) {
            props.callback(shippingInfo, type);
        }
    }

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

    return (
        <FlexChild>
            {
                isMobile
                    ?
                    <VerticalFlex gap={10}>
                        <FlexChild padding={"0 0 10px 0"}>
                            <Center width={"100%"} textAlign={"left"}>
                                <P size={24} weight={"bold"}>{t("shippingInfoAdd")}</P>
                            </Center>
                        </FlexChild>
                        <FlexChild>
                            <div className={style.addressHeaderWrap}>
                                <VerticalFlex gap={25}>
                                    <FlexChild>
                                        <HorizontalFlex gap={25}>
                                            <FlexChild width={"initial"}>
                                                <HorizontalFlex>
                                                    <CheckCircle readOnly checked={checked} />
                                                    <P>{t("originalShippingAddress")}</P>
                                                </HorizontalFlex>
                                            </FlexChild>
                                            <FlexChild>
                                                <P cursor onClick={shippingInfoClick} padding={"1px 10px"} borderRadius={"3px"} border={"1.5px solid #999"} color={"#999"} backgroundColor={"white"} size={"10pt"}>{t("shippingAddressList")}</P>
                                            </FlexChild>
                                        </HorizontalFlex>
                                    </FlexChild>
                                    <FlexChild>
                                        <HorizontalFlex >
                                            <FlexChild width={"initial"}>
                                                <HorizontalFlex>
                                                    <CheckCircle ref={checkRef} callback={newCheckCallback} checked={true} />
                                                    <P>{t("addNewAddress")}</P>
                                                </HorizontalFlex>
                                            </FlexChild>
                                        </HorizontalFlex>
                                    </FlexChild>
                                </VerticalFlex>
                            </div>
                        </FlexChild>
                        <FlexChild>
                            <div className={style.borderBottom}>
                                <HorizontalFlex justifyContent={"flex-start"} gap={10}>
                                    <FlexChild width={"20%"}>
                                        <P>{t("name")}</P>
                                    </FlexChild>

                                    <FlexChild width={"70%"}>
                                        <VerticalFlex>
                                            <InputText ref={el => inputs.current[0] = el} regExp={[textFormat]} disabled={disabled} placeHolder={t("name")} value={shippingInfo ? shippingInfo.receiverName : null} onChange={onChange} />
                                        </VerticalFlex>
                                    </FlexChild>
                                </HorizontalFlex>
                            </div>
                        </FlexChild>
                        <FlexChild>
                            <FlexChild>
                                <div className={style.borderBottom}>
                                    <HorizontalFlex justifyContent={"flex-start"} gap={10}>
                                        <FlexChild width={"20%"}>
                                            <P>{t("province")}</P>
                                        </FlexChild>
                                        <FlexChild width={"70%"}>
                                            <VerticalFlex>
                                                <Select isDisabled={disabled} ref={provinceSelectRef} styles={customStyles} options={provinces} placeholder={t("province")} value={selectedProvince ? selectedProvince : null} onChange={onProvinceChanged} />
                                                {/* <InputText disabled={disabled} value={shippingInfo ? shippingInfo.cityLabel : null} /> */}
                                                <InputText hidden ref={el => (inputs.current[2] = el)} value={selectedProvince ? selectedProvince.id : null} regExp={[textFormat]} targetRef={provinceSelectRef} />
                                            </VerticalFlex>


                                        </FlexChild>
                                    </HorizontalFlex>
                                </div>
                            </FlexChild>
                            <FlexChild>
                                <div className={style.borderBottom}>
                                    <HorizontalFlex justifyContent={"flex-start"} gap={10}>
                                        <FlexChild width={"20%"}>
                                            <P>{t("city")}</P>
                                        </FlexChild>
                                        <FlexChild width={"70%"}>
                                            <VerticalFlex>
                                                <Select isDisabled={disabled} ref={citySelectRef} styles={customStyles} options={cities} placeholder={t("city")} value={selectedCity ? selectedCity : null} onChange={onCityChanged} />
                                                <InputText hidden ref={el => (inputs.current[3] = el)} value={selectedCity ? selectedCity.id : null} regExp={[textFormat]} targetRef={citySelectRef} />
                                            </VerticalFlex>
                                            {/* <InputText disabled={disabled} value={shippingInfo ? shippingInfo.provinceLabel : null} /> */}
                                        </FlexChild>
                                    </HorizontalFlex>
                                </div>
                            </FlexChild>
                            <FlexChild>
                                <div className={style.borderBottom}>
                                    <HorizontalFlex justifyContent={"flex-start"} gap={10}>
                                        <FlexChild width={"20%"}>
                                            <P>{t("postalCode")}</P>
                                        </FlexChild>
                                        <FlexChild width={"70%"}>
                                            <VerticalFlex>
                                                {/* <InputText disabled={disabled} value={shippingInfo ? shippingInfo.postalCodeValue : null} /> */}
                                                <Select isDisabled={disabled} ref={postalCodeSelectRef} styles={customStyles} options={postalCodes} placeholder={t("postalCode")} value={selectedPostalCode ? selectedPostalCode : null} onChange={onPostalCodeChanged} />
                                                <InputText hidden ref={el => (inputs.current[4] = el)} value={selectedPostalCode ? selectedPostalCode.id : null} regExp={[textFormat]} targetRef={postalCodeSelectRef} />
                                            </VerticalFlex>
                                        </FlexChild>
                                    </HorizontalFlex>
                                </div>
                            </FlexChild>
                        </FlexChild>
                        <FlexChild>
                            <div className={style.borderBottom}>
                                <HorizontalFlex justifyContent={"flex-start"} gap={10}>
                                    <FlexChild width={"20%"}>
                                        <P>{t("address")}</P>
                                    </FlexChild>
                                    <FlexChild width={"70%"}>
                                        <VerticalFlex gap={10}>
                                            <InputText ref={el => (inputs.current[5] = el)} disabled={disabled} value={shippingInfo ? shippingInfo.cityLabelCn + shippingInfo.addressDetail : null} regExp={[textFormat]} />
                                        </VerticalFlex>
                                    </FlexChild>
                                </HorizontalFlex>
                            </div>
                        </FlexChild>
                        <FlexChild>
                            <div className={style.borderBottom}>
                                <HorizontalFlex justifyContent={"flex-start"} gap={10}>
                                    <FlexChild width={"20%"}>
                                        <P>{t("number")}</P>
                                    </FlexChild>
                                    <FlexChild>
                                        <HorizontalFlex gap={10} justifyContent={"flex-start"}>
                                            <FlexChild width={"90%"}>
                                                <InputText ref={el => (inputs.current[1] = el)} disabled={disabled} placeHolder={t("enterPhoneNumber")} value={shippingInfo ? shippingInfo.mobileNo : null} regExp={[mobileNoFormat]} onChange={onChange} />
                                            </FlexChild>
                                        </HorizontalFlex>
                                    </FlexChild>
                                </HorizontalFlex>
                            </div>
                        </FlexChild>
                        <FlexChild>
                            <HorizontalFlex justifyContent={"flex-start"} gap={10}>
                                <FlexChild>
                                    <HorizontalFlex gap={10} justifyContent={"flex-start"}>
                                        <FlexChild width={"50%"}>
                                            <CheckCircle disabled={disabled} ref={el => (inputs.current[6] = el)} label={t("saveAsDefaultShippingInfo")} />
                                        </FlexChild>
                                    </HorizontalFlex>
                                </FlexChild>
                            </HorizontalFlex>
                        </FlexChild>
                    </VerticalFlex>
                    :
                    <VerticalFlex gap={10}>
                        <FlexChild padding={"0 0 10px 0"}>
                            <Center width={"100%"} textAlign={"left"}>
                                <P size={24} weight={"bold"}>{t("shippingInfoAdd")}</P>
                            </Center>
                        </FlexChild>
                        <FlexChild>
                            <div className={style.addressHeaderWrap}>
                                <HorizontalFlex gap={25}>
                                    <FlexChild width={"initial"}>
                                        <P size={18}>{t("chooseAddress")}</P>
                                    </FlexChild>
                                    <FlexChild width={"initial"}>
                                        <HorizontalFlex>
                                            <CheckCircle ref={checkRef} callback={newCheckCallback} checked={true} />
                                            <P>{t("addNewAddress")}</P>
                                        </HorizontalFlex>
                                    </FlexChild>
                                    <FlexChild width={"initial"}>
                                        <HorizontalFlex>
                                            <CheckCircle readOnly checked={checked} />
                                            <P>{t("originalShippingAddress")}</P>
                                        </HorizontalFlex>
                                    </FlexChild>
                                    <FlexChild>
                                        <P cursor onClick={shippingInfoClick} padding={"1px 10px"} borderRadius={"3px"} border={"1.5px solid #999"} color={"#999"} backgroundColor={"white"} size={"10pt"}>{t("shippingAddressList")}</P>
                                    </FlexChild>
                                </HorizontalFlex>
                            </div>
                        </FlexChild>
                        <FlexChild>
                            <div className={style.borderBottom}>
                                <HorizontalFlex justifyContent={"flex-start"} gap={10}>
                                    <FlexChild width={"20%"}>
                                        <P>{t("name")}</P>
                                    </FlexChild>

                                    <FlexChild width={"30%"}>
                                        <VerticalFlex>
                                            <InputText ref={el => inputs.current[0] = el} regExp={[textFormat]} disabled={disabled} placeHolder={t("name")} value={shippingInfo ? shippingInfo.receiverName : null} />
                                        </VerticalFlex>
                                    </FlexChild>
                                </HorizontalFlex>
                            </div>
                        </FlexChild>
                        <FlexChild>
                            <FlexChild>
                                <div className={style.borderBottom}>
                                    <HorizontalFlex justifyContent={"flex-start"} gap={10}>
                                        <FlexChild width={"20%"}>
                                            <P>{t("province")}</P>
                                        </FlexChild>
                                        <FlexChild width={"60%"}>
                                            <VerticalFlex>
                                                <Select isDisabled={disabled} ref={provinceSelectRef} styles={customStyles} options={provinces} placeholder={t("province")} value={selectedProvince ? selectedProvince : null} onChange={onProvinceChanged} />
                                                {/* <InputText disabled={disabled} value={shippingInfo ? shippingInfo.cityLabel : null} /> */}
                                                <InputText hidden ref={el => (inputs.current[2] = el)} value={selectedProvince ? selectedProvince.id : null} regExp={[textFormat]} targetRef={provinceSelectRef} />
                                            </VerticalFlex>


                                        </FlexChild>
                                    </HorizontalFlex>
                                </div>
                            </FlexChild>
                            <FlexChild>
                                <div className={style.borderBottom}>
                                    <HorizontalFlex justifyContent={"flex-start"} gap={10}>
                                        <FlexChild width={"20%"}>
                                            <P>{t("city")}</P>
                                        </FlexChild>
                                        <FlexChild width={"60%"}>
                                            <VerticalFlex>
                                                <Select isDisabled={disabled} ref={citySelectRef} styles={customStyles} options={cities} placeholder={t("city")} value={selectedCity ? selectedCity : null} onChange={onCityChanged} />
                                                <InputText hidden ref={el => (inputs.current[3] = el)} value={selectedCity ? selectedCity.id : null} regExp={[textFormat]} targetRef={citySelectRef} />
                                            </VerticalFlex>
                                            {/* <InputText disabled={disabled} value={shippingInfo ? shippingInfo.provinceLabel : null} /> */}
                                        </FlexChild>
                                    </HorizontalFlex>
                                </div>
                            </FlexChild>
                            <FlexChild>
                                <div className={style.borderBottom}>
                                    <HorizontalFlex justifyContent={"flex-start"} gap={10}>
                                        <FlexChild width={"20%"}>
                                            <P>{t("postalCode")}</P>
                                        </FlexChild>
                                        <FlexChild width={"30%"}>
                                            <VerticalFlex>
                                                {/* <InputText disabled={disabled} value={shippingInfo ? shippingInfo.postalCodeValue : null} /> */}
                                                <Select isDisabled={disabled} ref={postalCodeSelectRef} styles={customStyles} options={postalCodes} placeholder={t("postalCode")} value={selectedPostalCode ? selectedPostalCode : null} onChange={onPostalCodeChanged} />
                                                <InputText hidden ref={el => (inputs.current[4] = el)} value={selectedPostalCode ? selectedPostalCode.id : null} regExp={[textFormat]} targetRef={postalCodeSelectRef} />
                                            </VerticalFlex>
                                        </FlexChild>
                                    </HorizontalFlex>
                                </div>
                            </FlexChild>
                        </FlexChild>
                        <FlexChild>
                            <div className={style.borderBottom}>
                                <HorizontalFlex justifyContent={"flex-start"} gap={10}>
                                    <FlexChild width={"20%"}>
                                        <P>{t("address")}</P>
                                    </FlexChild>
                                    <FlexChild width={"70%"}>
                                        <VerticalFlex gap={10}>

                                            <InputText ref={el => (inputs.current[5] = el)} disabled={disabled} value={shippingInfo ? shippingInfo.cityLabelCn + shippingInfo.addressDetail : null} regExp={[textFormat]} />
                                        </VerticalFlex>
                                    </FlexChild>
                                </HorizontalFlex>
                            </div>
                        </FlexChild>
                        <FlexChild>
                            <div className={style.borderBottom}>
                                <HorizontalFlex justifyContent={"flex-start"} gap={10}>
                                    <FlexChild width={"20%"}>
                                        <P>{t("number")}</P>
                                    </FlexChild>
                                    <FlexChild>
                                        <HorizontalFlex gap={10} justifyContent={"flex-start"}>
                                            <FlexChild width={"50%"}>
                                                <InputText ref={el => (inputs.current[1] = el)} disabled={disabled} placeHolder={t("enterPhoneNumber")} value={shippingInfo ? shippingInfo.mobileNo : null} regExp={[mobileNoFormat]} />
                                            </FlexChild>
                                        </HorizontalFlex>
                                    </FlexChild>
                                </HorizontalFlex>
                            </div>
                        </FlexChild>
                        <FlexChild>
                            <HorizontalFlex justifyContent={"flex-start"} gap={10}>
                                <FlexChild>
                                    <HorizontalFlex gap={10} justifyContent={"flex-start"}>
                                        <FlexChild width={"50%"}>
                                            <CheckCircle disabled={disabled} ref={el => (inputs.current[6] = el)} label={t("saveAsDefaultShippingInfo")} />
                                        </FlexChild>
                                    </HorizontalFlex>
                                </FlexChild>
                            </HorizontalFlex>
                        </FlexChild>
                    </VerticalFlex>
            }
        </FlexChild>

    );
});

export default ShippingInfomationCN;