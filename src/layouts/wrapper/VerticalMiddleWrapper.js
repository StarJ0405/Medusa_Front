import style from "./VerticalMiddleWrapper.module.css";

function VerticalMiddleWrapper(props) {
    return (
        <div className={style.wrap}>
            {props.children}
        </div>
    )
}

export default VerticalMiddleWrapper;