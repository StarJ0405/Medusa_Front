import { requester } from "App";
import InputText from "components/inputs/InputText";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import VerticalFlex from "layouts/flex/VerticalFlex";
import { useState, useRef, useEffect } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import useAltEffect from "shared/hooks/useAltEffect";
import ButtonEclipse from "components/buttons/ButtonEclipse";
import { clone, validateInputs } from "shared/utils/Utils";
import InputImage from "components/inputs/image/InputImage";
import PaddingWrapper from "layouts/wrapper/PaddingWrapper";
import style from "./CategoryManager.module.css";

function BrandManager() {
    const { id } = useParams();
    const [updateItem, setActiveNode] = useOutletContext();
    const [brand, setBrand] = useState();
    const inputs = useRef([]);
    const [colors, setColors] = useState([]);

    const onSaveClick = () => {
        let data = clone(brand);
        validateInputs(inputs.current).then((result) => {
            if (result.isValid) {
                data.titleKr = inputs.current[0].getValue();
                data.titleCn = inputs.current[1].getValue();
                data.icon = inputs.current[2].getValue();
                data.image = inputs.current[3].getValue();
                data.color = inputs.current[4].getValue();

                requester.saveBrand(data, (result) => {
                    if (result.code === 0) {
                        let changedItem = updateItem(data.id, data);
                        setBrand(changedItem);
                    }
                });
            }
        });
    }

    const onChangeColors = (colors) => {
        setColors(colors);
    }

    const onColorClick = (color) => {
        inputs.current[4].setValue(color);
    }


    useEffect(() => {
        let data = { id: id };
        requester.getBrand(data, (result) => {
            setBrand(result.data);
        });

    }, [id]);

    return (
        <div className={style.container}>
            <div className={style.stickyTop}>
                <HorizontalFlex padding={10}>
                    <FlexChild></FlexChild>
                    <FlexChild width={100}>
                        <ButtonEclipse text={"저장"} backgroundColor={"black"} onClick={onSaveClick} borderRadius={0} />
                    </FlexChild>
                </HorizontalFlex>
            </div>
            {brand ?
                <VerticalFlex flexStart={true} gap={10} border={"10px solid black"}>
                   
                    <FlexChild width={500} height={70} >
                        <InputText ref={el => (inputs.current[0] = el)} label={"브랜드명(한글)"} labelWidth={140} placeHolder={"브랜드명(한글)"} value={brand.titleKr} />
                    </FlexChild>
                    <FlexChild width={500} height={70} >
                        <InputText ref={el => (inputs.current[1] = el)} label={"브랜드명(중문)"} labelWidth={140} placeHolder={"브랜드명(중문)"} value={brand.titleCn} />
                    </FlexChild>
                    <FlexChild height={530}>
                        <InputImage ref={el => (inputs.current[2] = el)} label={"브랜드 라벨"} path={"brand"} labelWidth={140} cropWidth={100} cropHeight={100} value={brand.icon} />
                    </FlexChild>
                    <FlexChild height={600}>
                        <InputImage ref={el => (inputs.current[3] = el)} label={"브랜드 이미지"} path={"brand"} labelWidth={140} cropWidth={100} cropHeight={130} value={brand.image} onChangeColors={onChangeColors} />
                    </FlexChild>
                    <FlexChild width={500} height={70} >
                        <InputText ref={el => (inputs.current[4] = el)} name={"브랜드 색상"} label={"브랜드 색상"} labelWidth={140} placeHolder={"브랜드 색상"} value={brand.color} />
                    </FlexChild>
                    <FlexChild height={70}>
                        <HorizontalFlex>
                            {
                                colors ?
                                    colors.map((color) =>
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

export default BrandManager;