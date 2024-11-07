import { useEffect, useState } from "react";

function ParallaxTab(props) {
    const [percentage, setPercentage] = useState(props.percentage);

    useEffect(() => {
        setPercentage(props.percentage);
    }, [props.percentage]);

    return (
        <div>
as
        </div>
    );
}

export default ParallaxTab;