import style from "./Container.module.css";

function Container(props) {
    return (
        <div className={style.container}
            style={
                {
                    width: (props.width ? props.width : null),
                    maxWidth: (props.maxWidth ? props.maxWidth : null),
                    height: (props.height ? props.height : null),
                    backgroundColor: (props.backgroundColor ? props.backgroundColor : null),
                    border: (props.border ? props.border : null),
                    padding: (props.padding ? props.padding : null),
                    boxShadow: (props.boxShadow ? props.boxShadow : null),
                    borderBottom: (props.borderBottom ? props.borderBottom : null)
                }
            }>
            {props.children}
        </div>
    );
}

export default Container;