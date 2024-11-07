import { requester } from "App";
import FlexChild from "layouts/flex/FlexChild";
import { useState } from "react";
import useAltEffect from "shared/hooks/useAltEffect";
import MobileSettingHeader from "../../MobileSettingHeader";
import style from "./MobileProfile.module.css"
import MobileProfileList from "./MobileProfileList";

function MobileProfile() {
    const [profile, setProfile] = useState();

    useAltEffect(() => {
        requester.getMobileProfileData((data) => {
            setProfile(data);
            
        })
    }, [])

    return (
        <>
            <FlexChild height={40}>
                <MobileSettingHeader text={"프로필"} />
            </FlexChild>
            <FlexChild>
                {profile ? profile.map((data, index) => (
                    <MobileProfileList data={data} key={index} />
                )) : null}
            </FlexChild>
        </>
    );
}

export default MobileProfile;