import { requester } from "App";
import FlexChild from "layouts/flex/FlexChild";
import { useState } from "react";
import useAltEffect from "shared/hooks/useAltEffect";
import MobileSettingHeader from "../../MobileSettingHeader";
import style from "./MobileAppVideo.module.css"
import MobileAppVideoList from "./MobileAppVideoList";

function MobileAppVideo() {
    const [appVideo, setAppVideo] = useState();

    useAltEffect(() => {
        requester.getAppVideoListData((data) => {
            setAppVideo(data);
            
        })
    }, [])


    return (
        <>
            <FlexChild height={40}>
                <MobileSettingHeader text={"설정"} />
            </FlexChild>
            <FlexChild>
                {appVideo ? appVideo.map((data, index) => (
                    <MobileAppVideoList data={data} key={index} />
                )) : null}
            </FlexChild>
        </>
    );
}

export default MobileAppVideo;