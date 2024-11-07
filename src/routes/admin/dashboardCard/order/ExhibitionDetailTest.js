import { requester } from "App";
import P from "components/P";
import FlexChild from "layouts/flex/FlexChild";
import VerticalFlex from "layouts/flex/VerticalFlex";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


function ExhibitionDetailTest(props) {
    const { brandId } = useParams();
    const [exhibitionList, setExhibitionList] = useState();

    useEffect(() => {
        console.log(brandId);
        let data = {brandId : brandId}
        requester.findExhibitionByBrand(data, (result) => {
            console.log(result.data);
            setExhibitionList(result.data);
        })
        
    }, [brandId]);

    return (
        <VerticalFlex>
            
            {
            exhibitionList && 
            exhibitionList.map((row) => (
                <FlexChild>
                    <img  src={row.productImage}/>
                    <P>{row.brandTitleKr}{row.productTitleKr}</P>
                </FlexChild>
            ))
            }
        </VerticalFlex>
    );
}

export default ExhibitionDetailTest;