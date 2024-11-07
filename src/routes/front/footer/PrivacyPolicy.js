import { useEffect, useState } from "react";
import { requester } from "App";
import PolicyContainer from "./PolicyContainer";

function PrivacyPolicy(props) {
    const [policies, setPolicies] = useState();

    useEffect(() => {
        requester.getAllPrivacyPolicies((result) => {
            setPolicies(result.data);
        })
    }, []);

    return (
        <PolicyContainer title={"PRIVACY POLICY"} policies={policies}/>
    );
}

export default PrivacyPolicy;