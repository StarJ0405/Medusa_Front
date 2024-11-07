import P from "components/P";
import style from "./Skeleton.module.css";

function SkeletonText(props) {
    return (
        <div className={style.text} style={{width:props.width}}>
            <P size={props.size}>{" "}</P>
        </div>
    );
}

export default SkeletonText;