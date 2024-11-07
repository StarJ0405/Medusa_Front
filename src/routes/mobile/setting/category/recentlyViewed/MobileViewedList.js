import style from "./MobileViewedList.module.css"
import MobileViewedListRow from "./MobileViewedListRow";

function MobileViewedList(props) {
    const {data} = props;
    return (
        <>
            <div className={style.menuWrap}>
                {data ? data.data.map((row, index) => (
                    <MobileViewedListRow row={row} key={index} />
                )) : null}
            </div>
            <p className={style.text}>{data.content}</p>
        </>
    );
}

export default MobileViewedList;