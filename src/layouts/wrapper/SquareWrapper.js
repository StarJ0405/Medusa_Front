import style from "./ShapeWrapper.module.scss";
import clsx from "classnames";

function SquareWrapper(props) {
    return (
        <div className={clsx(style.equilateral, style.square)}
            style={{
                width: props.width,
                padding: props.padding,
                backgroundColor: props.backgroundColor,
                maxWidth: props.maxWidth,
                margin: props.margin,
                border: (props.border ? props.border : null)
                
            }}>
            <div className={style.inner} style={{top : props.icon && "-5px"}}>
                {props.children}
            </div>
        </div>
    );
}

export default SquareWrapper;