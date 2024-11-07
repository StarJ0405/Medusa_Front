import { useEffect, useState } from "react";
import style from "./WeeklyCartVolume.module.css";
import VerticalFlex from "layouts/flex/VerticalFlex";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import CustomIcon from "components/icons/CustomIcon";
import clsx from "classnames";
import P from "components/P";
import { requester } from "App";

function WeeklyCartVolume() {
    const [sortedData, setSortedData] = useState([]);
    const [mounted, setMounted] = useState(false);


    useEffect(() => {
        setMounted(true);
        
    }, []);
    useEffect(() => {
        requester.getWeeklyCartRate((result) => {
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
                                <CustomIcon name={"statisticsCart"} width={20} />
                            </FlexChild>
                            <FlexChild>
                                <P>주간 장바구니 BEST 5</P>
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
                                <th className={style.th}>싱픔먕</th>
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

export default WeeklyCartVolume;