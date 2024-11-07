import { requester } from "App";
import P from "components/P";
import { useEffect, useState } from "react";
import test1 from "resources/img/exhibitionImg/test1.jpg"
import Parallax from "./Parallax";
import VerticalFlex from "layouts/flex/VerticalFlex";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import { CButton } from "@coreui/react";
import CustomButton from "components/buttons/CustomButton";
import { Outlet, useNavigate } from "react-router-dom";

function ExhibitionTest() {
    const navigate = useNavigate();
    const [exhibition, setExhibition] = useState();



    useEffect(() => {
        requester.findExhibition((result) => {            
            setExhibition(result.data);
        })
    }, [])

    const onClick = (id) => {
        navigate(`/admin/order/${id}`);
    }

    return (
        
            <VerticalFlex gap={30}>
                <FlexChild>
                    <P size={"18pt"} weight={"bold"}>주문내역</P>
                </FlexChild>
                <FlexChild>
                    <HorizontalFlex gap={30} justifyContent={"center"}>
                        {
                            exhibition &&
                            exhibition.map((row) => (
                                <FlexChild width={"max-content"}>
                                    <CustomButton text={row.titleKr} onClick={() => onClick(row.id)} />
                                </FlexChild>

                            ))
                        }
                    </HorizontalFlex>
                </FlexChild>
                <FlexChild>
                    <P size={"18pt"} weight={"bold"}>기획전</P>
                </FlexChild>
                <FlexChild>
                    <Outlet />
                </FlexChild>
            </VerticalFlex>
        
    );
}

export default ExhibitionTest;