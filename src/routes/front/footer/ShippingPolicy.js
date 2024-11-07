import { useEffect, useState } from "react";
import { requester } from "App";
import PolicyContainer from "./PolicyContainer";

function ShippingPolicy(props) {
    const [policies, setPolicies] = useState();

    useEffect(() => {
        requester.getAllShippingPolicies((result) => {
            setPolicies(result.data);
        })
    }, []);

    return (
        <PolicyContainer title={"SHIPPING POLICY"} policies={policies}/>
    );
}

export default ShippingPolicy;