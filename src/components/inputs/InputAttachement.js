import style from "./InputAttachement.module.css";
import { useState, useEffect } from "react";
import { fileRequester } from "App";
import imageCompression from 'browser-image-compression';
import { FileUploader } from "react-drag-drop-files";
import PropTypes from 'prop-types';
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import FlexChild from "layouts/flex/FlexChild";
import VerticalFlex from "layouts/flex/VerticalFlex";

InputAttachement.propTypes = {
    types: PropTypes.arrayOf(PropTypes.string),
    path: PropTypes.string,
    multiple: PropTypes.bool,
    disabled: PropTypes.bool
};

function InputAttachement({ types, path, disabled }) {
    const [file, setFile] = useState();

    const compressImage = async (image) => {
        try {
            const options = {
                maxSizeMb: 0.1,
                maxWidthOrHeight: 1920,
            }
            return await imageCompression(image, options);
        } catch (e) {
            
        }
    }

    const handleChange = (file) => {
        let fileName = file.name;
        compressImage(file).then((result) => {
            let compressed = new File([result], fileName, { type: result.type });
            setFile(compressed);
        });
    };

    const onTypeError = (err) => {
        
    }

    const onSizeError = (err) => {
        
    }

    const onDrop = (file) => {
        
    }

    const onSelect = (file) => {
        
    }

    const onDraggingStateChange = (dragging) => {
        
    }

    const onUploadClick = () => {
        const formData = new FormData();

        formData.append("file", file);
        formData.append("path", path);

        fileRequester.upload(formData).then((result) => {

        });
    }

    return (
        <VerticalFlex>
            <FlexChild>
                <HorizontalFlex>
                    <FlexChild>
                        <FileUploader
                            label={"파일올려"}
                            hoverTitle={"hover"}
                            handleChange={handleChange}
                            name="file"
                            types={types}
                            onTypeError={onTypeError}
                            maxSize={1}
                            minSize={0}
                            onSizeError={onSizeError}
                            onDrop={onDrop}
                            onSelect={onSelect}
                            onDraggingStateChange={onDraggingStateChange}
                            disabled={disabled}
                        />
                    </FlexChild>
                    <FlexChild width={300}>
                        <div>미리보기</div>
                    </FlexChild>
                </HorizontalFlex>
            </FlexChild>
            <FlexChild height={100}>
                <button onClick={onUploadClick}>업로드</button>
            </FlexChild>
        </VerticalFlex>
    )
}

export default InputAttachement;