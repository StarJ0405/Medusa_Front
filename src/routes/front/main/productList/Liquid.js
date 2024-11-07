import { requester } from "App";
import clsx from "classnames";
import ProductCard from "components/card/product/ProductCard";
import P from "components/P";
import FlexChild from "layouts/flex/FlexChild";
import VerticalFlex from "layouts/flex/VerticalFlex";
import { useState } from "react";
import { useLocation, useOutletContext, useParams } from "react-router-dom";
import style from "./Liquid.module.css"
import { useEffect } from "react";
import CardList from "layouts/wrapper/CardList";
import Container from "layouts/container/Container";
import initialSearchCondition from "InitialData/InitialSearchCondition.json";
import { clone } from "shared/utils/Utils";

function Liquid() {
    const [products, setProducts] = useState();
    const { categoryId } = useParams();
    const { listData } = useOutletContext();

    useEffect(() => {
        let searchCondition = clone(initialSearchCondition);
        searchCondition.categories = [categoryId];
        // let data = { categoryId: categoryId }
        requester.searchProducts(searchCondition, (result) => {
            setProducts(result.data);
        });
    }, [categoryId]);
    useEffect(() => {
        setProducts(listData);
    },[])

    const Skeleton = () => {
        const skeletons = Array.from({ length: 8 });

        return (
            <>
                {skeletons.map((skeleton, index) =>
                    <div className={style.card} key={index}>
                        <ProductCard template={"normal"} skeleton />
                    </div>
                )}
            </>
        )
    }

    return (
        <Container maxWidth={1200}>
            
            {
                products &&

                <CardList data={products} template={"normal"} />

            }
        </Container>
    );
}

export default Liquid;