import style from "./Flex.module.css";
import clsx from "classnames";
import { cloneElement, Children } from "react";
import React from "react";

function HorizontalFlex(props) {
  const childrenWithProps = Children.map(props.children, (child) => {
    if (React.isValidElement(child)) {
      // if (child.type.name) {
        return React.cloneElement(child, { parentClass: "horizontal", flexStart: props.flexStart ? props.flexStart : null });
      // }
    }
    // return child;
  });

  return (
    <div
      className={
        props.flexStart
          ? clsx(style.horizontal, style.flexStart)
          : clsx(style.flex, style.horizontal)
      }
      style={
        {
          width: (props.width ? props.width : null),
          height: (props.height ? props.height : null),
          overflow: (props.overflow ? props.overflow : null),
          overflowX: (props.overflowX ? props.overflowX : props.overflow),
          overflowY: (props.overflowY ? props.overflowY : props.overflow),
          gap: (props.gap ? props.gap : null),
          alignItems: (props.alignItems ? props.alignItems : props.flexStart ? "flex-start" : "center"),
          padding: (props.padding ? props.padding : null),
          backgroundColor: (props.backgroundColor ? props.backgroundColor : null),
          border: (props.border ? props.border : null),
          flexWrap: (props.flexWrap ? props.flexWrap : null),
          margin: (props.margin ? props.margin : null),
          borderBottom: (props.borderBottom ? props.borderBottom : null),
          justifyContent: (props.justifyContent ? props.justifyContent : null),
        }
      }
    >
      {childrenWithProps}
    </div>
  );
}

export default HorizontalFlex;
