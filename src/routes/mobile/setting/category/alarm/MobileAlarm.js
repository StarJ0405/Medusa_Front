import { requester } from "App";
import FlexChild from "layouts/flex/FlexChild";
import { useState } from "react";
import useAltEffect from "shared/hooks/useAltEffect";
import MobileSettingHeader from "../../MobileSettingHeader";

import MobileAlarmList from "./MobileAlarmList";
import MobileAlarmRow from "./MobileAlarmRow";

function MobileAlarm (props) {
    
    const [alarmList, setAlarmList] = useState();

    useAltEffect(() => {
        requester.getMobileAlarmListData((result) => {
            setAlarmList(result);
            
        })
      }, []);

    
    return(
        <>
        <FlexChild height={40}>
            <MobileSettingHeader text={"알림"} />
        </FlexChild>
        <FlexChild>
         {alarmList ? alarmList.map((data, index) => (
            <MobileAlarmList data={data} key={index} />
         )): null}
         </FlexChild>
        </>
    );
}

export default MobileAlarm;