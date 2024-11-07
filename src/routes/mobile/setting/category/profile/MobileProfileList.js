import { useEffect } from "react";
import style from "./MobileProfileList.module.css"
import MobileProfileListRow from "./MobileProfileListRow";

function MobileProfileList (props){
    const {data} = props;

    return(
        <>
            <div className={style.menuWrap}>
                {data ? data.data.map((row, index) => (
                    <MobileProfileListRow row={row} key={index} />
                )) : null}
            </div>
            
        </>
    );
}

export default MobileProfileList;