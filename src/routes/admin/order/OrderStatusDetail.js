import style from "./OrderStatusDetail.module.css";
import VerticalFlex from "layouts/flex/VerticalFlex";
import FlexChild from "layouts/flex/FlexChild";
import AdminDateChoice from "../datePicker/AdminDateChoice";
import AdminTable from "../table/AdminTable";
import { useEffect, useState } from "react";
import { requester } from "App";
import TableSearchCard from "routes/table/search/TableSearchCard";
import SingleAdminTable from "../table/SingleAdminTable";
import { useParams } from "react-router-dom";

function OrderStatusDetail(props) {
    const [mounted, setMounted] = useState(false);
    const [dummyData, setDummyData] = useState([]);
    const [type, setType] = useState("single");
    const { id } = useParams();
    const date = new Date();
    const koreaTimeDiff = 9 * 60; // 한국은 UTC+9
    const koreaTime = new Date(date.getTime() + (koreaTimeDiff) * 60000);

    useEffect(() => {
        setMounted(true);
    }, [])

    useEffect(() => {
        if (props.type) {
            setType(props.type);
        }

        let data = {
            "startDate": "2023-01-01 00:00:00",
            "endDate": koreaTime.toISOString().slice(0, 19).replace('T', ' '),
            "purchaseOrderid": "",
            "userName": "",
            "name": "",
            "status": id === ":id" ? null : id
        }

        if (mounted) {
            requester.getSearchForOrderTerms(data, (result) => {
                console.log("mounted", result.data);
                setDummyData(result.data);
            })
        }
    }, [mounted])

    useEffect(() => {
        let data = {
            "startDate": "2023-01-01 00:00:00",
            "endDate": koreaTime.toISOString().slice(0, 19).replace('T', ' '),
            "purchaseOrderid": "",
            "userName": "",
            "name": "",
            "status": id === ":id" ? null : id
        }

        if (mounted) {
            requester.getSearchForOrderTerms(data, (result) => {
                console.log("id", result.data);
                setDummyData(result.data);
            })
        }
    }, [id])

    const callback = (searchCondition) => {
        let data = searchCondition;
        if (id === ':id') {
            data.status = null;
        } else {
            data.status = id;
        }

        requester.getSearchForOrderTerms(searchCondition, (result) => {
            console.log("callback", result.data);
            setDummyData(result.data);
        })
    }

    const dataCallback = (value) => {
        setDummyData(value);
    }

    const theader = [
        { width: 150, text: "주문일(결제일)", justifyContent: "flex-start", weight: "bold", code: "createDateTime" },
        { width: 120, text: "주문번호", justifyContent: "flex-start", weight: "bold", code: "id" },
        { width: 100, text: "주문자", justifyContent: "flex-start", weight: "bold", code: "receiverName" },
        { width: null, text: "상품명", justifyContent: "flex-start", weight: "bold", code: "orderProducts" },
        { width: 80, text: "수량", justifyContent: "flex-start", weight: "bold", code: "orderProducts" },
        { width: 80, text: "구매금액", justifyContent: "flex-start", weight: "bold", code: "amount" },
        { width: 150, text: "상태", justifyContent: "flex-start", weight: "bold", code: "status" },
        { width: 120, text: "운송장 번호", justifyContent: "flex-start", weight: "bold" },
        { width: 70, text: "기타", justifyContent: "flex-start", weight: "bold" }
    ]
    return (
        <div className={style.container}>
            <VerticalFlex>
                <FlexChild>
                    <TableSearchCard callback={callback} index={2} />
                </FlexChild>
                <FlexChild>
                    {
                        type &&
                            type === "single"
                            ?
                            <SingleAdminTable theader={theader} mockData={dummyData} initTabIndex={0} callback={dataCallback} />
                            :
                            <AdminTable theader={theader} mockData={dummyData} initTabIndex={0} />
                    }
                </FlexChild>
            </VerticalFlex>
        </div>
    );
}

export default OrderStatusDetail;