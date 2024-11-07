import FlexChild from "layouts/flex/FlexChild";
import style from "./CouponStatus.module.scss";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import P from "components/P";
import CustomIcon from "components/icons/CustomIcon";
import VerticalFlex from "layouts/flex/VerticalFlex";
import Inline from "layouts/container/Inline";


function CouponStatus() {
    const contentData = [
        {
            type: "금액할인",
            title: "3만원 구매시 2천원 할인",
            period: "2023-07-17 09:05 ~ 2023-07-07 09:05"

        },
        {
            type: "할인율",
            title: "이벤트 상품 구매시 10% 할인",
            period: "2023-07-17 09:05 ~ 2023-07-07 09:05"
        },
        {
            type: "적립금",
            title: "리뷰 작성시 3,000 적립",
            period: "2023-07-17 09:05 ~ 2023-07-07 09:05"
        },
        {
            type: "배송비 할인",
            title: "5만원 구매시 배송비 무료",
            period: "2023-07-17 09:05 ~ 2023-07-07 09:05"
        }
    ]

    return (
        <div className={style.container}>
            <VerticalFlex>
                <FlexChild>
                    <div className={style.label}>
                        <HorizontalFlex gap={10}>
                            <FlexChild width={"max-content"}>
                                <CustomIcon name={"couponStatus"} width={25} />
                            </FlexChild>
                            <FlexChild>
                                <P>사용 중 쿠폰현황</P>
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
                                                <P>사용기간 </P>
                                                <CustomIcon name={"downAngle"} width={7} />
                                            </Inline>
                                        </div>
                                    </th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {contentData.map((row, index) => (
                                    <tr key={index} className={style.tr}>
                                        <td className={style.td}>
                                            {row.type}
                                        </td>
                                        <td className={style.td}>{row.title}</td>
                                        <td className={style.td}>{row.period}</td>
                                        <td className={style.td}>
                                            <div style={{
                                                display: "flex",
                                                gap: "10px",
                                                justifyContent: "center"
                                            }}>
                                                <div className={style.deleteIconArea}>
                                                    <CustomIcon icon name={"delete"} width={15} />
                                                </div>
                                                <div className={style.managementArea}>
                                                    <CustomIcon icon name={"management"} width={15} />
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </FlexChild>
            </VerticalFlex>
        </div>
    );
}

export default CouponStatus;