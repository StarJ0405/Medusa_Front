import { useEffect, useState } from "react";
import { requester } from "App";
import PolicyContainer from "./PolicyContainer";

function TermsOfUse(props) {
    const [policies, setPolicies] = useState();

    useEffect(() => {
        requester.getAllPolicies((result) => {
            setPolicies(result.data);
        })
        
    }, []);

    return (
        <PolicyContainer title={"Terms and Conditions"} policies={policies}/>
    );
}

export default TermsOfUse;