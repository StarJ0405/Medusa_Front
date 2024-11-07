import { requester } from "App";
import FlexChild from "layouts/flex/FlexChild";
import VerticalFlex from "layouts/flex/VerticalFlex";
import { useEffect, useState } from "react";
import SimpleTable from "../table/SimpleTable";
import style from "./UserGroupManagement.module.css";

function UserGroupManagement() {
    const [groups, setGroups] = useState([]);

    const theader = [
        { width: 200, code: "name", text: "그룹명" },
        { width: null, code: "description", text: "설명" }
    ]

    useEffect(() => {
        requester.getAllUserGroups((result) => {
            setGroups(result.data);
        });
    }, []);

    return (
        <div>
            <VerticalFlex>
                <FlexChild>
                    {
                        theader && groups &&
                        <SimpleTable theader={theader} data={groups} fileName={"회원그룹"} justifyContent={"flex-start"} />
                    }
                </FlexChild>
            </VerticalFlex>
        </div>
    );
}

export default UserGroupManagement;