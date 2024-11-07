import style from "./Inline.module.css";

function Inline(props) {
    const { weight, font, size, margin, color } = props;
    return (
        <div className={style.inline} style={{
            fontWeight: weight,
            fontFamily: font,
            fontSize: size,
            margin: props.margin,
            color: color
        }}>
            {props.children}
        </div>
    );
}

export default Inline;