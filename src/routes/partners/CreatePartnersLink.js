import ButtonEclipse from "components/buttons/ButtonEclipse";
import P from "components/P";
import FlexChild from "layouts/flex/FlexChild";
import VerticalFlex from "layouts/flex/VerticalFlex";
import style from "./CreatePartnersLink.module.css"
import CustomButton from "components/buttons/CustomButton";
import { requester } from "App";
import { ToastContainer, toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import InputText from "components/inputs/InputText";
import { useSearchParams } from "react-router-dom";

function CreatePartnersLink() {

    const { t } = useTranslation();
    const [value, setValue] = useState("");
    const [partnersUrl, setPartnersUrl] = useState();
    const [searchParams, setSearchParams] = useSearchParams();

    

    const onCreateUrl = () => {
        console.log(Math.random().toString(16).substr(2, 12));
        let randomStr = Math.random().toString(16).substr(2, 12);
        let data = { partnersUrl: randomStr };
        requester.createPartnersUrl(data, (result) => {
            if (result.data.partnersUrl) {
                toast.error(t("이미 url이 존재합니다"), {
                    autoClose: 1000, position: toast.POSITION.BOTTOM_CENTER
                });
                setValue("http://localhost:3000?partners=" + result.data.partnersUrl);
            } else {
                toast.success(t("url이 생성되었습니다."), {
                    autoClose: 1000, position: toast.POSITION.BOTTOM_CENTER

                });
                setValue("http://localhost:3000?partners=" + result.data.partnersUrl);
            }

        })
    }
    const onFindUrl = () => {
        requester.findPartnersUrl((result) => {
            console.log(result.data);
            if(result.data){
                setValue("http://localhost:3000?partners=" + result.data);
            }else{
                setValue("URL이 없습니다.");
            }
            
        })
    }
    


    return (
        <VerticalFlex gap={30}>
            <FlexChild>
                <P>파트너스 URL 생성하기</P>
            </FlexChild>
            <FlexChild>
                <CustomButton text={"고유 URL 생성하기"} onClick={onCreateUrl} />
            </FlexChild>
            <FlexChild>
                <CustomButton text={"내 URL 가져오기"} onClick={onFindUrl} />
            </FlexChild>
            <FlexChild>
                <InputText readOnly value={value ? value : ""} />
            </FlexChild>
        </VerticalFlex>
    );
}

export default CreatePartnersLink;