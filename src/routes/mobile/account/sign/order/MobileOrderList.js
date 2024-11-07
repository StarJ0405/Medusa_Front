import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import { useEffect } from "react";
import style from "./MobileOrderList.module.css"
import MobileOrderListRow from "./MobileOrderListRow";

function MobileOrderList(props) {
    const { row } = props;


    return (
        <>
            {row ? row.orderProducts.map((data, index) => (
                
                <FlexChild>
                    <div className={style.wrap}>
                        <MobileOrderListRow data={data} />
                    </div>
                </FlexChild>
            )) : null}
        </>

    );
}

export default MobileOrderList;