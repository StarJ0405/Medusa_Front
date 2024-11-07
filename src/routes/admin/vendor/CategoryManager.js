import { requester } from "App";
import ButtonEclipse from "components/buttons/ButtonEclipse";
import InputText from "components/inputs/InputText";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import VerticalFlex from "layouts/flex/VerticalFlex";
import { useState, useRef, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import useAltEffect from "shared/hooks/useAltEffect";
import { clone, validateInputs } from "shared/utils/Utils";
import { useOutletContext, useNavigate } from "react-router-dom";
import { fas } from "@fortawesome/free-solid-svg-icons";
import style from "./CategoryManager.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "classnames";
import VerticalMiddleWrapper from "layouts/wrapper/VerticalMiddleWrapper";
import InputImage from "components/inputs/image/InputImage";
import NavTabs from "components/manager/NavTabs";
import { CButton } from "@coreui/react";
import { t } from "i18next";

function CategoryManager() {
    const { id } = useParams();
    const [category, setCategory] = useState();
    const [updateItem, setActiveNode] = useOutletContext();
    const inputs = useRef([]);
    const [bgColors, setBgColors] = useState([]);

    const onSaveClick = () => {
        let data = clone(category);

        
        // validateInputs(inputs.current).then((isValid) => {
        //     if (isValid) {
        //         data.titleKr = inputs.current[0].getValue();
        //         data.titleCn = inputs.current[1].getValue();
        //         // data.icon = inputs.current[2].getValue();
        //         data.icon = inputs.current[2].getValue();
        //         data.color = inputs.current[3].getValue();
        //         data.image = inputs.current[4].getValue();
        //         data.bgColor = inputs.current[5].getValue();
        //         requester.saveCategory(data, (result) => {
        //             if (result.code === 0) {
        //                 let changedItem = updateItem(data.id, result.data);
        //                 setCategory(changedItem);
        //             }
        //         });
        //     }
        // });
    }

    const onChangeColors = (colors) => {
        setBgColors(colors);
    }

    const onColorClick = (color) => {
        inputs.current[5].setValue(color);
    }

    const onDeleteClick = () => {

    }

    const SaveButton = () => {
        return (
            <CButton color={"primary"} onClick={onSaveClick} active={true} >
                {t("save")}
            </CButton>
        );
    }

    const DeleteButton = () => {
        return (
            <CButton color={"primary"} onClick={onDeleteClick} active={true} >
                {t("delete")}
            </CButton>
        );
    }

    useEffect(() => {
        let data = { id: id };
        requester.getCategory(data, (result) => {
            setCategory(result.data);
        });
    }, [id]);

    return (
        <div className={style.container}>
            <div className={style.stickyTop}>
                <HorizontalFlex padding={10}>
                    <FlexChild>
                        <NavTabs tabs={[{ title: "기본정보" }, { title: "스펙" }]} buttons={[<SaveButton />, <DeleteButton />]} />
                    </FlexChild>
                </HorizontalFlex>
            </div>
            {category ?

                <VerticalFlex flexStart={true} border={"10px solid black"} padding={10}>
                    <FlexChild >
                        <InputText ref={el => (inputs.current[0] = el)} label={"카테고리명(한글)"} labelWidth={140} placeHolder={"카테고리명(한글)"} value={category.titleKr} />
                    </FlexChild>
                    <FlexChild width={500} height={70} >
                        <InputText ref={el => (inputs.current[1] = el)} label={"카테고리명(중문)"} labelWidth={140} placeHolder={"카테고리명(중문)"} value={category.titleCn} />
                    </FlexChild>
                    <FlexChild height={600}>
                        <InputImage ref={el => (inputs.current[2] = el)} name={"아이콘"} label={"아이콘"} path={"category/" + id} labelWidth={140} cropWidth={150} cropHeight={150} value={category.icon} />
                    </FlexChild>
                    <FlexChild width={500} height={70} >
                        <InputText ref={el => (inputs.current[3] = el)} label={"색상"} labelWidth={140} placeHolder={"색상"} value={category.color} />
                    </FlexChild>
                    <FlexChild height={600}>
                        <InputImage ref={el => (inputs.current[4] = el)} name={"이미지"} label={"이미지"} path={"category/" + id} labelWidth={140} cropWidth={150} cropHeight={150} value={category.image} onChangeColors={onChangeColors} />
                    </FlexChild>
                    <FlexChild width={500} height={70} >
                        <InputText ref={el => (inputs.current[5] = el)} name={"배경색상"} label={"배경색상"} labelWidth={140} placeHolder={"배경색상"} value={category.bgColor} />
                    </FlexChild>
                    <FlexChild height={70}>
                        <HorizontalFlex>
                            {
                                bgColors ?
                                    bgColors.map((color) =>
                                        <FlexChild>
                                            <div style={{ backgroundColor: color }} onClick={() => onColorClick(color)}>

                                            </div>
                                        </FlexChild>
                                    )
                                    : null
                            }
                        </HorizontalFlex>

                    </FlexChild>
                </VerticalFlex>


                : <p>loading</p>}

        </div>
    );
}

export default CategoryManager;