import { requester } from "App";
import P from "components/P";
import CustomButton from "components/buttons/CustomButton";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import VerticalFlex from "layouts/flex/VerticalFlex";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function EventTest() {
    const navigate = useNavigate();
    const [event, setEvent] = useState();



    useEffect(() => {
        requester.findEventAll((result) => {
            setEvent(result.data);
        })
    }, [])

    const onClick = (id) => {
        navigate(`/admin/event/${id}`);
    }

    return (

        <VerticalFlex gap={30}>
            <FlexChild>
                <P size={"18pt"} weight={"bold"}>이벤트</P>
            </FlexChild>
            <FlexChild>
                <HorizontalFlex gap={30} justifyContent={"center"}>
                    {
                        event &&
                        event.map((row) => (
                            <FlexChild width={"max-content"}>
                                <CustomButton text={row.titleKr} onClick={() => onClick(row.id)} />
                            </FlexChild>

                        ))
                    }
                </HorizontalFlex>
            </FlexChild>
            <FlexChild>
                <P size={"18pt"} weight={"bold"}>이벤트 하는 브랜드</P>
            </FlexChild>
            <FlexChild>
                <Outlet />
            </FlexChild>
        </VerticalFlex>
    )
}

export default EventTest;