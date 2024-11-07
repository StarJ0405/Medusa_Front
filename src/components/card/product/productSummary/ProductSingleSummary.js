import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import VerticalFlex from "layouts/flex/VerticalFlex";
import { useEffect, useRef, useState } from "react";
import style from "./ProductSummary.module.css"


function ProductSingleSummary (props) {
    const { row, quantity } = props;
    const [helperText, setHelperText] = useState("");
    const [list, setList] = useState("");
    const inputs = useRef([]);

    return (
        <div className={style.productWrap}>
        <HorizontalFlex>
            <FlexChild width={150}>
                <div className={style.imgWrap}>
                    <img src={row.product.image} className={style.img} />

                </div>
            </FlexChild>
            <VerticalFlex>
                <FlexChild>
                    <div className={style.contentWrap}>
                        <p className={style.title}>{row.product.titleKr}</p>
                        <p className={style.tag}>{row.product.hashTagKr}</p>
                        <p className={style.price}>₩ {row.product.price}</p>
                    </div>
                </FlexChild>
                <FlexChild alignItems={"flex-start"}>
                    <div className={style.inputWrap}>
                        <p className={style.quantity}>수량 : {row.quantity}</p>
                    </div>
                </FlexChild>
            </VerticalFlex>
        </HorizontalFlex>
    </div>
    );
}



export default ProductSingleSummary;