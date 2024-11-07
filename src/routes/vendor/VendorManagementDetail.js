import style from "./VendorRegister.module.css";
import VerticalFlex from "layouts/flex/VerticalFlex";
import FlexChild from "layouts/flex/FlexChild";
import { useEffect, useState } from "react";
import { requester } from "App";
import TableSearchCard from "routes/table/search/TableSearchCard";
import SingleAdminTable from "routes/admin/table/SingleAdminTable";
import AdminTable from "routes/admin/table/AdminTable";

function VendorManagementDetail(props) {
    const [mounted, setMounted] = useState(false);
    const [dummyData, setDummyData] = useState([]);
    const [type, setType] = useState("single");


    useEffect(() => {
        setMounted(true);
    }, [])
    useEffect(() => {
        console.log(props.type);
        if (props.type) {
            setType(props.type);
        }


        if (mounted) {
            requester.getAllVendors((result) => {
                console.log(result.data);
                setDummyData(result.data);
            })
        }


    }, [mounted])

    const callback = (startDate, endDate, selectedDate, selectedSearch, input) => {
        console.log(startDate, endDate, selectedDate, selectedSearch, input);
        requester.getSearchForProductTerms((result) => {
            console.log(result.data);
            setDummyData(result.data);
        })
        console.log("callback");
    }

    const dataCallback = (value) => {
        setDummyData(value);
    }

    const theader = [
        { width: 150, text: "아이디", justifyContent: "flex-start", weight: "bold", code: "userName" },
        { width: 120, text: "연락처", justifyContent: "flex-start", weight: "bold", code: "mobileNo" },
        { width: 100, text: "확인", justifyContent: "flex-start", weight: "bold", code: "confirmYn" },
        { width: null, text: "회사명", justifyContent: "flex-start", weight: "bold", code: "businessName" },
    ]
    return (
        <div className={style.container}>
            <VerticalFlex>
                <FlexChild>
                    <TableSearchCard callback={callback} index={3} />
                </FlexChild>
                <FlexChild>
                    <SingleAdminTable vendor theader={theader} mockData={dummyData} initTabIndex={0} callback={dataCallback} />
                </FlexChild>
            </VerticalFlex>
        </div>
    );
}

export default VendorManagementDetail;