import style from "./ArrowBox.module.css";

function ArrowBox(props) {
    const { children, visible } = props;

    return <>
        {
            visible ?
                <div className={style.arrowBox}>{children}</div>
                : null
        }
    </>
}

export default ArrowBox;