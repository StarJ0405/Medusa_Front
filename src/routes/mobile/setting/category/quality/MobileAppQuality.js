import { requester } from "App";
import FlexChild from "layouts/flex/FlexChild";
import { useState } from "react";
import useAltEffect from "shared/hooks/useAltEffect";
import MobileSettingHeader from "../../MobileSettingHeader";
import style from "./MobileAppQuality.module.css"
import MobileAppQualityList from "./MobileAppQualityList";

function MobileAppQuality () {
    const [quality, setQuality] = useState();

    useAltEffect(() => {
        requester.getAppQualityListData((data) => {
            setQuality(data);
            
        })
    }, []);

    return(
        <>
        <FlexChild height={40}>
            <MobileSettingHeader text={"앱 이미지 품질"} />
        </FlexChild>
        <FlexChild>
         {quality ? quality.map((data, index) => (
            <MobileAppQualityList data={data} key={index} />
         )): null}
         </FlexChild>
        </>
    );
}

export default MobileAppQuality;