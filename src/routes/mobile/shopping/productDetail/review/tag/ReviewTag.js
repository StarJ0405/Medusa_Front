import style from "./ReviewTag.module.css"

function ReviewTag (props) {
    const {data, key} = props;
    return(
        <>
        <p className={style.button}>{data.tag}</p>
        
        </>
        
    );
}

export default ReviewTag;