import P from "components/P";
import FlexChild from "layouts/flex/FlexChild";
import VerticalFlex from "layouts/flex/VerticalFlex";
import { BrowserDetectContext } from "providers/BrowserEventProvider";
import { useContext, useEffect, useState } from "react";
import style from "./MockItem.module.css";
import initialSearchCondition from "InitialData/InitialSearchCondition.json";
import { addCommas, clone } from "shared/utils/Utils";
import { requester } from "App";
import { globalProducts } from "InitialData/Items";

function MockItem(props) {
    const { isMobile } = useContext(BrowserDetectContext);
    const [product, setProduct] = useState();

    useEffect(() => {
        setProduct(globalProducts[props.index]);
  
    }, []);

    return (
        <>
            {product &&
                <VerticalFlex flexStart>
                    <FlexChild>
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <div style={{ position: "relative", width: "100%" }}>
                                <img width={isMobile ? "70%" : "150px"} src={product.image} />
                                {
                                    props.index
                                    && props.index < 40 && 
                                    <div className={isMobile ? style.imgMobileIndexCircle : style.imgIndexCircle} style={{ backgroundColor: props.index === 1 && "var(--main-color)" }}>
                                        {props.index}
                                    </div>
                                }
                            </div>
                        </div>
                    </FlexChild>
                    <FlexChild>
                        <P weight={"bold"}>[{product.brandTitle}] {product.title}</P>
                    </FlexChild>
                    {/* <FlexChild>
                        <P weight={"bold"}>(S NIC/9.8mg/30ml)</P>
                    </FlexChild> */}
                    <FlexChild>
                        <P>&#8361;{addCommas(product.price)}</P>
                    </FlexChild>
                </VerticalFlex>
            }
        </>
    );
}

export default MockItem;