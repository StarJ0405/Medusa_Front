import { useEffect } from "react";
import style from "./MobileSettingList.module.css"
import MobileSettingListRow from "./MobileSettingListRow";

function MobileSettingList(props) {
    const { data } = props;


    return (
        <div className={style.menuWrap}>
            {data ? data.data.map((row, index) => (
                <MobileSettingListRow row={row} key={index} />
            )) : null}
        </div>
    );
}

export default MobileSettingList;