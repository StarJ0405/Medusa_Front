import Dummy from "components/Dummy";
import style from "./Fixed.module.css";

function FixedHeader(props) {
    return (
        <>
            <div className={style.header} style={{
                height: props.height
            }}>
                {props.children}
            </div>
            {/* <Dummy height={props.height} /> */}
        </>
    );
}

export default FixedHeader;