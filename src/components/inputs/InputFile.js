import { CAccordion, CAccordionBody, CAccordionHeader, CAccordionItem, CFormInput } from "@coreui/react";
import { fileRequester } from "App";
import { t } from "i18next";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { compressImage, createImageFileFromDataUrl, createImageFileFromDom, getFilePath } from "shared/utils/Utils";
import InputLabel from "./InputLabel";
import style from "./InputFile.module.css";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import FlexChild from "layouts/flex/FlexChild";
import Loader from "./image/Loader";
import P from "components/P";
import _ from "lodash";

const InputFile = forwardRef((props, ref) => {
    const [fileToShow, setFileToShow] = useState();
    const [fileExisting, setFileExisting] = useState();
    const [fileToUpload, setFileToUpload] = useState();
    const input = useRef();
    const [name, setName] = useState(props.name || "");
    const [isEmpty, setEmpty] = useState();
    const [value, setValue] = useState(null);
    const [isFileChanged, setFileChanged] = useState(false);

    const onFileChange = (e) => {
        const files = e.target.files || e.dataTransfer.files;
        if (files && files.length > 0) {
            for (let image of files) {
                let reader = new FileReader();
                reader.onload = function (event) {
                    let src = event.target.result;
                    setFileToShow(src);
                    setFileToUpload(src);
                };
                reader.readAsDataURL(image);
            }
        } else {
            if (fileExisting) {
                setFileToShow(fileExisting);
            } else {
                setFileToShow(null);
            }
        }
    }

    useEffect(() => {
        if (fileToShow) {
            setEmpty(false);
        } else {
            setEmpty(true);
        }

        let isEqual = _.isEqual(fileToShow, fileExisting);
        if (isEqual) {
            setFileChanged(false);
        } else {
            setFileChanged(true);
        }
        
    }, [fileToShow]);


    useEffect(() => {
        setFileToShow(value);
        setFileExisting(value);
    }, [value]);

    useEffect(() => {
        setFileToShow(props.value);
        setFileExisting(props.value);
    }, [props.value]);

    const uploadFile = async () => {
        let response = { code: -1, data: "", message: "" };
        if (isEmpty || !isFileChanged) {
            response.code = 0;
            if (!isFileChanged) {
                response.data = props.value;
            }
        } else {
            let file = await createImageFileFromDataUrl(fileToUpload);
            if (typeof (file) === "object") {
                let imageURL = getFilePath(props.path, file);
                const formData = new FormData();
                formData.append("file", file);
                formData.append("path", props.path);
                let uploadResult = await fileRequester.upload(formData);
                if (uploadResult === "Success") {
                    response.code = 0;
                    response.data = imageURL;
                } else {
                    response.message = uploadResult;
                }

            } else {
                response.message = file;
            }
        }
        let validationResult = response.code === 0 ? true : false;
        setValue(response.data);
        return await validationResult;
    }

    useImperativeHandle(ref, () => ({
        getName() {
            return name;
        },
        getValue() {
            return value;
        },
        empty() {
        },
        async isValid() {
            return await uploadFile();
        },
        focus() {
            input.current.scrollTo(0, input.current.offsetTop);
        }
    }));

    return (
        <div>
            {
                props.label && <InputLabel text={props.label} />
            }

            <CAccordion alwaysOpen>
                <CAccordionItem >
                    <CAccordionHeader>
                        <div className={style.inputFileHeader}>
                            <HorizontalFlex gap={10}>
                                {
                                    fileToShow &&
                                    <FlexChild width={50}>
                                        <img className={style.previewImage} alt='preview' src={fileToShow} />
                                    </FlexChild>
                                }
                                {
                                    fileExisting ?
                                        <FlexChild overflowX={"hidden"} >
                                            <P ellipsis>{fileExisting}</P>
                                        </FlexChild>
                                        :
                                        <FlexChild overflowX={"hidden"}>
                                            <CFormInput className={style.text} ref={input} type="file" onChange={onFileChange} onClick={(e) => e.stopPropagation()} />
                                        </FlexChild>
                                }
                                <FlexChild width={10}>
                                </FlexChild>
                            </HorizontalFlex>
                        </div>
                    </CAccordionHeader>
                    <CAccordionBody>
                        {
                            fileExisting &&
                            <CFormInput ref={input} type="file" onChange={onFileChange} label={t("changeFile")} onClick={(e) => e.stopPropagation()} />
                        }
                        {/* <Loader /> */}
                    </CAccordionBody>
                </CAccordionItem>
            </CAccordion>
        </div>
    );
});

export default InputFile;