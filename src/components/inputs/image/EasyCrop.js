import style from "./EasyCrop.module.css";
import { useState, useCallback, useEffect } from "react";
import Cropper from "react-easy-crop";
import CropOutput from "./CropOutput";
import VerticalFlex from "layouts/flex/VerticalFlex";
import FlexChild from "layouts/flex/FlexChild";
import VerticalMiddleWrapper from "layouts/wrapper/VerticalMiddleWrapper";
import _ from "lodash";

function EasyCrop(props) {
    const initialState = { x: 0, y: 0 };
    const [crop, setCrop] = useState(initialState);
    const [zoom, setZoom] = useState(1);
    const [croppedArea, setCroppedArea] = useState(null);
    const [aspect, setAspect] = useState(props.cropWidth / props.cropHeight);


    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        
        // if(isFirstExecution){
        //     setInitialState(croppedArea);
        //     setFirstExecution(false);
        // } else {
        //     let isChanged = _.isEqual(initialState, croppedArea);
        
        
        // }
    }, []);

    useEffect(() => {
        let isChanged = !_.isEqual(initialState, crop);
        props.onCropAreaChange(isChanged);
    }, [crop]);

    return (
        <VerticalFlex>
            <FlexChild>
                <div className={style.cropContainer}>
                    <Cropper
                        minZoom={1}
                        zoomSpeed={0.1}
                        maxZoom={100}
                        image={props.image}
                        crop={crop}
                        zoom={zoom}
                        aspect={aspect}
                        onCropChange={setCrop}
                        onCropComplete={onCropComplete}
                        onZoomChange={setZoom}
                        onCropAreaChange={(croppedArea) => {
                            setCroppedArea(croppedArea);
                        }}
                    />
                    <div className={style.viewer}>
                        <CropOutput image={props.image} croppedArea={croppedArea} cropWidth={props.cropWidth} cropHeight={props.cropHeight} callback={props.callback} isWide={props.isWide} />
                    </div>
                </div>
            </FlexChild>



        </VerticalFlex>
    );
}

export default EasyCrop;