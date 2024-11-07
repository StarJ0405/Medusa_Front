import { useEffect } from "react";
import style from "./MobileAlarmList.module.css"
import MobileAlarmRow from "./MobileAlarmRow";

function MobileAlarmList(props) {
    const { data } = props;

    return (
        <>
            <div className={style.menuWrap}>
                {data ? data.data.map((row, index) => (
                    <MobileAlarmRow row={row} key={index} />
                )) : null}
            </div>
            <p className={style.text}>{data.content}</p>
            
        </>
    );
}

export default MobileAlarmList;
