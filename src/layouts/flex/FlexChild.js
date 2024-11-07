import style from "./Flex.module.css";
import clsx from "classnames";

function FlexChild(props) {
    let isFixed = false;
    if (props.parentClass) {
        if (props.parentClass === "vertical") {
            isFixed = props.height ? true : false;
        } else if (props.parentClass === "horizontal") {
            isFixed = props.width ? true : false;
        }
    }

    return (
        <div className={clsx(style.flexChild, { [style.fixed]: isFixed })}
            style={
                {
                    width: (props.width ? props.width : null),
                    minWidth: (props.minWidth ? props.minWidth : null),
                    maxWidth: (props.maxWidth ? props.maxWidth : null),
                    height: (props.height ? props.height : null),
                    overflowX: (props.overflowX ? props.overflowX : null),
                    overflowY: (props.overflowY ? props.overflowY : null),
                    alignItems: (props.alignItems ? props.alignItems : props.flexStart ? "flex-start" : "center"),
                    justifyContent: (props.justifyContent ? props.justifyContent : null),
                    backgroundColor: (props.backgroundColor ? props.backgroundColor : null),
                    backgroundImage: (props.backgroundImage ? props.backgroundImage : null),
                    padding: (props.padding ? props.padding : null),
                    flexWrap: (props.flexWrap ? props.flexWrap : null),
                    borderRadius: (props.borderRadius ? props.borderRadius : null),
                    borderLeft: (props.borderLeft ? props.borderLeft : null),
                    borderRight: (props.borderRight ? props.borderRight : null),
                    borderBottom: (props.borderBottom ? props.borderBottom : null),
                    borderTop: (props.borderTop ? props.borderTop : null),
                    border: (props.border ? props.border : null),
                    // borderTopLeftRadius: (props.borderTopLeftRadius ? props.borderTopLeftRadius : null),
                    // borderTopRightRadius: (props.borderTopRightRadius ? props.borderTopRightRadius : null), 
                    // borderBottomLeftRadius: (props.borderBottomLeftRadius ? props.borderBottomLeftRadius : null),
                    // borderBottomRightRadius: (props.borderBottomRightRadius ? props.borderBottomRightRadius : null),
                    marginRight: (props.marginRight ? props.marginRight : null),
                    marginBottom: (props.marginBottom ? props.marginBottom : null),
                    marginTop: (props.marginTop ? props.marginTop : null),
                    flex: (props.flex ? props.flex : null)
                }
            } onClick={props.onClick ? props.onClick : null} >
            {props.children}
        </div>
    );
}

export default FlexChild;