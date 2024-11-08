import { requester } from "App";
import ButtonEclipse from "components/buttons/ButtonEclipse";
import NormalProductCard from "components/card/product/NormalProductCard";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import { useEffect, useState } from "react";
import useAltEffect from "shared/hooks/useAltEffect";
import style from "./SeriesRow.module.css"


function SeriesRow(props) {
    const { data } = props;
    const [newProducts, setNewProducts] = useState();


    useAltEffect(() => {
        requester.getNewProducts((result) => {
            setNewProducts(result.data);
        });
    }, [])


    return (
        <div className={style.container}>
            <HorizontalFlex>
                <div className={style.brand} style={{
                    backgroundImage: `url(${data.url})`
                }} >
                    <div className={style.buttonWrap}>
                        <FlexChild height={315} />
                    <ButtonEclipse text={"더 보러가기"} width={"100px"} backgroundColor={data.color} />
                    </div>
                </div>
                {newProducts ? newProducts.map((data, index) => (
                    <>

                        <FlexChild padding={"20px"}>
                            {/* <NormalProductCard data={data} /> */}
                        </FlexChild>
                    </>
                )) : null}
            </HorizontalFlex>
        </div>
    );
}

export default SeriesRow;