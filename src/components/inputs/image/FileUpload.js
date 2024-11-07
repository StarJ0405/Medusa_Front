import style from "./InputImage.module.scss";
import { useState, useEffect, useRef } from "react";
import { clone } from "shared/utils/Utils";
import clsx from "classnames";
import FilePreview from "./FilePreview";
import VerticalFlex from "layouts/flex/VerticalFlex";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { compressImage } from "shared/utils/Utils";
import { ColorExtractor } from "react-color-extractor";

function FileUpload(props) {
    const [file, setFile] = useState();
    const [fileName, setFileName] = useState();
    const [hoverState, setHoverState] = useState(false);
    const inputRef = useRef();
    const [src, setSrc] = useState();
    const [colors, setColors] = useState([]);
    const [isWide, setWide] = useState();

    useEffect(() => {
        setFile(props.value);
    }, [props.value]);

    const handleDragOver = (e) => {
        if ('preventDefault' in e) {
            e.stopPropagation();
            e.preventDefault();
        }
        if (e.type === 'dragover') {
            setHoverState(true);

        } else {
            setHoverState(false);
        }
    }
    const handleFileSelect = (e) => {
        handleDragOver(e);
        const files = e.target.files || e.dataTransfer.files;

        for (var image of files) {
            var reader = new FileReader();

            reader.onload = function (event) {
                setSrc(event.target.result);

                var img = new Image();
                img.src = event.target.result;

                img.onload = function () {
                    var w = this.width;
                    var h = this.height;
                    setWide(w > h);
                }
            };

            reader.readAsDataURL(image);
        }

        Object.keys(files).map((file) => {
            let fileName = files[file].name;
            compressImage(files[file], fileName, props.maxSizeMb).then((result) => {
                e.target.value = null;
                setFile(result);
            });
        });


    }

    const removeFile = () => {
        setFile(null);
    }

    const selectFile = (e) => {
        e.preventDefault();
        inputRef.current.click(e);
    }

    const getColors = (colors) => {
        setColors(colors);
    }

    useEffect(() => {
        if (file) {
            if (file.name) {
                setFileName(file.name);
            } else {
                setFileName(file);
            }
        } else {
            setFileName("No file chosen");
        }
        props.onChange(file);
    }, [file]);

    useEffect(() => {
        props.onChangeColors(colors);
    }, [colors]);

    return (
        <>
            {
                src ?
                    <ColorExtractor src={src} getColors={getColors} />
                    : null
            }

            <HorizontalFlex>
                {props.label && props.labelWidth &&
                    <FlexChild width={props.labelWidth}>
                        <input type='hidden' name={`${props.name}:maxSize`} value={props.maxSize} />
                        <span>{props.label}</span>
                    </FlexChild>}

                <FlexChild>
                    <VerticalFlex>
                        <FlexChild height={file ? 60 : null}>
                            <label className={style.label}>
                                <div className={clsx(style.fileDrag, { [style.hover]: hoverState })}
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragOver}
                                    onDrop={handleFileSelect}>
                                    <div className={style.inputWrapper}>
                                        <input type="file" tabIndex="-1" className={style.input} name={props.name} onChange={handleFileSelect} ref={inputRef} />
                                        <div className={style.inputCover}>
                                            {/* <div className={style.iconArea}>
                                            <FontAwesomeIcon icon={fas["faIceCream"]} />
                                        </div> */}
                                            <button className={style.button} type='button' onClick={selectFile}>
                                                Choose Files
                                            </button>
                                            <span className={style.fileName}>{fileName}</span>
                                        </div>
                                    </div>
                                </div>
                            </label>
                        </FlexChild>
                        {
                            file ?
                                <FlexChild>
                                    <div className={style.previews}>
                                        <FilePreview data={file} onRemove={removeFile} cropWidth={props.cropWidth} cropHeight={props.cropHeight} callback={props.callback} onCropAreaChange={props.onCropAreaChange} isWide={isWide} />
                                    </div>
                                </FlexChild>
                                : null
                        }

                    </VerticalFlex>
                </FlexChild>
            </HorizontalFlex>
        </>
    );
}



export default FileUpload;