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
import style from "./ShippingInfoEditModal.module.css";
import { validateInputs } from "shared/utils/Utils";
import SuperExpressive from "super-expressive";
import { indexOf } from "lodash-es";

const ShippingInfoEditModal = NiceModal.create(
    (props) => {
        const { t } = useTranslation();
        const [withHeader, withFooter] = [true, false];
        const [width, height] = ["min(100%, 500px)", "initial"];
        const withCloseButton = false;
        const clickOutsideToClose = true;
        const title = t("editShippingInfo");
        const buttonText = t("close");

        const modal = useRef();
        const inputs = useRef([]);

        const [shippingInfo, setShippingInfo] = useState(props.data);

        const [provinces, setProvinces] = useState();
        const [cities, setCities] = useState();
        const [postalCodes, setPostalCodes] = useState();
        const [selectedProvince, setSelectedProvince] = useState({ id: shippingInfo.provinceId, value: shippingInfo.provinceValue, label: shippingInfo.provinceLabel });
        const [selectedCity, setSelectedCity] = useState({ id: shippingInfo.cityId, value: shippingInfo.cityValue, label: shippingInfo.cityLabel });
        const [selectedPostalCode, setSelectedPostalCode] = useState({ id: shippingInfo.postalCodeId, value: shippingInfo.postalCodeValue, label: shippingInfo.postalCodeLabel });
        const provinceSelectRef = useRef();
        const citySelectRef = useRef();
        const postalCodeSelectRef = useRef();

        const [isLoadingProvince, setLoadingProvince] = useState(true);
        const [isLoadingCity, setLoadingCity] = useState(true);
        const [isLoadingPostalCode, setLoadingPostalCode] = useState(true);
        const [isLoading, setLoading] = useState(true);

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
            inputs.current[0].setValue(shippingInfo.receiverName);
            inputs.current[1].setValue(shippingInfo.mobileNo);
            inputs.current[5].setValue(shippingInfo.addressDetail);
            inputs.current[6].setValue(shippingInfo.defaultYn);

            requester.getAllProvinces((result) => {
                setProvinces(result.data);
            });

            let data1 = { provinceId: selectedProvince.id }
            requester.getAllCitiesByProvinceId(data1, (result) => {
                setCities(result.data);
            });

            let data2 = { cityId: selectedCity.id }
            requester.getAllPostalCodesByCityId(data2, (result) => {
                setPostalCodes(result.data);
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
                        id: shippingInfo.id,
                        receiverName: inputs.current[0].getValue(),
                        mobileNo: inputs.current[1].getValue(),
                        provinceId: inputs.current[2].getValue(),
                        cityId: inputs.current[3].getValue(),
                        postalCodeId: inputs.current[4].getValue(),
                        addressDetail: inputs.current[5].getValue(),
                        defaultYn: inputs.current[6].getValue()
                    };

                    

                    requester.saveShippingInfo(data, (result) => {
                        console.log(result.data);
                        if (result.code === 0) {
                            modal.current.close();
                            if(props.callback){
                                props.callback(result.data);
                            }
                        }
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
            if (!isLoading) {
                if (selectedProvince) {
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
            if (!isLoading) {
                if (selectedCity) {
                    let data = { cityId: selectedCity.id }
                    requester.getAllPostalCodesByCityId(data, (result) => {
                        setPostalCodes(result.data);
                        setSelectedPostalCode();
                    })
                }
            }
        }, [selectedCity]);

        useEffect(() => {
            if (provinces && isLoadingProvince) {
                setLoadingProvince(false);
            }
        }, [provinces]);

        useEffect(() => {
            if (cities && isLoadingCity) {
                setLoadingCity(false);
            }
        }, [cities]);

        useEffect(() => {
            if (postalCodes && isLoadingPostalCode) {
                setLoadingPostalCode(false);
            }
        }, [postalCodes]);

        useEffect(() => {
            if (isLoading) {
                if (!isLoadingProvince && !isLoadingCity && !isLoadingPostalCode) {
                    setLoading(false);
                }
            }
        }, [isLoadingProvince, isLoadingCity, isLoadingPostalCode]);

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

        return (
            <ModalBase ref={modal} width={width} height={height} withHeader={withHeader} withFooter={withFooter} withCloseButton={withCloseButton} clickOutsideToClose={clickOutsideToClose} title={title} buttonText={buttonText} overflow={"visible"}>
                <div className={style.wrap}>
                    <VerticalFlex padding={10} gap={10}>
                        <FlexChild>
                            <InputText ref={el => (inputs.current[0] = el)} placeHolderMoveUp={true} placeHolder={t("receiverName")} regExp={[textFormat]} />
                        </FlexChild>
                        <FlexChild>
                            <InputText ref={el => (inputs.current[1] = el)} placeHolderMoveUp={true} placeHolder={t("mobileNo")} regExp={[textFormat]} />
                        </FlexChild>
                        <FlexChild>
                            <div className={style.pure}>
                                <Select ref={provinceSelectRef} styles={customStyles} options={provinces} placeholder={t("province")} value={selectedProvince ? selectedProvince : null} onChange={onProvinceChanged} />
                                <Select ref={citySelectRef} styles={customStyles} options={cities} placeholder={t("city")} value={selectedCity ? selectedCity : null} onChange={onCityChanged} />
                                <Select ref={postalCodeSelectRef} styles={customStyles} options={postalCodes} placeholder={t("postalCode")} value={selectedPostalCode ? selectedPostalCode : null} onChange={onPostalCodeChanged} />
                                <InputText ref={el => (inputs.current[2] = el)} value={selectedProvince ? selectedProvince.id : null} hidden regExp={[textFormat]} targetRef={provinceSelectRef} />
                                <InputText ref={el => (inputs.current[3] = el)} value={selectedCity ? selectedCity.id : null} hidden regExp={[textFormat]} targetRef={citySelectRef} />
                                <InputText ref={el => (inputs.current[4] = el)} value={selectedPostalCode ? selectedPostalCode.id : null} hidden regExp={[textFormat]} targetRef={postalCodeSelectRef} />
                            </div>
                        </FlexChild>
                        <FlexChild>
                            <InputText ref={el => (inputs.current[5] = el)} placeHolderMoveUp={true} placeHolder={t("addressDetail")} regExp={[textFormat]} />
                        </FlexChild>
                        <FlexChild>
                            <CheckCircle ref={el => (inputs.current[6] = el)} label={t("saveAsDefaultShippingInfo")} />
                        </FlexChild>
                        <FlexChild>
                            <ButtonEclipse text={t("save")} lineHeight={"47px"} height={50} backgroundColor={"var(--main-color)"} onClick={onSaveButtonClick} borderRadius={"5px"} />
                        </FlexChild>
                    </VerticalFlex>
                </div>
            </ModalBase>
        );
    }
);

export default ShippingInfoEditModal;