import style from "./MobileAppVideoList.module.css"
import MobileAppVideoListRow from "./MobileAppVideoListRow";

function MobileAppVideoList(props) {
    const {data} = props;
    return (
        <>
            <div className={style.menuWrap}>
                {data ? data.data.map((row, index) => (
                    <MobileAppVideoListRow row={row} key={index} />
                )) : null}
            </div>
            <p className={style.text}>{data.content}</p>
        </>
    );
}

export default MobileAppVideoList;