import clsx from "clsx";
import style from "./P.module.css";

function P(props) {
    const { weight, font, size, i, min, max, marginBottom, color, fontStyle, textDecoration, textAlign, height } = props;
    let fontSize = size;
    if (min) {
        fontSize = `max(${fontSize}, ${min})`;
    }
    if (max) {
        fontSize = `min(${fontSize}, ${max})`;
    }

    return (
        <p className={clsx(style.paragraph, { [style.ellipsis]: props.ellipsis === true }, props.hover && style.hover)} style={{
            fontWeight: weight,
            fontFamily: font,
            fontSize: fontSize,
            fontStyle: i ? "italic" : fontStyle ? fontStyle : "normal",
            marginBottom: marginBottom,
            textIndent: props.textIndent ? props.textIndent : null,
            color: color ? color : "inherit",
            textDecoration: textDecoration ? textDecoration : null,
            verticalAlign: props.verticalAlign ? props.verticalAlign : "middle",
            whiteSpace: props.whiteSpace ? "nowrap" : null,
            textAlign: textAlign ? textAlign : null,
            padding: props.padding ? props.padding : null,
            margin: props.margin ? props.margin : null,
            backgroundColor: props.backgroundColor ? props.backgroundColor : null,
            border: props.border ? props.border : null,
            borderRadius: props.borderRadius ? props.borderRadius : null,
            cursor: props.cursor ? "pointer" : null,
            lineHeight: props.lineHeight ? props.lineHeight : null,
            height: props.height ? props.height : null,
            letterSpacing: props.letterSpacing ? props.letterSpacing : null,
        }} onClick={props.onClick}>
            {props.children}
        </p>
    );
}

export default P;