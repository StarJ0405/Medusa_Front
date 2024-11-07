import { requester } from "App";
import FlexChild from "layouts/flex/FlexChild";
import { useState } from "react";
import useAltEffect from "shared/hooks/useAltEffect";
import MobileSettingHeader from "../../MobileSettingHeader";
import style from "./MobileViewed.module.css"
import MobileViewedList from "./MobileViewedList";

function MobileViewed () {
    const [viewed, setViewed] = useState();

    useAltEffect(() => {
        requester.getRecentlyViewedListData((data) => {
               setViewed(data);
               
        })
    }, [])


    return(
        <>
        <FlexChild height={40}>
            <MobileSettingHeader text={"본 상품"} />
        </FlexChild>
        <FlexChild>
         {viewed ? viewed.map((data, index) => (
            <MobileViewedList data={data} key={index} />
         )): null}
         </FlexChild>
        </>
    );
}

export default MobileViewed;