import { CAccordion, CAccordionBody, CAccordionHeader, CAccordionItem, CFormInput } from "@coreui/react";
import Flex from "layouts/flex/Flex";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import useAltEffect from "shared/hooks/useAltEffect";
import { decode, encode, isBase64 } from "shared/utils/Utils";
import style from "./UploadBiliBiliVideo.module.css";
import QuillViewer from "../richEditor/QuillViewer";
import VerticalFlex from "layouts/flex/VerticalFlex";


const UploadBiliBiliVideo = forwardRef((props, ref) => {
    const input = useRef();
    const { placeHolder, label, labelWidth, targetRef, readOnly } = props;
    const { t } = useTranslation();
    const [name, setName] = useState(props.name || "");
    const [value, setValue] = useState();
    const [isValid, setValid] = useState(true);
    const [isEmpty, setEmpty] = useState(true);

    const onChange = (e) => {
        let inputValue = e.target.value;
        if (isBase64(inputValue)) {
            let decoded = decode(inputValue);
            setValue(decoded);
        } else {
            setValue(inputValue || "");
        }
    }

    useAltEffect(() => {
        if (isBase64(props.value)) {
            let decoded = decode(props.value);
            setValue(decoded);
        } else {
            setValue(props.value || "");
        }
    }, [props.value]);

    useEffect(() => {

        if (value && value.length > 0) {
            setEmpty(false);
        } else {
            setEmpty(true);
        }

        if (props.onChange) {
            props.onChange(value);
        }
    }, [value]);

    useImperativeHandle(ref, () => ({
        getName() {
            return name;
        },
        getValue() {
            if (value && value.length > 0) {
                const encodedString = encode(value);
                return encodedString;
            } else {
                return null;
            }
        },
        setValue(value) {
            setValue(value);
        },
        isValid() {
            return isValid;
        },
        empty() {
            setValue("");
        },
        focus() {
            input.current.scrollTo(0, input.current.offsetTop);
            if (props.hidden) {
                targetRef.current.focus();
            } else {
                input.current.focus();
            }
        }
    }));
    return (
        <VerticalFlex flexStart>
            <FlexChild width={"30%"}>
                <QuillViewer value={value} />
            </FlexChild>
            <FlexChild>
                <div className={style.inputHeader}>
                    <HorizontalFlex gap={10}>
                        <FlexChild>
                            <div ref={input}>
                                <CFormInput
                                    type="text"
                                    feedback={isValid ? false : "잘 입력좀해주세요"}
                                    placeholder={t("bilibili")}
                                    value={value}
                                    valid={isEmpty ? false : isValid}
                                    invalid={isEmpty ? false : !isValid}
                                    onChange={onChange}
                                    label={label}
                                    ref={input}
                                    readOnly={readOnly}
                                />
                            </div>
                        </FlexChild>

                        <FlexChild width={10}>
                        </FlexChild>
                    </HorizontalFlex>
                </div>
            </FlexChild>
        </VerticalFlex>

    );
});

export default UploadBiliBiliVideo;