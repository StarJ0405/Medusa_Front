import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import style from "./ChatRow.module.css"
import mok1 from "resources/img/mokImg/mokImg1.jpg";

function ChatRow(props) {
    const { data } = props;
    return (
        <>
            <div className={style.imgWrap}>
                <p className={style.content}>{data.content ? data.content : data}</p>
                <div className={style.imgArea}>
                    <img src={mok1} className={style.img} />
                </div> 
            </div>
        </>
    );
}

export default ChatRow;