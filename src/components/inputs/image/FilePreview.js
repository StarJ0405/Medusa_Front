import style from "./InputImage.module.scss";
import { useState, useEffect, useRef } from "react";
import clsx from "classnames";
import useAltEffect from "shared/hooks/useAltEffect";
import Loader from "./Loader";
import VerticalFlex from "layouts/flex/VerticalFlex";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import EasyCrop from "./EasyCrop";


function FilePreview(props) {
    const [name, setName] = useState();
    const [isLoading, setLoading] = useState(true);
    const [src, setSrc] = useState();
    const [type, setType] = useState();

    useAltEffect(() => {
        if (typeof (props.data) === "string") {
            loadData(props.data);
        } else {
            loadFile(props.data);
        }

    }, [props.data]);

    const loadFile = (file) => {
        const reader = new FileReader();
        let dataType = file.type;
        let fileName = file.name;
        if (file.type.match('text')) {
            dataType = "text";
        } else if (file.type.match('image')) {
            dataType = "image";
        }

        if (dataType === 'text') {
            reader.readAsText(file);
        } else if (dataType === 'image') {
            reader.readAsDataURL(file);
        }

        reader.onload = (e) => {
            setSrc(e.target.result);
            setType(dataType);
            setLoading(false);
            setName(fileName);
        }
    }

    const loadData = (data) => {
        let dataType = "image";
        setSrc(data);
        setType(dataType);
        setLoading(false);
        setName(data);
    }

    return (
        <div className={clsx(style.previewItem, { [style.disabled]: isLoading ? true : false })}>
            {isLoading ? <Loader /> :
                type === "image" ?
                    <VerticalFlex>
                        <FlexChild height={100}>
                            <HorizontalFlex>
                                <FlexChild width={100}>
                                    <img className={style.previewImage} alt='preview' src={src} />
                                </FlexChild>
                                <FlexChild>
                                    <p>{name}</p>
                                </FlexChild>
                                <FlexChild>
                                    <button className={style.button} onClick={props.onRemove}>
                                        remove
                                    </button>
                                </FlexChild>
                            </HorizontalFlex>
                        </FlexChild>
                        <FlexChild >
                            <EasyCrop image={src} cropWidth={props.cropWidth} cropHeight={props.cropHeight} callback={props.callback} onCropAreaChange={props.onCropAreaChange} isWide={props.isWide} />
                        </FlexChild>
                    </VerticalFlex>
                    : type === "text" ?
                        <pre className={style.preview}>{src}</pre>
                        : <pre className={style.preview}>no preview</pre>
            }
        </div >
    );
}

export default FilePreview;