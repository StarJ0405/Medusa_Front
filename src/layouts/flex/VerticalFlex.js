import style from "./Flex.module.css";
import clsx from "classnames";
import { cloneElement, Children } from "react";
import React from "react";

function VerticalFlex(props) {
    const childrenWithProps = Children.map(props.children, child => {
        if (React.isValidElement(child)) {
            // if(child.type.name){
            return React.cloneElement(child, { parentClass: "vertical", flexStart: props.flexStart ? props.flexStart : null });
            // }
        }
        // return child;
    });

    return (
        <div className={clsx(style.flex, style.vertical)}
            style={
                {
                    width: (props.width ? props.width : null),
                    height: (props.height ? props.height : null),
                    overflow: (props.overflow ? props.overflow : null),
                    overflowX: (props.overflowX ? props.overflowX : props.overflow),
                    overflowY: (props.overflowY ? props.overflowY : props.overflow),
                    gap: (props.gap ? props.gap : null),
                    alignItems: (props.alignItems ? props.alignItems : props.flexStart ? "flex-start" : "center"),
                    backgroundColor: (props.backgroundColor ? props.backgroundColor : "transparent"),
                    padding: (props.padding ? props.padding : "0"),
                    justifyContent: (props.justifyContent ? props.justifyContent : null),
                    borderRadius: (props.borderRadius ? props.borderRadius : null),
                    margin: (props.margin ? props.margin : null),
                    flexDirection: (props.direction ? props.direction : "column"),
                    border: (props.border ? props.border : null)
                }
            }>
            {childrenWithProps}
        </div>
    );
}

export default VerticalFlex;