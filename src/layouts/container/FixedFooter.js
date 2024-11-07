import Dummy from "components/Dummy";
import style from "./Fixed.module.css";

function FixedFooter(props) {
    return (
        <div className={style.footer} style={{
            bottom: props.bottom,
            height: props.height,
            maxWidth: props.maxWidth
        }}>
            {props.children}
        </div>
    );
}

export default FixedFooter;