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
import RadioGroup from "components/manager/views/forms/radio/RadioGroup";

import Radio from "components/inputs/radio/Radio";
import { toast } from "react-toastify";



const ShippingInfomation = forwardRef((props, ref) => {
    const { width, isMobile } = useContext(BrowserDetectContext);

    const inputs = useRef([]);
    const provinceSelectRef = useRef();
    const citySelectRef = useRef();
    const postalCodeSelectRef = useRef();
    const [defaultShippingInfo, setDefaultShippingInfo] = useState();
    const [shippingInfos, setShippingInfos] = useState([]);
    const [provinces, setProvinces] = useState();
    const [cities, setCities] = useState();
    const [postalCodes, setPostalCodes] = useState();
    const [selectedProvince, setSelectedProvince] = useState();
    const [selectedCity, setSelectedCity] = useState();
    const [selectedPostalCode, setSelectedPostalCode] = useState();
    const [selectedShippingInfo, setSelectedShippingInfo] = useState();
    const [shippingInfo, setShippingInfo] = useState([]);
    const [checked, setChecked] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [data, setData] = useState();
    const [mounted, setMounted] = useState(false);
    const [type, setType] = useState("EXISTING");
    const { t } = useTranslation();
    const shippingInfoClick = () => {
        NiceModal.show("shippingInfoSelectModal", { callback: shippingInfoCallback });
    }
    const shippingInfoCallback = (value, disabled, check) => {

        setDisabled(disabled);
        setShippingInfo(value);
        setDefaultShippingInfo(value);
        if (check) {
            setChecked(check);

        } else {
            setChecked(false);
        }
        setChecked(check);

    }

    useEffect(() => {
        if (shippingInfo) {
            let data = { provinceId: shippingInfo.provinceId }

            requester.getProvince(data, (result) => {
                setSelectedProvince(result.data);
            })
        }
    }, [shippingInfo])



    const handleCheckedChange = (type) => {
        setEnroll_company();

        if (type === "NEW") {
            setType("NEW");
            setDisabled(false);
        } else {
            setType("EXISTING");
            setDisabled(true);
        }
    };


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

            if (isMobile) {
                let mobileData = {
                    shippingName: defaultShippingInfo && defaultShippingInfo.shippingName,
                    receiverName: defaultShippingInfo && defaultShippingInfo.receiverName,
                    postalCodeKr: defaultShippingInfo && defaultShippingInfo.postalCodeKr,
                    addressKr: defaultShippingInfo && defaultShippingInfo.addressKr,
                    addressDetail: defaultShippingInfo && defaultShippingInfo.addressDetail,
                    provinceId: defaultShippingInfo && defaultShippingInfo.provinceId,
                    cityId: defaultShippingInfo && defaultShippingInfo.cityId,
                    postalCodeId: defaultShippingInfo && defaultShippingInfo.postalCodeId,
                    mobileNo: defaultShippingInfo && defaultShippingInfo.mobileNo,
                    defaultYn: defaultShippingInfo && defaultShippingInfo.defaultYn
                }
                return mobileData;
            } else {
                let data = {
                    shippingName: inputs.current && inputs.current[0].getValue(),
                    receiverName: inputs.current && inputs.current[1].getValue(),
                    postalCodeKr: inputs.current && inputs.current[2].getValue(),
                    addressKr: inputs.current && inputs.current[3].getValue(),
                    addressDetail: inputs.current && inputs.current[4].getValue(),
                    provinceId: inputs.current && inputs.current[5].getValue(),
                    cityId: inputs.current && inputs.current[6].getValue(),
                    postalCodeId: inputs.current && inputs.current[7].getValue(),
                    mobileNo: inputs.current && inputs.current[8].getValue(),
                    defaultYn: inputs.current && inputs.current[9].getValue()
                }
                return data;
            }


        }
    }));

    useEffect(() => {
        requester.getAllProvinces((result) => {
            setProvinces(result.data);
        });
        setMounted(true);


    }, [])
    useEffect(() => {
        requester.getDefaultShippingInfo((result) => {

            setDefaultShippingInfo(result.data);
        })
        requester.getAllShippingInfos((result) => {

            setShippingInfos(result.data);
        })
    }, [mounted])

    useEffect(() => {
        console.log(shippingInfos);
    }, [shippingInfos])

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
        if (type && shippingInfo && shippingInfo.length > 0) {
            if (props.callback) {
                props.callback(shippingInfo, type);
            }
        }
        console.log(shippingInfos.length);
        if (shippingInfos.length > 0 && type === "NEW") {
            inputs.current[0].setValue("");
            inputs.current[1].setValue("");
            inputs.current[2].setValue("");
            inputs.current[3].setValue("");
            inputs.current[4].setValue("");
            inputs.current[5].setValue("d221df3e-5f43-11ed-af22-00163e916a3b");
            inputs.current[6].setValue("d9f19a46-5f43-11ed-af22-00163e916a3b");
            inputs.current[7].setValue("21194cfb-5f51-11ed-af22-00163e916a3b");
            inputs.current[8].setValue("");
            inputs.current[9].setValue(false);
        } else {

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
    const [enroll_company, setEnroll_company] = useState({});

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

    const onAddShippingInfoClick = () => {
        NiceModal.show("shippingInfoAddKrModal", { callback: onShippingInfoModalClose });
    }
    const onShippingInfoModalClose = (value) => {
        setDefaultShippingInfo(value[0]);
    }
    const onShippingInfoChange = (e) => {
        let valueData = { id: e.target.value };

        requester.shippingInfoFindById(valueData, (result) => {
            console.log(result.data);
            if (result.code === 0) {
                setShippingInfo(result.data);
                setSelectedShippingInfo(result.data);
                console.log(result.data);
                if (props.callback) {
                    props.callback(result.data, type);
                }
                setDisabled(true);
                setChecked(true);

            }
        })
    }

    const addressBtnStyle = {
        backgroundColor: "#4d4f56",
        color: "white",
        padding: "5px 15px"

    }

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
                            <div className={style.mobileAddressWrap}>
                                <VerticalFlex gap={10}>
                                    <FlexChild>
                                        <HorizontalFlex gap={25}>
                                            {/* <FlexChild width={"initial"}>
                                                <HorizontalFlex>
                                                    <CheckCircle readOnly checked={checked} />
                                                    <P>{t("originalShippingAddress")}</P>
                                                </HorizontalFlex>
                                            </FlexChild> */}
                                            <FlexChild>
                                                <HorizontalFlex gap={20}>
                                                    <FlexChild width={"max-content"}>
                                                        <P weight={"bold"}>{defaultShippingInfo && defaultShippingInfo.shippingName}</P>
                                                    </FlexChild>
                                                    <FlexChild>
                                                        <P size={10} borderRadius={"10px"} padding={"1px 9px"} backgroundColor={"#4d4f56"} color={"white"}>기본 배송지</P>
                                                    </FlexChild>
                                                </HorizontalFlex>
                                            </FlexChild>
                                            <FlexChild justifyContent={"flex-end"}>
                                                <P cursor onClick={shippingInfoClick} padding={"1px 6px"} borderRadius={"3px"} border={"1.5px solid #999"} color={"#999"} backgroundColor={"white"} size={"10pt"}>{t("shippingAddressList")}</P>
                                            </FlexChild>
                                        </HorizontalFlex>
                                    </FlexChild>
                                    <FlexChild>
                                        <div style={{ height: "1px", backgroundColor: "#ddd" }} />
                                    </FlexChild>
                                    <FlexChild>
                                        {
                                            defaultShippingInfo
                                                ?
                                                <VerticalFlex flexStart>
                                                    <FlexChild>
                                                        <P>{defaultShippingInfo && defaultShippingInfo.receiverName}</P>
                                                    </FlexChild>
                                                    <FlexChild>
                                                        <P>{defaultShippingInfo && defaultShippingInfo.postalCodeKr}</P>
                                                    </FlexChild>
                                                    <FlexChild>
                                                        <P>{defaultShippingInfo && defaultShippingInfo.addressKr + " " + defaultShippingInfo.addressDetail}</P>
                                                    </FlexChild>
                                                    <FlexChild>
                                                        <P>{defaultShippingInfo && defaultShippingInfo.mobileNo}</P>
                                                    </FlexChild>

                                                </VerticalFlex>
                                                :
                                                <VerticalFlex flexStart>
                                                    <FlexChild>
                                                        <P>배송지를 추가해주세요</P>
                                                    </FlexChild>
                                                    <FlexChild>
                                                        <P cursor onClick={onAddShippingInfoClick} size={12} weight={"bold"} color={"var(--main-color)"}>+ 배송지 추가</P>
                                                    </FlexChild>
                                                </VerticalFlex>

                                        }

                                    </FlexChild>

                                </VerticalFlex>
                            </div>
                        </FlexChild>
                    </VerticalFlex>
                    :
                    <VerticalFlex gap={10}>
                        <FlexChild padding={"0 0 10px 0"}>
                            <Center width={"100%"} textAlign={"left"}>
                                <P size={20} weight={"bold"}>{t("shippingInfoAdd")}</P>
                            </Center>
                        </FlexChild>
                        <FlexChild>

                            <div className={style.addressHeaderWrap}>
                                <HorizontalFlex gap={20}>
                                    <FlexChild width={"20%"}>
                                        <P weight={"bold"} size={14}>{t("배송지")}</P>
                                    </FlexChild>
                                    <FlexChild width={"initial"}>
                                        <Radio
                                            name="shipping"
                                            value="EXISTING"
                                            selectedValue={type}
                                            onCheckedChange={handleCheckedChange}
                                        />
                                        <P>{t("originalShippingAddress")}</P>
                                    </FlexChild>
                                    <FlexChild width={"initial"}>
                                        <Radio
                                            name="shipping"
                                            value="NEW"
                                            selectedValue={type}
                                            onCheckedChange={handleCheckedChange}
                                        />
                                        <P>{t("addNewAddress")}</P>
                                    </FlexChild>
                                    <FlexChild />
                                    {/* <FlexChild>
                                        <P cursor onClick={shippingInfoClick} padding={"1px 10px"} borderRadius={"3px"} border={"1.5px solid #999"} color={"#999"} backgroundColor={"white"} size={"10pt"}>{t("shippingAddressList")}</P>
                                    </FlexChild> */}
                                </HorizontalFlex>
                            </div>
                        </FlexChild>
                        <FlexChild>
                            <div style={{ height: "1px", backgroundColor: "#dcdcdc" }} />
                        </FlexChild>
                        <FlexChild>
                            <HorizontalFlex gap={10}>
                                <FlexChild width={"20%"}>
                                    <P weight={"bold"} size={14}>{t("배송지명")}</P>
                                </FlexChild>
                                <FlexChild width={"max-content"}>
                                    <div style={{ width: "initial" }}>
                                        {
                                            type === "NEW"
                                                ?
                                                <InputText ref={el => inputs.current[0] = el} regExp={[textFormat]} disabled={disabled} placeHolder={t("배송지명")} value={selectedShippingInfo ? selectedShippingInfo.receiverName : null} />
                                                :
                                                <CFormSelect onChange={onShippingInfoChange}>
                                                    <option>선택하세요</option>
                                                    {
                                                        shippingInfos &&
                                                        shippingInfos.map((data, index) => {
                                                            return (
                                                                <option value={data.id}>{data.shippingName}</option>
                                                            );

                                                        })



                                                    }
                                                </CFormSelect>
                                        }
                                    </div>
                                </FlexChild>
                                <FlexChild>
                                    <HorizontalFlex justifyContent={"flex-start"} gap={10}>
                                        <FlexChild>
                                            <HorizontalFlex gap={10} justifyContent={"flex-start"}>
                                                <FlexChild width={"50%"}>
                                                    <CheckCircle disabled={disabled} ref={el => (inputs.current[9] = el)} label={t("saveAsDefaultShippingInfo")} value={selectedShippingInfo && selectedShippingInfo.defaultYn} />
                                                </FlexChild>
                                            </HorizontalFlex>
                                        </FlexChild>
                                    </HorizontalFlex>
                                </FlexChild>
                            </HorizontalFlex>
                        </FlexChild>
                        <FlexChild>

                            <HorizontalFlex justifyContent={"flex-start"} gap={10}>
                                <FlexChild width={"20%"}>
                                    <P weight={"bold"} size={14}>{t("name")}</P>
                                </FlexChild>

                                <FlexChild width={"39%"}>
                                    <VerticalFlex>
                                        <InputText ref={el => inputs.current[1] = el} regExp={[textFormat]} disabled={disabled} placeHolder={t("name")} value={selectedShippingInfo ? selectedShippingInfo.receiverName : null} />
                                    </VerticalFlex>
                                </FlexChild>
                            </HorizontalFlex>

                        </FlexChild>
                        <FlexChild>
                            <HorizontalFlex justifyContent={"flex-start"} gap={10}>

                                <FlexChild width={"20%"}>
                                    <P weight={"bold"} size={14}>{t("address")}</P>
                                </FlexChild>
                                <FlexChild>
                                    <VerticalFlex gap={10} flexStart>
                                        <FlexChild width={"60%"}>
                                            <HorizontalFlex gap={20}>
                                                <FlexChild>
                                                    <InputText readOnly ref={el => (inputs.current[2] = el)} disabled={disabled} value={selectedShippingInfo ? selectedShippingInfo.postalCodeKr : enroll_company ? enroll_company.zonecode : ""} regExp={[textFormat]} />
                                                </FlexChild>
                                                <FlexChild>
                                                    {
                                                        disabled ?
                                                            null
                                                            :
                                                            <CustomButton style={addressBtnStyle} onClick={addressKrModalClick} text={"우편번호 찾기"} />
                                                    }

                                                </FlexChild>
                                            </HorizontalFlex>
                                        </FlexChild>
                                        <FlexChild>
                                            <HorizontalFlex gap={10}>
                                                <FlexChild>
                                                    <InputText readOnly ref={el => (inputs.current[3] = el)} disabled={disabled} value={selectedShippingInfo ? selectedShippingInfo.addressKr : enroll_company ? enroll_company.address : ""} regExp={[textFormat]} />
                                                </FlexChild>
                                                <FlexChild>
                                                    <InputText ref={el => (inputs.current[4] = el)} disabled={disabled} value={selectedShippingInfo ? selectedShippingInfo.addressDetail : ""} regExp={[textFormat]} placeHolder={t("상세주소를 입력해주세요 .")} />
                                                </FlexChild>
                                            </HorizontalFlex>
                                        </FlexChild>
                                    </VerticalFlex>
                                </FlexChild>
                            </HorizontalFlex>
                        </FlexChild>
                        <FlexChild>
                            <HorizontalFlex justifyContent={"flex-start"} gap={10}>

                                <FlexChild>
                                    {/* <InputText disabled readOnly placeholder="주소" onChange={handleInput} value={enroll_company.address} /> */}
                                </FlexChild>
                            </HorizontalFlex>
                            <InputText hidden ref={el => (inputs.current[5] = el)} value={"d221df3e-5f43-11ed-af22-00163e916a3b"} regExp={[textFormat]} targetRef={provinceSelectRef} />
                            <InputText hidden ref={el => (inputs.current[6] = el)} value={"d9f19a46-5f43-11ed-af22-00163e916a3b"} regExp={[textFormat]} targetRef={citySelectRef} />
                            <InputText hidden ref={el => (inputs.current[7] = el)} value={"21194cfb-5f51-11ed-af22-00163e916a3b"} regExp={[textFormat]} targetRef={postalCodeSelectRef} />
                        </FlexChild>
                        <FlexChild>
                            <HorizontalFlex justifyContent={"flex-start"} gap={10}>
                                <FlexChild width={"20%"}>
                                    <P weight={"bold"} size={14}>{t("number")}</P>
                                </FlexChild>
                                <FlexChild>
                                    <HorizontalFlex gap={10} justifyContent={"flex-start"}>
                                        <FlexChild width={"49%"}>
                                            <InputText ref={el => (inputs.current[8] = el)} disabled={disabled} placeHolder={t("enterPhoneNumber")} value={selectedShippingInfo ? selectedShippingInfo.mobileNo : null} regExp={[mobileNoFormat]} />
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

export default ShippingInfomation;