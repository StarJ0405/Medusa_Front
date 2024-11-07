import { requester } from "App";
import style from "./AllCartsInfo.module.css";
import { useContext, useEffect, useRef, useState } from "react";
import P from "components/P";
import { getCurrentLanguageCode } from "shared/utils/Utils";
import { BrowserDetectContext } from "providers/BrowserEventProvider";
import ShippingInfoPagenationTable from "routes/table/ShippingInfoPagenationTable";
import VerticalFlex from "layouts/flex/VerticalFlex";
import FlexChild from "layouts/flex/FlexChild";
import CartsInfoPagenationTable from "routes/table/CartsInfoPagenationTable";

function AllCartsInfo() {
    const { isMobile } = useContext(BrowserDetectContext);
    const [list, setList] = useState();
    const [carts, setCarts] = useState([]);
    const cartsRef = useRef();


    useEffect(() => {
        setTimeout(() => {
            requester.getAllCarts((result => {

                setList(result.data);
                console.log(result.data);
            }))
        }, 1500)

    }, [])

    const columns =
        isMobile
            ?
            [
                "No",
                "아이디",
                "상세"
                
            ] :
            [
                "No",
                "아이디",
                "담은날짜",
                "상품",
                "총액"
            ];


    useEffect(() => {
        if (list) {

            const processedData = [];
            const userCreateDatetimeMap = {}; // userName과 첫 번째 createDateTime을 매핑하기 위한 객체

            list.forEach((item) => {
                const { userName, product, quantity, createDateTime } = item;
                const total = product.price * quantity;
                const userIndex = processedData.findIndex((user) => user.userName === userName);

                if (!(userName in userCreateDatetimeMap)) {
                    userCreateDatetimeMap[userName] = createDateTime; // 첫 번째 createDateTime 저장
                }

                if (userIndex !== -1) {
                    processedData[userIndex].list.push({ productName: product.titleKr, quantity });
                    processedData[userIndex].total += total;
                } else {
                    processedData.push({
                        userName,
                        list: [{ productName: (product.brandTitle + " " + product.title), quantity }],
                        total,
                        createDateTime: userCreateDatetimeMap[userName], // 첫 번째 createDateTime 사용
                    });
                }
            });

            processedData.sort((a, b) => b.total - a.total);
            setCarts(processedData);
        }

    }, [list])

    useEffect(() => {
        console.log(carts);
    }, [carts])

    return (
        <VerticalFlex gap={30}>
            <FlexChild>
                <P size={"18pt"} weight={"bold"}>회원 장바구니 내역</P>
            </FlexChild>
            <FlexChild>
                {
                    carts &&
                    <CartsInfoPagenationTable ref={cartsRef} columns={columns} data={carts} />
                }
            </FlexChild>
        </VerticalFlex>
    );
}

export default AllCartsInfo;