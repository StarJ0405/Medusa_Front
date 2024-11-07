import { faStaylinked } from "@fortawesome/free-brands-svg-icons";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import VerticalFlex from "layouts/flex/VerticalFlex";
import style from "./CouponCard.module.css";

function CouponCard(props) {
    return (
        <div className={style.coupon}>
            <div className={style.left}>
                <div className={style.content}>
                    <p className={style.couponAmount}>
                        {"\\ "}{props.amount.toLocaleString()}
                    </p>
                </div>
                <div className={style.top}>
                    <div className={style.punchHole}>

                    </div>
                </div>
                <div className={style.bottom}>
                    <div className={style.punchHole}>

                    </div>
                </div>
            </div>
            <div className={style.right}>
                <div className={style.content}>
                    <VerticalFlex>
                        <FlexChild>

                        </FlexChild>
                        <FlexChild height={15}>
                            <div className={style.movingIcon}>
                                <p className={style.movingIconText}>{">"}</p>

                            </div>
                        </FlexChild>
                        <FlexChild>
                        </FlexChild>
                    </VerticalFlex>

                </div>
                <div className={style.top}>
                    <div className={style.punchHole}>

                    </div>
                </div>
                <div className={style.bottom}>
                    <div className={style.punchHole}>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default CouponCard;