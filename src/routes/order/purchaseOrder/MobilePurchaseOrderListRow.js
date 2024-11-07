import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import { useEffect } from "react";
import style from "./MobilePurchaseOrderListRow.module.css"

function PurchaseOrderListRow (props) {
    const {row} = props;


     return(
        <div className={style.container}>
            <HorizontalFlex>
            <FlexChild justifyContent={"center"}>
                <div className={style.imgWrap}>
                    <div className={style.imgArea}>
                        <img src={row.product.image} className={style.img} />
                    </div>
                    </div>
                </FlexChild>
                <FlexChild justifyContent={"center"}>
                    <p className={style.text}>{row.product.titleKr}</p>
                </FlexChild>
                <FlexChild justifyContent={"center"}>
                <p className={style.text}>{row.product.price}</p>
                </FlexChild>
                <FlexChild justifyContent={"center"}>
                <p className={style.text}>{row.quantity}</p>
                </FlexChild>
                <FlexChild justifyContent={"center"}>
                <p className={style.text}>Y / N</p>
                </FlexChild>
            </HorizontalFlex>
            
        </div>
    );
}

export default PurchaseOrderListRow;