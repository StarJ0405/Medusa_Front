import style from "./Parallax.module.scss";

function ParallaxChild(props) {
    return (
        <div className={style.childWrapper} style={{
            height:props.height
        }}>
            <div className={style.parallaxChild}>
                {props.children}
            </div>
        </div>
    );
}

export default ParallaxChild;