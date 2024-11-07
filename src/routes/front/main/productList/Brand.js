import { requester } from "App";
import clsx from "classnames";
import ProductCard from "components/card/product/ProductCard";
import P from "components/P";
import FlexChild from "layouts/flex/FlexChild";
import VerticalFlex from "layouts/flex/VerticalFlex";
import { useContext, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import style from "./Liquid.module.css"
import { useEffect } from "react";
import CardList from "layouts/wrapper/CardList";
import Container from "layouts/container/Container";
import { getCurrentLanguageCode } from "shared/utils/Utils";
import { BrowserDetectContext } from "providers/BrowserEventProvider";

function Brand() {
    const { brandId } = useParams();
    const [products, setProducts] = useState();
    const [brand, setBrand] = useState();
    const { isMobile } = useContext(BrowserDetectContext);

    useEffect(() => {
        let data = { id: brandId };
        requester.getBrand(data, (result) => {
            setBrand(result.data);
            setProducts(result.data.children);
        });
    }, [brandId]);

    const Card = (props) => {
        const { img, brand, productName, product } = props;
        return (
            <div style={{ display: "flex", flex: isMobile?"0 1 40%":"0 1 20%" }}>
                <ProductCard data={product} template={"normal"} />
            </div>
        );
    }

    return (
        <Container maxWidth={1200}>
            <VerticalFlex gap={30}>
                <FlexChild>
                    <P weight={"bold"} size={isMobile?20:"min(18pt, 2.2vw)"}>{brand && brand.title}</P>
                </FlexChild>
                <FlexChild>
                    {
                        products &&
                        <div style={{
                            display: "flex",
                            flexDirection: "row",
                            flexWrap: "wrap",
                            justifyContent: "center",
                            gap: "20px"
                        }}>
                            {
                                products &&
                                products.map((row, index) => (
                                    <Card img={row.image} brand={row.brandTitle} product={row}  productName={row.title} />
                                ))
                            }
                        </div>
                    }
                </FlexChild>
            </VerticalFlex>
        </Container>
    );
}

export default Brand;