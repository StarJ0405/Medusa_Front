import VerticalFlex from "layouts/flex/VerticalFlex";
import style from "./WeeklySalesVolume.module.scss";
import FlexChild from "layouts/flex/FlexChild";
import Center from "layouts/wrapper/Center";
import P from "components/P";
import CustomIcon from "components/icons/CustomIcon";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import clsx from "classnames";
import { useEffect, useState } from "react";
import { requester } from "App";

function WeeklySalesVolume() {
    const [sortedData, setSortedData] = useState([]);
    const [mounted, setMounted] = useState(false);


    useEffect(() => {
        setMounted(true)
    }, []);
    useEffect(() => {
        requester.getSalesRate((result) => {
            console.log("getSalesRate", result.data)
            setSortedData(result.data);
        })
    },[mounted])

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
                                <P>주간 판매량 BEST 5</P>
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
                                        <div className={clsx(style.tdLabel, index < 3 ? style.specialTdLabel : null)}>
                                            {index + 1}
                                        </div>
                                    </td>
                                    <td className={clsx(style.td, index < 3 ? style.specialRank : null)}>{row.brandTitle}</td>
                                    <td className={clsx(style.td, index < 3 ? style.specialRank : null)}>{row.title}</td>
                                    <td className={clsx(style.td, index < 3 ? style.specialRank : null)}>{row.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </FlexChild>
            </VerticalFlex>
        </div >
    );
}

export default WeeklySalesVolume;