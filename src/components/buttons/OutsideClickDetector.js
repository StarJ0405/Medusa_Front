import { useEffect, useRef } from "react";

function OutsideClickDetector(props) {
    const wrapperRef = useRef();

    const handleClickOutside = (event) => {
        if (wrapperRef && !wrapperRef.current.contains(event.target)) {
            props.onOutsideClick();
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    });

    return <div ref={wrapperRef}>{props.children}</div>;
}

export default OutsideClickDetector;