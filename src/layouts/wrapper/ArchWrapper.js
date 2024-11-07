import clsx from "classnames";
import style from "./ArchWrapper.module.css"
import Center from "./Center";

function ArchWrapper(props) {
    return (
        <div className={clsx(style.arch)} style={{
            backgroundColor: props.backgroundColor,
            maxWidth: props.maxWidth,
            width: props.width

        }}>
            {props.children}
        </div>
    );
}

export default ArchWrapper;