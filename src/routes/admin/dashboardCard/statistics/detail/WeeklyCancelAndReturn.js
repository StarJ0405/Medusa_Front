import { useEffect, useState } from "react";
import style from "./WeeklyCancelAndReturn.module.scss";
import VerticalFlex from "layouts/flex/VerticalFlex";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import CustomIcon from "components/icons/CustomIcon";
import P from "components/P";
import clsx from "classnames";
import { requester } from "App";

function WeeklyCancelAndReturn() {
    const contentData = [
        {
            rank: 1,
            title: "월드베이프 입호흡 액상 모음",
            option: "파인애플",
            cancelValue: "10%",
            quantity: 80,

        },
        {
            rank: 2,
            title: "청포도 오리진",
            option: "",
            cancelValue: "10%",
            quantity: 70
        },
        {
            rank: 3,
            title: "썸머베라",
            option: "",
            cancelValue: "10%",
            quantity: 60
        },
        {
            rank: 5,
            title: "월드베이프 폐호흡 액상 모음",
            option: "오렌지",
            cancelValue: "10%",
            quantity: 40
        },
        {
            rank: 4,
            title: "쥬시알로에",
            option: "",
            cancelValue: "10%",
            quantity: 50
        }

    ]

    const [sortedData, setSortedData] = useState([]);
    const [mounted, setMounted] = useState(false);


    useEffect(() => {
        // const sorted = [...contentData].sort((a, b) => b.quantity - a.quantity);
        // setSortedData(sorted);
        setMounted(true);

    }, []);
    useEffect(() => {
        requester.getReturnsAndCancel((result) => {
            setSortedData(result.data);
        })
        
    },[mounted]) 

    useEffect(() => {
        console.log(sortedData);
    }, [sortedData])
    return (
        <div className={style.container}>
            <VerticalFlex>
                <FlexChild>
                    <div className={style.label}>
                        <HorizontalFlex gap={10}>
                            <FlexChild width={"max-content"}>
                                <CustomIcon name={"statisticsSales"} width={20} />
                            </FlexChild>
                            <FlexChild>
                                <P>주간 취소 및 반품 순위 BEST 5</P>
                            </FlexChild>
                        </HorizontalFlex>
                    </div>
                </FlexChild>
                <FlexChild width={"90%"}>
                    <table className={style.table}>
                        <thead className={style.thead}>
                            <tr>
                                <th className={style.th}>순위</th>
                                <th className={style.th}>브랜드명</th>
                                <th className={style.th}>상품명</th>
                                <th className={style.th}>수량</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedData && sortedData.map((row, index) => (
                                <tr key={index} className={style.tr}>
                                    <td className={style.td}>
                                        <div className={clsx(style.tdLabel, index < 1 ? style.specialTdLabel : null)}>
                                            {index + 1}
                                        </div>
                                    </td>
                                    <td className={clsx(style.td, index < 1 ? style.specialRank : null)}>{row.brandTitle}</td>
                                    <td className={clsx(style.td, index < 1 ? style.specialRank : null)}>{row.title}</td>
                                    <td className={clsx(style.td, index < 1 ? style.specialRank : null)}>{row.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </FlexChild>
            </VerticalFlex>
        </div >
    );
}

export default WeeklyCancelAndReturn;