import VerticalFlex from "layouts/flex/VerticalFlex";
import style from "./ExhibitionProgress.module.scss";
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


function ExhibitionProgress() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [isMounted, setMounted] = useState(false);
    const [exhibition, setExhibition] = useState();


    const onExhibitionRegClick = () => {
        navigate(`/admin/exhibition/register`, { replace: true });
    }
    const onExhibitiondetailClick = (row) => {
        NiceModal.show("exhibitionDetail", {data : row});
    }

    useEffect(() => {
        setMounted(true);
    }, [])

    useEffect(() => {
        requester.getExhibitions((result) => {
            setExhibition(result.data);
        })
    }, [isMounted])


    const onDeleteClick = (row) => {

        NiceModal.show("confirm", {
            message: t("confirmCartProductDelete"),
            confirmText: t("delete"),
            cancelText: t("cancel"),
            onConfirm: () => deleteExhibition(row),
            onCancel: onCancel
        });
    }
    const deleteExhibition = (row) => {
        console.log("삭제")

        
        requester.deleteExhibition(row, (result) => {
        
            setExhibition(result.data);
        })
    }
    const onCancel = () => {
        

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
                                <P>진행중인 기획전</P>
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
                                {exhibition && exhibition.map((row, index) => {
                                    return (
                                        <tr key={index} className={style.tr} onClick={() => onExhibitiondetailClick(row)}>
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
                    <CustomButton text={"기획전 등록"} onClick={onExhibitionRegClick} />
                </FlexChild>
            </VerticalFlex>
        </div>
    );
}

export default ExhibitionProgress;