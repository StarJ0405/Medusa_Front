import style from "./UploadImage.module.css";
import { CAccordion, CAccordionBody, CAccordionHeader, CAccordionItem, CFormInput } from "@coreui/react";
import { fileRequester } from "App";
import { t } from "i18next";
import { forwardRef, useContext, useEffect, useImperativeHandle, useRef, useState } from "react";
import { compressImage, createImageFileFromDataUrl, createImageFileFromDom, getFilePath } from "shared/utils/Utils";

import HorizontalFlex from "layouts/flex/HorizontalFlex";
import FlexChild from "layouts/flex/FlexChild";
import P from "components/P";
import _ from "lodash";
import InputLabel from "../InputLabel";
import VerticalFlex from "layouts/flex/VerticalFlex";
import Center from "layouts/wrapper/Center";
import { BrowserDetectContext } from "providers/BrowserEventProvider";



const UploadImage = forwardRef((props, ref) => {
    const { isMobile } = useContext(BrowserDetectContext);
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
        console.log(fileToShow);

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
            <div className={style.inputFileHeader}>
                <VerticalFlex gap={10} flexStart>
                    {
                        fileToShow
                            ?
                            <FlexChild>
                                    <img className={style.previewImage} alt='preview' src={fileToShow} />
                            </FlexChild>
                            :
                            <FlexChild>
                                <div style={{ width: "100px", height: "100px", border: "1px solid black", display: "flex", backgroundColor: "#e7e7e7" }}>

                                    <FlexChild justifyContent={"center"}>
                                        <Center>
                                            <P color={"#aaa"}>이미지를 넣어주세요</P>
                                        </Center>
                                    </FlexChild>

                                </div>
                            </FlexChild>

                    }
                    {
                        fileExisting ?
                            <FlexChild overflowX={"hidden"} >
                                {/* <P ellipsis>{fileExisting}</P> */}
                            </FlexChild>
                            :
                            <FlexChild overflowX={"hidden"} width={"70%"}>
                                <CFormInput className={style.text} ref={input} type="file" onChange={onFileChange} onClick={(e) => e.stopPropagation()} />
                            </FlexChild>
                    }
                    <FlexChild width={10}>
                    </FlexChild>
                </VerticalFlex>
            </div>
            {
                fileExisting &&
                <CFormInput ref={input} type="file" onChange={onFileChange} onClick={(e) => e.stopPropagation()} />
            }
        </div>
    );
});

export default UploadImage;