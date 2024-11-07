import style from "./Parallax.module.scss";
import { Parallax, Background } from "react-parallax";

function ParallaxContainer(props) {


    return (
        <Parallax
            // bgImage={props.bgImage}
            strength={props.strength}
            renderLayer={(percentage) => props.render(percentage-1)}
        >
            <div className={style.background} style={{
                height: props.height || "100%",
                width: props.width || "100%",
                backgroundImage: `url(${props.bgImage})`
            }}>
               
            </div>
        </Parallax>
    );
}

export default ParallaxContainer;