import { forwardRef, useContext, useEffect, useImperativeHandle, useRef, useState } from "react";
import style from "./ProductOptionRow.module.css"
import { BrowserDetectContext } from "providers/BrowserEventProvider";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { requester } from "App";
import NiceModal from "@ebay/nice-modal-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import FlexChild from "layouts/flex/FlexChild";
import CheckCircle from "components/inputs/checkBox/CheckCircle";
import VerticalFlex from "layouts/flex/VerticalFlex";
import Center from "layouts/wrapper/Center";
import P from "components/P";

import CustomButton from "components/buttons/CustomButton";
import { getCurrentLanguageCode } from "shared/utils/Utils";
import InputNumber from "components/inputs/InputNumber";
import InputText from "components/inputs/InputText";


const ProductOptionRow = forwardRef((props, ref) => {
    const { isMobile } = useContext(BrowserDetectContext);
    const { data } = props;
    const { t } = useTranslation();
    const [isChecked, setChecked] = useState(false);
    const [checkedData, setCheckedData] = useState();
    const [productOption, setProductOption] = useState({
        ...data,
        increaseOrDecreaseInAmount: '',
        instock: '',
        safetyInstock: '',
        outOfStockYn: ''
    });
    const input = useRef();
    const optionsInput = useRef([]);

    useEffect(() => {
        console.log(soldout);
    }, [])



    const callback = (index, state) => {
        if (props.callback) {
            props.callback(index, state);
            console.log(index, state, productOption);
        }
    }

    useEffect(() => {
        if (props.data) {
            setCheckedData(props.data)
        }


        console.log("props.data:", props.data);
        console.log("props.data.outOfStockYn:", props.data ? props.data.outOfStockYn : "props.data is undefined");
    }, [props.data]);


    useEffect(() => {
        // console.log(checkedData);

        if (checkedData) {

        }

    }, [checkedData]);



    useEffect(() => {
        if (props.checkedIndex && props.checkedIndex.includes(props.index)) {
            input.current.setChecked(true);
        } else {
            input.current.setChecked(false);
        }
    }, [props.checkedIndex]);

    useImperativeHandle(ref, () => ({
        isChecked() {
            return isChecked;
        },
        setChecked(value) {
            input.current.setChecked(value);
        },
        isCheckedVaild() {
            return input.current.isChecked();
        },
        getValue: () => ({
            ...data,
            optionType: props.optionType,
            optionName: props.optionName,
            increaseOrDecreaseInAmount: optionsInput.current[0].getValue(),
            instock: optionsInput.current[1].getValue(),
            safetyInstock: optionsInput.current[2].getValue(),
            outOfStockYn: soldout,

        })
    }));

    const [soldout, setSoldout] = useState(props.data?.outOfStockYn ?? false);
    const onChange = (e) => {
        if (!props.readOnly) {
            setSoldout(e.target.checked);
        }
    };

    return (
        <div className={style.productWrap}>
            <HorizontalFlex gap={30}>
                <FlexChild width={30} >
                    <div className={style.checkboxArea}>
                        <CheckCircle ref={input} callback={callback} index={props.index} label={props.label} checkedData={checkedData} />
                    </div>
                </FlexChild>
                <FlexChild width={100} >
                    <div className={style.imgWrap}>
                        <Center width={"100%"} textAlign={"left"}>
                            <P>{data && data.optionName}</P>
                        </Center>
                    </div>
                </FlexChild>
                <FlexChild width={200}>
                    <div className={style.contentWrap}>
                        {/* 옵션항목 */}
                        <P>{data && data.optionItem}</P>
                    </div>
                </FlexChild>
                <FlexChild width={120}>
                    {/* 증감액 */}
                    <InputText ref={el => (optionsInput.current[0] = el)} value={data && data.increaseOrDecreaseInAmount} />
                </FlexChild>
                <FlexChild width={120} justifyContent={"center"}>
                    {/* 재고수량 */}
                    <InputText ref={el => (optionsInput.current[1] = el)} value={data && data.instock} />
                </FlexChild>
                <FlexChild width={120}>
                    <InputText ref={el => (optionsInput.current[2] = el)} value={data && data.safetyInstock} />
                    {/* <CustomButton text={"테스트"} onClick={onTestBtnClick} /> */}
                </FlexChild>
                <FlexChild >
                    <label className={style.checkbox} style={{ backgroundColor: props.disabled && "#bbbbbb" }}>
                        <input disabled={props.disabled ? props.disabled : null} type={"checkbox"} onChange={onChange} checked={soldout} />
                        <span className={style.checkboxIcon} style={{ width: props.width, height: props.height, cursor: props.disabled ? "default" : "pointer" }} />
                    </label>
                </FlexChild>
            </HorizontalFlex>
        </div>
    );
});

export default ProductOptionRow;

