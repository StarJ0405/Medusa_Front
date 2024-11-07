import style from "./Home.module.css";
import FlexChild from "layouts/flex/FlexChild";
import VerticalFlex from "layouts/flex/VerticalFlex";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import { rpad2D, decode, getLocalStorage, getCurrentLanguageCode, clone } from "shared/utils/Utils";
import PaddingWrapper from "layouts/wrapper/PaddingWrapper";
import { requester, medusaRequester } from "App";
import { BrowserDetectContext } from "providers/BrowserEventProvider";
import { useState, useEffect, useContext, useRef } from "react";
import useAltEffect from "shared/hooks/useAltEffect";
import BannerSwiper from "routes/front/main/BannerSwiper";
import FlagWrapper from "layouts/wrapper/FlagWrapper";
import SuperDealCard from "components/card/product/SuperDealCard";
import NormalProductCard from "components/card/product/NormalProductCard";
import findByAll from "resources/img/icons/findByAll.png";
import findByBrand from "resources/img/icons/findByBrand.png";
import P from "components/P";
import SquareWrapper from "layouts/wrapper/SquareWrapper";
import Center from "layouts/wrapper/Center";
import ProductSwiper from "components/ProductSwiper";
import crowm from "resources/img/icons/crown.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, fas } from "@fortawesome/free-solid-svg-icons";
import crown from "resources/img/icons/crown.png";
import CardList from "layouts/wrapper/CardList";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import ContentLoader from "react-content-loader"
import SkeletonText from "components/skeleton/SkeletonText";
import SkeletonImage from "components/skeleton/SkeletonImage";
import { useTranslation } from "react-i18next";
// /import MobileSearchBar from "components/MobileSearchBar";
import initialSearchCondition from "InitialData/InitialSearchCondition.json";
import DealWrapper from "layouts/wrapper/DealWrapper";
import Container from "layouts/container/Container";
import DesktopHomeUserAccount from "./DesktopHomeUserAccount";
import NiceModal from "@ebay/nice-modal-react";
import clsx from "clsx";
import { AuthContext } from "providers/AuthProvider";
import { setLocalStorage } from "shared/utils/Utils";
import { CButton } from "@coreui/react";
import CustomButton from "components/buttons/CustomButton";
import slide1 from "resources/img/main/banner/mainBanner_7.png";
import slide2 from "resources/img/main/banner/mainBanner_1.png";
import slide3 from "resources/img/main/banner/mainBanner_2.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import ProductCard from "components/card/product/ProductCard";
import banner from "resources/img/logo/worldvape_banner.jpg";
import banner2 from "resources/img/logo/worldvape_banner2.jpg";
import banner3 from "resources/img/logo/worldvape_banner3.jpg";
import Inline from "layouts/container/Inline";
import Dummy from "components/Dummy";
import ProgressbarSwiper from "components/swiper/ProgressBarSwiper";
import NewProductSwiper from "components/swiper/NewProductSwiper";
import Flex from "layouts/flex/Flex";
import MockItem from "./MockItem";
import { globalProducts } from "InitialData/Items";
import { HistoryReducer } from "shared/redux/reducers/history/HistoryReducer";
import { useDispatch } from "react-redux";
import WeeklyBestSeller from "components/swiper/WeeklyBestSeller";
import AnimatedSwitch from "components/AnimatedSwitch";

function Home() {
    const { isMobile } = useContext(BrowserDetectContext);
    const { userName } = useContext(AuthContext);
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [restockSlide, setRestockSlide] = useState([]);
    const [medusaRestock, setMedusaRestock] = useState([]);
    const [medusaRestockSlide, setMedusaRestockSlide] = useState([]);
    const [bestProducts, setBestProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const preventRef = useRef(true);
    const obsRef = useRef(null);
    const [page, setPage] = useState(1);
    const pageRef = useRef(1);

    const [medusaProducts, setMedusaProducts] = useState([]);

    useEffect(() => {
        const observer = new IntersectionObserver(obsHandler, { threshold: 0.5 });
        if (obsRef.current) {
            observer.observe(obsRef.current);
        }

        return () => {
            observer.disconnect();
        }
    }, []);

    const search = (page) => {
        let data = { page: page ? page : 0, pageSize: 10 };
        console.log("search", data);
        requester.searchProductsPage(data, (result) => {
            setProducts((prevData) => [...prevData, ...result.data]);
            setPage((prevPage) => prevPage + 1);
        });
    }

    useEffect(() => {
        pageRef.current = page;
    }, [page]);

    const obsHandler = (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
            console.log("obsHandler", pageRef.current);
            search(pageRef.current);
        }
    };


    // const obsHandler = ((entries) => {
    //     const target = entries[0];
    //     if (target.isIntersecting && preventRef.current) {
    //         search();
    //         preventRef.current = false;
    //         setPage(prev => prev + 1);
    //     }
    // });

    useEffect(() => {
        console.log("reStockSlide : ", restockSlide)
    }, [restockSlide])

    useEffect(() => {
        requester.getRestockProducts((result) => {
            setRestockSlide(rpad2D(result.data, isMobile ? 2 : 5, null));
        });

        requester.getBestProducts((result) => {
            setBestProducts(result.data);
        });

        if (getLocalStorage("audltYn")) {

        } else {
            // NiceModal.show("warning");
        }
    }, [isMobile]);

    useEffect(() => {
        let data = "";
        medusaRequester.getAllProducts(data, (result) => {
            setMedusaProducts(result.products)
        })
    }, [])

    useEffect(() => {
        let data = "RESTOCK";
        medusaRequester.getDiscountsProducts(data, (result) => {
            setMedusaRestockSlide(result.products)
        })
    }, [])

    useEffect(() => {
        if (medusaRestockSlide.length > 0 && medusaRestockSlide[0].rule) {
            setMedusaRestock(medusaRestockSlide[0].rule.conditions[0].products)
        }
    }, [medusaRestockSlide])

    useEffect(() => {
        // console.log("###################### medusaProducts 잘 받아오냐? ", medusaProducts)
        // console.log("@@@@@@@@@@@@@@@@@@@@@@ 기존 products 구조는 어떻게 생겼냐? ", products)
    }, [medusaProducts, products])

    return (
        <Container>
            {/* <Container maxWidth={1200} > */}
            <VerticalFlex gap={isMobile ? 30 : 60} padding={isMobile ? 0 : "0px 10px"}>
                <FlexChild>
                    <Container maxWidth={1200} >
                        <BannerSwiper slides={[{ image: banner, to: "productList/brand/10066" }, { image: banner2, to: "productList/brand/10071" }, { image: banner3, to: "productList/brand/10072" }]} />
                    </Container>
                </FlexChild>
                <FlexChild backgroundColor={"var(--main-color-light)"} padding={"30px 0px"}>
                    <Container maxWidth={1200} >
                        <VerticalFlex gap={20} >
                            <FlexChild alignItems={"flex-start"} padding={"0px 10px"}>
                                <P size={15} weight={800}>{"새로나온 액상을 확인해보세요"}</P>
                            </FlexChild>
                            <FlexChild>
                                <NewProductSwiper />
                            </FlexChild>
                        </VerticalFlex>
                    </Container>
                </FlexChild>
                <FlexChild >
                    <Container maxWidth={1200} >
                        <VerticalFlex>
                            <FlexChild padding={"0px 10px"}>
                                <Center width={"100%"} textAlign={"left"}>
                                    <P size={15} weight={"bold"}>재입고 된 액상</P>
                                </Center>
                            </FlexChild>
                            <FlexChild padding={10}>
                                {
                                    isMobile
                                        ?
                                        <ProgressbarSwiper totalSlides={medusaRestock.length}>
                                            {
                                                medusaRestock && medusaRestock.length > 0 && medusaRestock.map((slide, index) =>
                                                    <SwiperSlide key={index}>
                                                        <HorizontalFlex gap={10}>
                                                            {
                                                                slide.variants && slide.variants.map((product, index2) =>
                                                                    <FlexChild
                                                                        key={index2}
                                                                        padding={10}>
                                                                        {
                                                                            <ProductCard
                                                                                data={product}
                                                                                template={"normal"} />
                                                                        }
                                                                        {/* <MockItem index={41} /> */}
                                                                    </FlexChild>)
                                                            }

                                                            {/* <Dummy height={"20px"} event /> */}
                                                        </HorizontalFlex >
                                                    </SwiperSlide>
                                                )
                                            }
                                        </ProgressbarSwiper>
                                        :
                                        <div style={{ position: "relative" }}>
                                            <ProgressbarSwiper totalSlides={medusaRestock.length}>
                                                {
                                                    medusaRestock && medusaRestock.length > 0 && medusaRestock.map((slide, index) =>
                                                        <SwiperSlide key={index}>
                                                            <HorizontalFlex gap={10}>
                                                                {
                                                                    slide.variants && slide.variants.map((product, index2) =>
                                                                        <FlexChild
                                                                            key={index2}
                                                                            padding={10}>
                                                                            {
                                                                                <ProductCard
                                                                                    data={product}
                                                                                    template={"normal"} />
                                                                            }
                                                                            {/* <MockItem index={41} /> */}
                                                                        </FlexChild>)
                                                                }

                                                                {/* <Dummy height={"20px"} event /> */}
                                                            </HorizontalFlex >
                                                        </SwiperSlide>
                                                    )
                                                }
                                            </ProgressbarSwiper>
                                        </div>
                                }
                            </FlexChild>
                        </VerticalFlex>
                    </Container>
                </FlexChild>
                <FlexChild backgroundColor={"var(--main-color-light)"} padding={"30px 0px"}>
                    <Container maxWidth={1200} >
                        <WeeklyBestSeller />
                    </Container>
                </FlexChild>
                {/* <FlexChild>
                        <DealWrapper title={t("brand")} content={t("todaySpecialPrice")} products={newProducts} url={"/productList/brand"} backgroundStart={"#e62e2e"} backgroundEnd={"#b400ff"} backgroundDegree={130} head mobile={isMobile} template={"superDeal"} />
                    </FlexChild>
                    <FlexChild>
                        <DealWrapper title={t("newProduct")} content={t("meetNewAndLiquid")} products={newProducts} url={"/productList/newProduct"} backgroundStart={"#62e0f3"} backgroundEnd={"#ffd800"} backgroundDegree={130} tail mobile={isMobile} template={"newProduct"} />
                    </FlexChild> */}
                <FlexChild>
                    <Container maxWidth={1200} >
                        {/* <CardList title={t("best")} headerIcon={crown} data={bestProducts} template={"normal"} /> */}
                    </Container>
                </FlexChild>
                <FlexChild>
                    <Container maxWidth={1200} >
                        {/* 기존 */}
                        {/* <CardList title={"전체상품"} data={products} template={"normal"} /> */}
                        {/* 메두사 */}
                        {medusaProducts && medusaProducts.length > 0 &&
                            <CardList title={"전체상품"} data={medusaProducts} template={"normal"} />
                        }
                    </Container>
                </FlexChild>
                <FlexChild>
                    <div ref={obsRef}></div>
                </FlexChild>
            </VerticalFlex>
            {/* </Container> */}
        </Container >
    );
}

export default Home;