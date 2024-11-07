import ReactQuill, { Quill } from "react-quill";
import "./quill.snow.css";
import "./quill.bubble.css";
import style from "./QuillEditor.module.css";
import { useState, useMemo, forwardRef, useImperativeHandle, useEffect, useRef } from "react";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import FlexChild from "layouts/flex/FlexChild";
import ImageResize from "quill-image-resize";
import { createImageFileFromDataUrl, compressImage, getFilePath, decode, encode } from "shared/utils/Utils";
import { fileRequester } from "App";
import useAltEffect from "shared/hooks/useAltEffect";
import QuillViewer from "./QuillViewer";
import VerticalFlex from "layouts/flex/VerticalFlex";
import NiceModal from "@ebay/nice-modal-react";
import { CButton } from "@coreui/react";
import { t } from "i18next";

const cheerio = require("cheerio");
Quill.register("modules/imageResize", ImageResize);

const QuillEditor = forwardRef((props, ref) => {
    const { value } = props;
    const input = useRef();
    const [name, setName] = useState(props.name || "");
    const [html, setHtml] = useState("");
    const [isValid, setValid] = useState(false);
    const [showPrewiew, setShowPreview] = useState(false);

    useAltEffect(() => {
        if (value && value.length > 0) {
            let loadedHtml = decode(value);
            setHtml(loadedHtml);
        } else {
            setHtml("");
        }
    }, [value]);

    const modules = useMemo(() => ({
        toolbar: [
            [{ 'font': [] }],
            [{ 'header': [1, 2, 3, 4, 5, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image', 'video'],
            [{ 'align': "justify" }, { 'align': "center" }, { 'align': "right" }, { 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
            ['clean'],
        ],

        imageResize: {
            parchment: Quill.import('parchment'),
            modules: ['Resize', 'DisplaySize'],
            handleStyles: {
                backgroundColor: 'white',
                border: '1px solid black',
                color: "black"
            },
            displayStyles: {
                backgroundColor: 'black',
                border: 'none',
                color: "white"
            }
        },
        history: {
            delay: 500,
            maxStack: 100,
            userOnly: true
        }
    }));

    const formats = [
        "header",
        "font",
        "size",
        "bold",
        "italic",
        "underline",
        "align",
        "strike",
        "script",
        "blockquote",
        "background",
        "list",
        "bullet",
        "indent",
        "link",
        "image",
        "video",
        "color",
        "code-block"
    ];

    const onChange = (content, delta, source, editor) => {
        setHtml(content);
    }

    const onPreviewClick = () => {
        NiceModal.show("editorPreviewModal", { html: html });
    }

    const uploadFile = async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("path", props.path);
        let uploadResult = await fileRequester.upload(formData);
        return uploadResult;
    }

    const validate = async () => {
        if (html) {
            let $ = cheerio.load(html, { xmlMode: true });

            await Promise.all($("img").map(async (index, image) => {
                let src = image.attribs.src;
                let isDataUrl = false;

                if (src && src.length > 0) {
                    isDataUrl = src.substr(0, 4) === "data" ? true : false;
                }
                if (isDataUrl) {
                    let imageFile = createImageFileFromDataUrl(src);
                    // let compressedFile = await compressImage(imageFile, imageFile.name);
                    let compressedFile = imageFile;
                    let uploadResult = await uploadFile(compressedFile);
                    let resultFilePath = "";
                    if (uploadResult === "Success") {
                        resultFilePath = getFilePath(props.path, imageFile);
                        image.attribs.src = resultFilePath;
                    }
                }
                return image;
            }));
            setHtml($.html());
            return await true;
        } else {
            return true;
        }
    }

    useImperativeHandle(ref, () => ({
        getName() {
            return name;
        },
        getValue() {
            if (html && html.length > 0) {
                const encodedString = encode(html);
                console.log(encodedString);
                return encodedString;
            } else {
                return null;
            }
        },
        setValue(value) {
            setHtml(value);
        },
        async isValid() {
            return await validate();
        },
        focus() {
            input.current.scrollTo(0, input.current.offsetTop);
        }
    }));

    const Button = ({ text, onClick }) => {
        const btnStyle = {
            backgroundColor: "white",
            color: "#727272",
            borderColor: "#727272",
            borderRadius: "5px",
            padding : "3px 10px",
            fontSize: "10pt"
        }
        return (
            <CButton style={btnStyle} color={"primary"} onClick={onClick} active={true} >
                {text}
            </CButton>
        );
    }

    return (
        <VerticalFlex height={"100%"} flexStart>
            {
                props.preview &&
                <FlexChild height={50}>
                    <Button text={t("preview")} onClick={onPreviewClick} />
                </FlexChild>
            }

            <FlexChild>
                <FlexChild height={"100%"}>
                    <div className={style.editor} ref={input}>
                        <ReactQuill theme={"snow"} modules={modules} formats={formats} value={html} onChange={onChange} />
                    </div>
                </FlexChild>
            </FlexChild>
        </VerticalFlex>


    )
});

export default QuillEditor;

