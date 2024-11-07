import style from "./ProductManagementLayout.module.css";
import VerticalFlex from "layouts/flex/VerticalFlex";
import FlexChild from "layouts/flex/FlexChild";
import AdminDateChoice from "../datePicker/AdminDateChoice";
import AdminTable from "../table/AdminTable";
import { useEffect, useState } from "react";
import { requester } from "App";
import TableSearchCard from "routes/table/search/TableSearchCard";
import SingleAdminTable from "../table/SingleAdminTable";

function ProductManagementLayout(props) {
    const [mounted, setMounted] = useState(false);
    const [dummyData, setDummyData] = useState([]);

    useEffect(() => {
        setMounted(true);
    }, [])

    const callback = (vendors, brands, categories, input, selectedProductDisplayValue, selectedRestockStatus) => {
        // console.log(vendors, brands, categories, input, selectedProductDisplayValue, selectedRestockStatus);
        const categoryIds = categories.map(item => item.id);
        const brandIds = brands.map(item => item.id);
        const vendorIds = vendors.map(item => item.id);
        console.log(categoryIds);
        console.log(brandIds);
        console.log(vendorIds);
        console.log(input);
        console.log(selectedProductDisplayValue);
        console.log(selectedRestockStatus);
        
        let data = 
        {
            categoryIds: categoryIds, 
            brandIds: brandIds, 
            vendorIds: vendorIds, 
            input: input, 
            selectedProductDisplayValue: selectedProductDisplayValue,
            selectedRestockStatus: selectedRestockStatus
        }
        console.log(data);
        requester.getSearchForProductTerms(data, (result) => {
            console.log(result.data);
            setDummyData(result.data);
        })
    }

    const dataCallback = (value) => {
        setDummyData(value);
    }

    const theader = [
        { width: 300, text: "상품ID", justifyContent: "flex-start", weight: "bold", code: "productId" },
        { width: 200, text: "브랜드", justifyContent: "flex-start", weight: "bold", code: "brandName" },
        { width: 400, text: "상품명", justifyContent: "flex-start", weight: "bold", code: "productName" },
        { width: 80, text: "상품가격", justifyContent: "flex-start", weight: "bold", code: "price" },
        { width: 100, text: "수량", justifyContent: "flex-start", weight: "bold", code: "quantity" },
        { width: 100, text: "비고", justifyContent: "flex-start", weight: "bold" }
    ]

    return (
        <div className={style.container}>
            <VerticalFlex>
                <FlexChild>
                    <TableSearchCard callback={callback} index={1} />
                </FlexChild>
                <FlexChild>
                    <SingleAdminTable upload productStatus theader={theader} mockData={dummyData} initTabIndex={0} callback={dataCallback} />
                </FlexChild>
            </VerticalFlex>
        </div>
    );
}

export default ProductManagementLayout;