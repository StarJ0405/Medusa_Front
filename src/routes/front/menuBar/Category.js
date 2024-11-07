import { requester } from "App";
import NormalProductCard from "components/card/product/NormalProductCard";
import SpecialPriceCard from "components/card/product/SpecialPriceCard";
import P from "components/P";
import Container from "layouts/container/Container";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import VerticalFlex from "layouts/flex/VerticalFlex";
import { useEffect, useState } from "react";
import useAltEffect from "shared/hooks/useAltEffect";
import style from "./Category.module.css";
import SeriesRow from "./SeriesRow";
import heart from "resources/img/menuBar/brand/heart.png"
import show from "resources/img/menuBar/brand/show.png"
import vermont from "resources/img/menuBar/brand/vermont.png"
import Center from "layouts/wrapper/Center";
import Dummy from "components/Dummy";
import ProductSwiper from "components/ProductSwiper";

function Category () {
    const [newProducts, setNewProducts] = useState();
    const [brands, setBrands] = useState();

    
    

    const seriesData = [
        {
            id: 1,
            url: heart,
            color: "#ff562f",
        },
        {
            id: 2,
            url: show,
            color: "#ee2789",
        },
        {
            id: 3,
            url: vermont,
            color: "#c8a03a",
        },
    ]

    useAltEffect(() => {
        requester.getNewProducts( (result) => {
            setNewProducts(result.data);
        });
        requester.getAllBrands((result) => {
            setBrands(result.data);
        })
    }, [])
    


    return (
        <>
            {/* <VerticalFlex>
                <FlexChild>
                    <div className={style.banner} >
                        <Container width={1200} padding={15}>
                            <FlexChild height={40} />
                            <P size={"40px"} color={"white"} fontWeight={"bold"}>시리즈</P>
                            <P size={"18px"} color={"white"} fontWeight>내가 원하는 맛을 한번에!</P>
                        </Container>
                    </div>
                </FlexChild>
                
                <FlexChild>
                    {seriesData ? seriesData.map((data, index) => (
                        <SeriesRow data={data} />
                    )): null}
                    
                </FlexChild>
            </VerticalFlex> */}
            <Container width={1200} backgroundColor={"white"}>
            <VerticalFlex gap={30}>
                {
                    brands && brands.map((brand, index) =>
                        <FlexChild key={index} height={400}>
                            <HorizontalFlex>
                                {
                                    index % 2 === 0 ?
                                        <FlexChild width={"25%"}>
                                            <div className={style.brandWrap}>
                                                <img className={style.brandThumbnail} src={brand.image} />
                                                <div className={style.brandTitleArea}>
                                                    <div className={style.brandTitleBackground}>

                                                    </div>
                                                    <div className={style.brandTitleForeground}>
                                                        <Center>
                                                            <P size={"35px"} color={brand.color} weight={"bold"}>{brand.titleKr}</P>
                                                            <Dummy height={5}/>
                                                            <a className={style.moreButton} style={{ backgroundColor: brand.color }}>더 보러가기</a>
                                                        </Center>
                                                    </div>
                                                </div>
                                            </div>
                                        </FlexChild>
                                        :
                                        <FlexChild overflowX={"hidden"}>
                                            <div className={style.swiperWrap}>
                                                {
                                                    brand.children ? <ProductSwiper products={brand.children} cols={4} innerTemplate={"normal"} gap={20} navigation pagination /> : null
                                                }
                                            </div>
                                        </FlexChild>
                                }
                                {
                                    index % 2 === 0 ?
                                        <FlexChild overflowX={"hidden"}>
                                            <div className={style.swiperWrap}>
                                                {
                                                    brand.children ? <ProductSwiper products={brand.children} cols={4} innerTemplate={"normal"} gap={20} navigation pagination /> : null
                                                }
                                            </div>
                                        </FlexChild>
                                        :
                                        <FlexChild width={"25%"}>
                                            <div className={style.brandWrap}>
                                                <img className={style.brandThumbnail} src={brand.image} />
                                                <div className={style.brandTitleArea}>
                                                    <div className={style.brandTitleBackground}>

                                                    </div>
                                                    <div className={style.brandTitleForeground}>
                                                        <Center>
                                                            <P size={"35px"} color={brand.color} weight={"bold"}>{brand.titleKr}</P>
                                                            <Dummy height={5}/>
                                                            <a className={style.moreButton} style={{ backgroundColor: brand.color }}>더 보러가기</a>
                                                        </Center>
                                                    </div>
                                                </div>
                                            </div>
                                        </FlexChild>
                                }


                            </HorizontalFlex>

                            {/* <NormalProductCard data={product} /> */}
                        </FlexChild>)
                }
            </VerticalFlex>
            </Container>
        </>
    )
}

export default Category;