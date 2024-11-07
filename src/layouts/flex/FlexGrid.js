import style from "./Flex.module.css";
import clsx from "classnames";
import { cloneElement, Children } from "react";
import React from "react";

function FlexGrid(props) {
    const childrenWithProps = Children.map(props.children, (child) => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, { parentClass: "grid", flexStart: props.flexStart ? props.flexStart : null });
        }
        return child;
    });
    return (
        <div className={style.grid}
            style={
                {
                    gap: (props.gap ? props.gap : null)
                }
            }>
            {childrenWithProps}
        </div>
    );
}

export default FlexGrid;