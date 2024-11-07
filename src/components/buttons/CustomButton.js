import { CButton } from "@coreui/react";
import style from "./CustomButton.module.css";

function CustomButton(props) {
    

    return (
        <>
            <CButton variant={props.variant} onClick={props.onClick} style={props.style} className={props.className}>{props.icon && props.icon}&nbsp;{props.text}</CButton>
        </>
    );
}

export default CustomButton;