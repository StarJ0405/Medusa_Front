
import style from "./SingleAdminTable.module.css";
import VerticalFlex from "layouts/flex/VerticalFlex";
import FlexChild from "layouts/flex/FlexChild";
import excelIcon from "resources/img/excelIcon.png"
import { useContext, useEffect, useRef, useState } from "react";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import Center from "layouts/wrapper/Center";
import Inline from "layouts/container/Inline";
import P from "components/P";
import CustomButton from "components/buttons/CustomButton";
import { BrowserDetectContext } from "providers/BrowserEventProvider";
import CheckCircleGroup from "components/inputs/checkBox/CheckCircleGroup";
import AdminTableRow from "./AdminTableRow";
import SimpleTable from "./SimpleTable";

function SingleAdminTable(props) {
    const { theader, mockData } = props;
    const { isMobile } = useContext(BrowserDetectContext);
    const [selectedList, setSelectedList] = useState([]);
    const [tabIndex, setTabIndex] = useState();
    const [data, setData] = useState();

    useEffect(() => {
        if (mockData) {
            setData(mockData);
        }
    }, [mockData])

    const excelBtnStyle = {
        backgroundColor: "white",
        color: "#aaa",
        border: "1px solid #ddd"
    }
    const onCheckGroupCallback = (checkedIndex, value, data) => {
        let selectedProducts = [];
        // checkedIndex && checkedIndex.map((index) => {
        //     selectedProducts.push(products[index]);
        // });
        setSelectedList(selectedProducts);
    }
    const checkBoxStyle = {
    }
    const onTabChange = (activeTabIndex) => {
        setTabIndex(activeTabIndex);
    }
    const dataCallback = (value) => {
        if (value) {
            setData(value);
        }

    }
    const onDataChange = (newData) => {
        if (newData) {
            const index = data.findIndex(item => item.id === newData.id);

            if (index !== -1) {
                const updatedData = [...data];
                updatedData[index] = newData;
                console.log(updatedData);
                setData(updatedData);
            }
        }
    }

    return (
        <VerticalFlex>
            <FlexChild padding={20}>
                <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
                    <VerticalFlex>
                        <FlexChild>
                            {
                                theader && data &&
                                <SimpleTable upload={props.upload} vendor={props.vendor}  productStatus={props.productStatus} theader={theader} data={data} type={"list"} cancelCallback={dataCallback} />
                            }
                        </FlexChild>
                    </VerticalFlex>
                </div>
            </FlexChild>
        </VerticalFlex>
    );
}

export default SingleAdminTable;