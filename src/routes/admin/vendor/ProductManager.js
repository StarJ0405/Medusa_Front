import { requester } from "App";
import InputText from "components/inputs/InputText";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import VerticalFlex from "layouts/flex/VerticalFlex";
import { useState, useRef, useEffect } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import useAltEffect from "shared/hooks/useAltEffect";
import style from "./CategoryManager.module.css";
import ButtonEclipse from "components/buttons/ButtonEclipse";
import { clone, getFilePath, validateInputs } from "shared/utils/Utils";
import InputAttachement from "components/inputs/InputAttachement";
import InputImage from "components/inputs/image/InputImage";
import PaddingWrapper from "layouts/wrapper/PaddingWrapper";
import { fileRequester } from "App";
import QuillEditor from "components/inputs/richEditor/QuillEditor";
import { Buffer } from "buffer";
import clsx from "classnames";
import InputHashTag from "components/inputs/InputHashTag";
import initialSearchCondition from "InitialData/InitialSearchCondition.json";

function ProductManager() {
    const { id } = useParams();
    const [updateItem, setActiveNode] = useOutletContext();
    const [product, setProduct] = useState();
    const inputs = useRef([]);
    const [bgColors, setBgColors] = useState([]);
    const [brands, setBrands] = useState([]);

    const onSaveClick = () => {
        let data = clone(product);
        validateInputs(inputs.current).then((result) => {
            if (result.isValid) {
                data.brandId = inputs.current[0].getValue();
                data.titleKr = inputs.current[1].getValue();
                data.titleCn = inputs.current[2].getValue();
                data.image = inputs.current[3].getValue();
                data.bgColor = inputs.current[4].getValue();
                data.hashTagKr = inputs.current[5].getValue();
                data.hashTagCn = inputs.current[6].getValue();
                data.comment = inputs.current[7].getValue();
                data.price = inputs.current[8].getValue();
                data.quantity = inputs.current[9].getValue();
                data.contentKr = inputs.current[10].getValue();

                requester.saveProduct(data, (result) => {
                    if (result.code === 0) {
                        let changedItem = updateItem(data.id, data);
                        setProduct(changedItem);
                    }
                });
            }
        });
    }

    const onChangeColors = (colors) => {
        setBgColors(colors);
    }

    const onColorClick = (color) => {
        inputs.current[4].setValue(color);
    }

    useEffect(() => {
        let searchCondition = clone(initialSearchCondition);
        searchCondition.productId = id;
        requester.searchProducts(searchCondition, (result) => {
            setProduct(result.data[0]);
        });

        requester.getAllBrands((result) => {
            setBrands(result.data);
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
            {product ?
                <VerticalFlex flexStart={true} gap={10}>
                    <FlexChild height={50}>
                        <HorizontalFlex>
                            <FlexChild width={100}>
                                <ButtonEclipse text={"저장"} backgroundColor={"black"} onClick={onSaveClick} borderRadius={0} />
                            </FlexChild>
                        </HorizontalFlex>
                    </FlexChild>
                    <FlexChild height={70} >
                        <InputText ref={el => (inputs.current[0] = el)} label={"브랜드"} labelWidth={140} placeHolder={"브랜드"} value={product.brandId} />
                    </FlexChild>
                    <FlexChild>
                        <div className={style.brandGroup}>
                            {brands ?
                                brands.map((brandItem, index) =>
                                    <div key={index} className={clsx(style.icon, { [style.selected]: true })} onClick={() => inputs.current[0].setValue(brandItem.id)}>
                                        <img src={brandItem.icon} />
                                    </div>
                                )
                                : null
                            }
                        </div>
                    </FlexChild>
                    <FlexChild width={500} height={70} >
                        <InputText ref={el => (inputs.current[1] = el)} name={"상품명(한글)"} label={"상품명(한글)"} labelWidth={140} placeHolder={"상품명(한글)"} value={product.titleKr} />
                    </FlexChild>
                    <FlexChild width={500} height={70} >
                        <InputText ref={el => (inputs.current[2] = el)} name={"상품명(중문)"} label={"상품명(중문)"} labelWidth={140} placeHolder={"상품명(중문)"} value={product.titleCn} />
                    </FlexChild>
                    <FlexChild height={600}>
                        <InputImage ref={el => (inputs.current[3] = el)} name={"상품 라벨"} label={"상품 라벨"} path={"product/" + id} labelWidth={140} cropWidth={100} cropHeight={100} value={product.image} onChangeColors={onChangeColors} maxSizeMb={1} />
                    </FlexChild>
                    <FlexChild width={500} height={70} >
                        <InputText ref={el => (inputs.current[4] = el)} name={"배경색상"} label={"배경색상"} labelWidth={140} placeHolder={"배경색상"} value={product.bgColor} />
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
                    <FlexChild width={500} height={"fit-content"} >
                        <InputHashTag ref={el => (inputs.current[5] = el)} name={"해시태그(한글)"} label={"해시태그(한글)"} labelWidth={140} placeHolder={"해시태그(한글)"} value={product.hashTagKr || ""} />
                        {/* <InputText ref={el => (inputs.current[5] = el)} name={"해시태그(한글)"} label={"해시태그(한글)"} labelWidth={140} placeHolder={"해시태그(한글)"} value={product.hashTagKr || ""} /> */}
                    </FlexChild>
                    <FlexChild width={500} height={70} >
                        <InputText ref={el => (inputs.current[6] = el)} name={"해시태그(중문)"} label={"해시태그(중문)"} labelWidth={140} placeHolder={"해시태그(중문)"} value={product.hashTagCn || ""} />
                    </FlexChild>
                    <FlexChild width={500} height={70} >
                        <InputText ref={el => (inputs.current[7] = el)} name={"소개"} label={"소개"} labelWidth={140} placeHolder={"소개"} value={product.comment} />
                    </FlexChild>
                    <FlexChild width={500} height={70} >
                        <InputText ref={el => (inputs.current[8] = el)} name={"가격"} label={"가격"} labelWidth={140} placeHolder={"가격"} value={product.price} />
                    </FlexChild>
                    <FlexChild width={500} height={70} >
                        <InputText ref={el => (inputs.current[9] = el)} name={"수량"} label={"수량"} labelWidth={140} placeHolder={"수량"} value={product.quantity} />
                    </FlexChild>
                    <FlexChild height={1200}>
                        <QuillEditor ref={el => (inputs.current[10] = el)} name={"상세"} value={product.content} path={"product/" + id} preview={true} />
                    </FlexChild>
                </VerticalFlex>
                : <p>loading</p>}
        </div>
    );
}

export default ProductManager;