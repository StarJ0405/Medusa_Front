import { BrowserDetectContext } from "providers/BrowserEventProvider";
import { useContext, useEffect, useState } from "react";

import DisputeListRow from "./DisputeListRow";

function DisputeList(props) {
    const { row } = props;
    const [orderList, setOrderList] = useState("");
    const { isMobile } = useContext(BrowserDetectContext);
    useEffect(() => {
        if (row) {
            setOrderList(row);
            
        }

    }, [row])

    return (
        <>
            {/* {
                orderList
                &&
                orderList.orderProducts.map((data, index) => (
                    <DisputeListRow key={index} data={data} index={index} />
                ))
            } */}
        </>

    );
}

export default DisputeList;