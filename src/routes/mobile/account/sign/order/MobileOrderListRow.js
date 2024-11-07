import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import { useEffect } from "react";
import style from "./MobileOrderListRow.module.css"

function MobileOrderListRow (props) {
    const {data} = props;

    
    return (
        <HorizontalFlex>
                <FlexChild justifyContent={"center"}>
                    
                    <div className={style.imgWrap}>
                        <div className={style.imgArea}>
                            <img src={data.product.image} className={style.img} />
                        </div>
                    </div>
                </FlexChild>
                <FlexChild justifyContent={"center"}>
                    <p>{data.product.titleKr}</p>
                </FlexChild>
                <FlexChild justifyContent={"center"}>
                    <p>{data.product.price}</p>
                </FlexChild>
                <FlexChild justifyContent={"center"}>
                    <p>{data.quantity}</p>
                </FlexChild>
            </HorizontalFlex>
    );
}

export default MobileOrderListRow;