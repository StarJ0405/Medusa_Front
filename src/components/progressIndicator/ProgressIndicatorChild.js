import style from "./ProgressIndicatorView.module.css";

function ProgressIndicatorChild(props) {
    return (
        <div className={style.child}>
            {props.children}
        </div>
    );
}

export default ProgressIndicatorChild;