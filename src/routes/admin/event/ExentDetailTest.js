import { requester } from "App";
import P from "components/P";
import FlexChild from "layouts/flex/FlexChild";
import VerticalFlex from "layouts/flex/VerticalFlex";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


function EventDetailTest(props) {
    const { brandId } = useParams();
    const [eventList, setEventList] = useState();

    useEffect(() => {
        console.log(brandId);
        let data = {brandId : brandId}
        requester.findEventByBrand(data, (result) => {
            console.log(result.data);
            setEventList(result.data);
        })
    }, [brandId]);

    return (
        <VerticalFlex>
            
            {
            eventList && 
            eventList.map((row) => (
                <FlexChild>
                    <img  src={row.productImage}/>
                    <P>{row.brandTitleKr}{row.productTitleKr}</P>
                </FlexChild>
            ))
            }
        </VerticalFlex>
    );
}

export default EventDetailTest;