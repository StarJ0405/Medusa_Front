import VerticalFlex from "layouts/flex/VerticalFlex";
import style from "./EventsInProgress.module.scss";
import FlexChild from "layouts/flex/FlexChild";
import Inline from "layouts/container/Inline";
import CustomIcon from "components/icons/CustomIcon";
import Center from "layouts/wrapper/Center";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import P from "components/P";
import clsx from "classnames";
import CustomButton from "components/buttons/CustomButton";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { requester } from "App";
import NiceModal from "@ebay/nice-modal-react";
import { useTranslation } from "react-i18next";


function EventsInProgress() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [isMounted, setMounted] = useState(false);
    const [promotion, setPromotion] = useState();


    const onPromotionRegClick = () => {
        navigate(`/admin/promotion/register`, { replace: true });
    }
    const onPromotionDetailClick = (row) => {
        NiceModal.show("promotionDetail", { data: row })
    }

    useEffect(() => {
        setMounted(true);
    }, [])

    useEffect(() => {
        requester.getPromotion((result) => {
            setPromotion(result.data);
            console.log(result.data);
        })
    }, [isMounted])


    const contentData = [
        {
            type: "할인",
            color: "#5471e6",
            title: "신제품 출시 할인 이벤트",
            start: "2023-07-17 09:05",
            end: "2023-07-07 09:05"
        },
        {
            type: "증정",
            color: "#e84518",
            title: "얼려먹구싶오 5개 구매시 2개 추가증정 이벤트",
            start: "2023-07-17 09:05",
            end: "2023-07-07 09:05"
        },
        {
            type: "출석체크",
            color: "#383e57",
            title: "7일 연속 출석 체크 성공하면 30% 할인쿠폰 증정",
            start: "2023-07-17 09:05",
            end: "2023-07-07 09:05"
        },
        {
            type: "할인",
            color: "#5471e6",
            title: "맥스쿨 출시 기념 3+2 이벤트",
            start: "2023-07-17 09:05",
            end: "2023-07-07 09:05"
        }
    ]

    const onDeleteClick = (row) => {

        NiceModal.show("confirm", {
            message: t("confirmCartProductDelete"),
            confirmText: t("delete"),
            cancelText: t("cancel"),
            onConfirm: () => deletePromotion(row),
            onCancel: onCancel
        });
    }
    const deletePromotion = (row) => {
        console.log("삭제")

        console.log(row);
        requester.deletePromotion(row, (result) => {
            console.log(result.data);
            setPromotion(result.data);
        })
    }
    const onCancel = () => {
        console.log("취소")

    }

    const formatDateTime = (dateStr) => {
        let dateObj = new Date(dateStr);

        let year = dateObj.getFullYear();
        let month = String(dateObj.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더해야 합니다.
        let day = String(dateObj.getDate()).padStart(2, '0');
        let hours = String(dateObj.getHours()).padStart(2, '0');
        let minutes = String(dateObj.getMinutes()).padStart(2, '0');

        return `${year}년 ${month}월 ${day}일 ${hours}:${minutes}`;
    }

    return (
        <div className={style.container}>
            <VerticalFlex>
                <FlexChild>
                    <div className={style.label}>
                        <HorizontalFlex gap={10}>
                            <FlexChild width={"max-content"}>
                                <CustomIcon name={"eventsInProgress"} width={25} />
                            </FlexChild>
                            <FlexChild>
                                <P>진행 중 이벤트</P>
                            </FlexChild>
                        </HorizontalFlex>
                    </div>
                </FlexChild>
                <FlexChild>
                    <div className={style.contentArea}>
                        <table className={style.table}>
                            <thead className={style.thead}>
                                <tr>
                                    <th className={style.th}>타입</th>
                                    <th className={style.th}>이벤트명</th>
                                    <th className={style.th}>
                                        <div>
                                            <Inline>
                                                <P>시작일 </P>
                                                {/* <CustomIcon name={"downAngle"} width={10} /> */}
                                            </Inline>
                                        </div>
                                    </th>
                                    <th className={style.th}>
                                        <div>
                                            <Inline>
                                                <P>종료일 </P>
                                                {/* <CustomIcon name={"downAngle"} width={7} /> */}
                                            </Inline>
                                        </div>
                                    </th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {promotion && promotion.map((row, index) => {
                                    return (
                                        <tr key={index} className={style.tr} onClick={()=> onPromotionDetailClick(row)}>
                                            <td className={style.td}>
                                                <div className={style.tdLabel} style={{
                                                    backgroundColor: row.type === "Gift" ? "#e84518" : "#5471e6"
                                                }}>
                                                    {row.type}
                                                </div>
                                            </td>
                                            <td className={style.td}>{row.title}</td>
                                            <td className={style.td}>{formatDateTime(row.startDateTime)}</td>
                                            <td className={style.td}>{formatDateTime(row.endDateTime)}</td>
                                            <td className={style.td}>
                                                <div style={{
                                                    display: "flex",
                                                    gap: "10px",
                                                    justifyContent: "center"
                                                }}>
                                                    <div className={style.deleteIconArea}>
                                                        <div onClick={() => onDeleteClick(row)} style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "absolute", top: "-2px" }}>
                                                            <CustomIcon icon name={"delete"} width={15} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </FlexChild>
                <FlexChild>
                    <CustomButton text={"프로모션 등록"} onClick={onPromotionRegClick} />
                </FlexChild>
            </VerticalFlex>
        </div>
    );
}

export default EventsInProgress;