import style from "./ShapeWrapper.module.scss";
import clsx from "classnames";
import Center from "./Center";

function CircleWrapper(props) {
    return (
        <div className={clsx(style.equilateral, style.circle)} style={{
            backgroundColor: props.backgroundColor,
            maxWidth: props.maxWidth,
            border: `1px solid ${props.borderColor}`
        }}>
            <div className={style.inner}>
                <Center>
                    {props.children}
                </Center>

            </div>

        </div>
    );
}

export default CircleWrapper;