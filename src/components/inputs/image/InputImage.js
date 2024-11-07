import style from "./InputImage.module.scss";
import { useEffect, useState, forwardRef, useImperativeHandle, useRef } from "react";
import FileUpload from "./FileUpload";
import { clone, getFilePath, createImageFileFromDom } from "shared/utils/Utils";
import { fileRequester } from "App";
import _ from "lodash";

const InputImage = forwardRef((props, ref) => {
    const input = useRef();
    const [name, setName] = useState(props.name || "");
    const [imageRef, setImageRef] = useState();
    const [isChanged, setChanged] = useState(false);
    const [isFileChanged, setFileChanged] = useState(false);
    const [isCropAreaChanged, setCropAreaChanged] = useState(false);
    const [isEmpty, setEmpty] = useState();
    const [value, setValue] = useState(null);
    const [colors, setColors] = useState([]);

    const uploadFile = async () => {
        let response = { code: -1, data: "", message: "" };
        if (isEmpty || !isChanged) {
            response.code = 0;
            if (!isChanged) {
                response.data = props.value;
            }
        } else {
            let file = await createImageFileFromDom(imageRef);
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

    const imageCallback = (imageDiv) => {
        setImageRef(imageDiv);
    }

    const onFileChange = (file) => {
        if (file) {
            setEmpty(false);
        } else {
            setEmpty(true);
        }

        let isEqual = _.isEqual(file, props.value);
        if (isEqual) {
            setFileChanged(false);
        } else {
            setFileChanged(true);
        }
    }

    const onCropAreaChange = (isCropAreaChanged) => {
        setCropAreaChanged(isCropAreaChanged);
    }

    const onChangeColors = (colors) => {
        setColors(colors);
        if (props.onChangeColors) {
            props.onChangeColors(colors);
        }
    }

    useImperativeHandle(ref, () => ({
        getName() {
            return name;
        },
        getValue() {
            console.log(value);
            return value;
        },
        getColors() {
            return colors;
        },
        async upload(callback) {
            let result = await uploadFile();
            callback(result);
        },
        isChanged() {
            return isChanged;
        },
        async isValid() {
            return await uploadFile();
        },
        focus() {
            input.current.scrollTo(0, input.current.offsetTop);
        }
    }));

    useEffect(() => {
        setValue(props.value);
    }, [props.value]);

    useEffect(() => {
        setChanged(isFileChanged || isCropAreaChanged);
    }, [isFileChanged, isCropAreaChanged]);

    return (
        <div ref={input} className={style.wrapper}>
            <FileUpload multiple={true}
                name="example-upload"
                maxSize={300000}
                // onUpload={uploadFileToServer}
                label={props.label}
                labelWidth={props.labelWidth}
                cropWidth={props.cropWidth}
                cropHeight={props.cropHeight}
                callback={imageCallback}
                value={value}
                onChange={onFileChange}
                onChangeColors={onChangeColors}
                onCropAreaChange={onCropAreaChange}
                maxSizeMb={props.maxSizeMb} />
        </div>
    );

});

export default InputImage;

