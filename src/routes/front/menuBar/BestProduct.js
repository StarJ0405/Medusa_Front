import { requester } from "App";
import { BrowserDetectContext } from "providers/BrowserEventProvider";
import NormalProductCard from "components/card/product/NormalProductCard";
import SpecialPriceCard from "components/card/product/SpecialPriceCard";
import P from "components/P";
import Container from "layouts/container/Container";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import VerticalFlex from "layouts/flex/VerticalFlex";
import CardList from "layouts/wrapper/CardList";
import { useContext, useEffect, useState } from "react";
import useAltEffect from "shared/hooks/useAltEffect";
import style from "./BestProduct.module.css";
import bestProductBanner from "resources/img/urlBanner/bestProduct.png";
import CategoryPanel from "../main/productList/CategoryPanel";
import { useTranslation } from "react-i18next";
import MobileSearchBar from "components/MobileSearchBar";
import backgroundImg from "resources/img/best/background.png";
import fruit from "resources/img/best/fruit.png";
import liquid1 from "resources/img/best/liquid1.png";
import liquid2 from "resources/img/best/liquid2.png";
import liquid3 from "resources/img/best/liquid3.png";
import liquid4 from "resources/img/best/liquid4.png";
import { getCurrentLanguageCode } from "shared/utils/Utils";
import { useNavigate } from "react-router-dom";
import Center from "layouts/wrapper/Center";

function BestProduct() {
    const { isMobile } = useContext(BrowserDetectContext);
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [newProducts, setNewProducts] = useState();
    const [products, setProducts] = useState([]);

    useAltEffect(() => {
        // let data = { number: 6 };
        // requester.getNewProducts(data, (result) => {
        //     setNewProducts(result.data);
        // });

        requester.getAllProductCategories((result) => {
            // console.log(result.data);
            setProducts(result.data);
        })
    }, []);



    const Card = (props) => {

        const { img, brand, productName, id } = props;
        const onClick = () => {
            navigate(`/product/detail/${props.id}`);
        }

        return (
            <div onClick={onClick} style={{ display: "flex", flex: "0 1 20%" }}>
                <VerticalFlex flexStart>
                    <FlexChild>
                        <img src={img && img} width={"100%"} style={{ cursor: "pointer", borderRadius: "20px" }} />
                    </FlexChild>
                    <FlexChild>
                        <Center width={"90%"} >
                            <P ellipsis cursor weight={"bold"} size={"12pt"}>{brand && brand}</P>
                            <P ellipsis cursor size={"12pt"}>{productName && productName}</P>
                        </Center>
                    </FlexChild>
                </VerticalFlex>
            </div>
        );
    }


    return (
        <Container>
            <VerticalFlex gap={80}>
                {/* {isMobile &&
                    <FlexChild height={35}>
                        <div className={style.mobileSearchBar}>
                            <MobileSearchBar />
                        </div>
                    </FlexChild>
                } */}
                <FlexChild>
                    <div className={style.topBg} style={{ backgroundImage: `url(${backgroundImg})` }}>
                        <Container maxWidth={1200}>
                            <div style={{ position: "relative" }}>
                                <FlexChild>
                                    <P size={"52pt"} color={"white"}>BEST Flavor</P>
                                    <P color={"white"}>지금 제일 잘나가는 액상</P>
                                </FlexChild>
                                <div style={{ position: "absolute", top: "250px", left: "60%", transform: "translate(-50%, -50%)" }}>
                                    <img src={fruit} />
                                    <img src={liquid1} width={"100px"} />
                                    <img src={liquid2} width={"100px"} />
                                    <img src={liquid3} width={"100px"} />
                                    <img src={liquid4} width={"100px"} />
                                </div>
                            </div>
                        </Container>

                        {/* <img src={fruit} style={{ width: "max-content", position: "absolute", top: "70%", left: "38%", transform: "translate(-50%, -50%)" }} /> */}


                    </div>
                </FlexChild>
                <FlexChild maxWidth={1200} alignItems={"flex-start"}>

                    <div className={style.cardWrap}>
                        {
                            products &&
                            products.map((row, index) => {
                                return (row.children &&
                                    row.children.map((data, index) => {
                                        console.log(data);
                                        return (
                                            <Card id={data.id} img={data.image} brand={data.brandTitle} productName={data.title} />
                                        );
                                    }));
                            })
                        }
                    </div>
                </FlexChild>
            </VerticalFlex>
        </Container>
    );
}

export default BestProduct;