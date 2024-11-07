import { Checkbox } from "antd";
import InputText from "components/inputs/InputText";
import P from "components/P";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import VerticalFlex from "layouts/flex/VerticalFlex";
import Center from "layouts/wrapper/Center";
import { useRef } from "react";
import style from "./VendorRegister.module.css";
import { ToastContainer, toast } from "react-toastify";
import { requester } from "App";
import { validateInputs } from "shared/utils/Utils";
import RadioChildren from "components/manager/views/forms/radio/RadioChildren";
import InputPassword from "components/inputs/InputPassword";
import { useTranslation } from "react-i18next";
import { passwordFormat } from "InitialData/regExp";
import CustomButton from "components/buttons/CustomButton";

function VendorRegisterDetail() {
    const inputs = useRef([]);
    const { t } = useTranslation();

    const onSaveClick = () => {
        let data = { userName: "", password: "", businessName: "", businessNo: "", name: "", mobileNo: "" };

        validateInputs(inputs.current).then((result) => {
            if (result.isValid) {
                data.userName = inputs.current[0].getValue();
                data.password = inputs.current[1].getValue();
                data.businessName = inputs.current[2].getValue();
                data.businessNo = inputs.current[3].getValue();
                data.name = inputs.current[4].getValue();
                data.mobileNo = inputs.current[5].getValue();
                console.log(data);
                requester.vendorSignUp(data, (result) => {
                    if (result.code === 0) {
                        toast.success("입점사를 등록했습니다", {
                            autoClose: 1000, position: toast.POSITION.BOTTOM_CENTER
                        });
                    } else {
                        toast.error("중복된 아이디입니다", {
                            autoClose: 1000, position: toast.POSITION.BOTTOM_CENTER
                        });
                    }
                });
            } else {
                toast.error("입력하신 정보를 확인해주세요", {
                    autoClose: 1000, position: toast.POSITION.BOTTOM_CENTER
                });
            }
        });
    }

    return (
        <VerticalFlex gap={20}>
            <FlexChild>
                <HorizontalFlex gap={40}>
                    <FlexChild width={"15%"}>
                        <P>입점사 아이디</P>
                    </FlexChild>
                    <FlexChild>
                        <InputText ref={el => (inputs.current[0] = el)} />
                    </FlexChild>
                </HorizontalFlex>
            </FlexChild>
            <FlexChild>
                <HorizontalFlex gap={40}>
                    <FlexChild width={"15%"} >
                        <P>비밀번호</P>
                    </FlexChild>
                    <FlexChild>
                        <InputPassword signUp ref={el => (inputs.current[1] = el)} placeHolder={t("password")} placeHolderComfirm={t("password") + t("confirm")} confirmVisible={true} regExp={[passwordFormat]} />
                    </FlexChild>
                </HorizontalFlex>
            </FlexChild>
            <FlexChild>
                <div className={style.line} />
            </FlexChild>
            <FlexChild>
                <HorizontalFlex gap={40}>
                    <FlexChild width={"15%"}>
                        <P>상호명</P>
                    </FlexChild>
                    <FlexChild>
                        <InputText ref={el => (inputs.current[2] = el)} />
                    </FlexChild>
                </HorizontalFlex>
            </FlexChild>
            <FlexChild>
                <HorizontalFlex gap={40}>
                    <FlexChild width={"15%"}>
                        <P>사업자 번호</P>
                    </FlexChild>
                    <FlexChild>
                        <InputText ref={el => (inputs.current[3] = el)} />
                    </FlexChild>
                </HorizontalFlex>
            </FlexChild>
            <FlexChild>
                <div className={style.line} />
            </FlexChild>
            <FlexChild>
                <HorizontalFlex gap={40}>
                    <FlexChild width={"15%"}>
                        <P>담당자명</P>
                    </FlexChild>
                    <FlexChild>
                        <InputText ref={el => (inputs.current[4] = el)} />
                    </FlexChild>
                </HorizontalFlex>
            </FlexChild>
            <FlexChild>
                <HorizontalFlex gap={40}>
                    <FlexChild width={"15%"}>
                        <P>담당자 연락처</P>
                    </FlexChild>
                    <FlexChild>
                        <InputText ref={el => (inputs.current[5] = el)} />
                    </FlexChild>
                </HorizontalFlex>
            </FlexChild>
            <FlexChild>
                <CustomButton text={"등록"} onClick={onSaveClick} />
            </FlexChild>
        </VerticalFlex>
    );
}

export default VendorRegisterDetail;