import style from "./EasyCrop.module.css";

import { useState, useEffect, useRef } from "react";

function CropOutput({ image, croppedArea, cropWidth, cropHeight, callback, isWide }) {
    const imageRef = useRef();
    const scale = croppedArea ? 100 / croppedArea.width : 1;
    const [imageStyle, setStyle] = useState();
    const transform = croppedArea ?
        {
            x: `${-croppedArea.x * scale}%`,
            y: `${-croppedArea.y * scale}%`,
            scale,
            width: "calc(100% + 0.5px)",
            height: "initial"
        }
        : { x: 0, y: 0 };

    useEffect(() => {
        if (croppedArea && croppedArea.x === 0 && croppedArea.y === 0 && croppedArea.width === 100 && croppedArea.height === 100) {
            setStyle({
                transform: `translate3d(-50%, -50%, 0) scale3d(${transform.scale},${transform.scale},1)`,
                width: (isWide ? transform.width : "auto"),
                height: (isWide ? transform.height : "100%"),
                top: "50%",
                left: "50%"
            });
        } else {
            setStyle(
                {
                    transform: `translate3d(${transform.x}, ${transform.y}, 0) scale3d(${transform.scale},${transform.scale},1)`,
                    width: transform.width,
                    height: transform.height
                }
            );
        }

        callback(imageRef.current);
    }, [croppedArea]);

    return (
        <div ref={imageRef} className={style.output} style={{ width: cropWidth, height: cropHeight }}>
            {
                croppedArea ?
                    <img src={image} alt="" style={imageStyle} />
                    : null
            }
        </div>
    );
}

export default CropOutput;