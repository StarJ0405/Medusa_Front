import PaddingWrapper from "layouts/wrapper/PaddingWrapper";
import style from "./Skeleton.module.css";

function SkeletonImage(props) {
    return (
        <div className={style.image} style={
            {
                padding:`${props.width/2}px`
            //    paddingTop:`${props.width*0.9*0.5}px`,
            //    paddingBottom:`${props.width*0.9*0.5}px`,
            //    paddingLeft:`${props.width*0.9*0.5}px`,
            //    paddingRight:`${props.width*0.9*0.5}px`
            }
        }>
        </div>
    );
}

export default SkeletonImage;