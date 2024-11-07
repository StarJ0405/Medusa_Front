import style from "./Center.module.css";

function Center(props) {
     return (
        <div className={style.wrap} style={{
            alignItems: props.alignItems ? props.alignItems : "center",
            width: props.width ? props.width : null,
            padding: props.padding ? props.padding : null,
            maxWidth : props.maxWidth ? props.maxWidth : null

        }}>
            <div className={style.inner} style={{
                width: props.width ? props.width : null,
                height: props.height ? props.height : null,
                textAlign: props.textAlign ? props.textAlign : "center",
                // alignItems: props.alignItems ? props.alignItems : "flex-start",
            }}>
                {props.children}
            </div>
        </div>
    );
}

export default Center;