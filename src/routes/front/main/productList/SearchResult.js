import FlexChild from "layouts/flex/FlexChild";
import VerticalFlex from "layouts/flex/VerticalFlex";
import style from "./SearchResult.module.css";
import useAltEffect from "shared/hooks/useAltEffect";
import { requester, medusaRequester } from "App";
import CardList from "layouts/wrapper/CardList";
import { useState, useEffect, useRef, useContext } from "react";
import { Outlet, useLocation, useParams } from "react-router-dom";
import PaddingWrapper from "layouts/wrapper/PaddingWrapper";
import NiceModal from "@ebay/nice-modal-react";
import initialSearchCondition from "InitialData/InitialSearchCondition.json";
import { clone, isEqual } from "shared/utils/Utils";
import _ from "lodash";
import Container from "layouts/container/Container";
import UrlBanner from "components/UrlBanner";
import banner from "resources/img/urlBanner/event.png";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import CategoryPanel from "./CategoryPanel";
import { BrowserDetectContext } from "providers/BrowserEventProvider";
import { useTranslation } from "react-i18next";
import Center from "layouts/wrapper/Center";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import P from "components/P";
import MenuBar from "routes/front/menuBar/MenuBar";
import { useDispatch } from "react-redux";
import { WishReducer } from "shared/redux/reducers/shopping/WishReducer";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import AnimatedSwitch from "components/AnimatedSwitch";

function SearchResult(props) {
    const { isMobile } = useContext(BrowserDetectContext);
    const { t } = useTranslation();
    const [page, setPage] = useState(1);
    const preventRef = useRef(true);
    const obsRef = useRef(null);
    const [list, setList] = useState();
    const [medusaProducts, setMedusaProducts] = useState();
    const [currentSearchCondition, setCurrentSearchCondition] = useState();
    const [filterCondition, setFilterCondition] = useState();
    const { categoryId } = useParams();
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        const observer = new IntersectionObserver(obsHandler, { threshold: 0.5 });
        if (obsRef.current) {
            observer.observe(obsRef.current);
        }

        return () => {
            observer.disconnect();
        }
    }, []);

    const search = (searchCondition) => {
        requester.searchProducts(searchCondition, (result) => {
            setList(result.data);
            requester.getProductWishes((result) => {
                if (result.code === 0) {
                    dispatch(WishReducer.actions.refreshProducts(result.data));
                }
            })
        });
    }

    useEffect(() => {
        // let data = { number: 6 };
        // requester.getNewProducts(data, (result) => {
        //     setList(prev => [...prev, ...result.data]); //리스트 추가
        //     preventRef.current = true;
        // });
    }, [page]);

    useEffect(() => {
        if (location) {
            let searchCondition;
            if (location.state) {
                if (location.state.productSearchCondition) {
                    //전체보기 또는 검색 모달에서 검색한 경우
                    searchCondition = location.state.productSearchCondition;
                    search(searchCondition);
                } else {
                    //예상치 못한 경우
                    searchCondition = initialSearchCondition;
                }
            } else {
                //url로 직접 접근한 경우
                searchCondition = initialSearchCondition;
            }
            // setCurrentSearchCondition(searchCondition);
        }
    }, [location]);

    // useEffect(() => {
    //     if (categoryId) {
    //         let searchCondition = clone(initialSearchCondition);
    //         if (categoryId === "all") {

    //         } else {
    //             searchCondition.categories = [categoryId];

    //         }
    //         requester.searchProducts(searchCondition, (result) => {
    //             setList(result.data);
    //         });
    //     }
    // }, [categoryId]);

    const obsHandler = ((entries) => {
        const target = entries[0];
        if (target.isIntersecting && preventRef.current) {
            preventRef.current = false;
            setPage(prev => prev + 1);
        }
    });

    const onFilterClose = (filter) => {
        let searchCondition = clone(initialSearchCondition);
        searchCondition.categories = filter.categories;
        searchCondition.brands = filter.brands;
        search(searchCondition);
    }

    useEffect(() => {
        if (!isEqual(filterCondition, currentSearchCondition)) {
            // setCurrentSearchCondition(filterCondition);
        }
    }, [filterCondition]);

    useEffect(() => {
        if (currentSearchCondition) {
            console.log("search", currentSearchCondition);
            search(currentSearchCondition);
        }
    }, [currentSearchCondition]);

    // ------------------------------------------medusa------------------------------
    useEffect(() => {
        let data = "";
        medusaRequester.getAllProducts(data, (result) => {
            setMedusaProducts(result.products)
            console.log("medusa 통신 result : ", result)
        })
    }, [])

    useEffect(() => {
        if (categoryId) {
            let searchCondition = clone(initialSearchCondition);
            if (categoryId === "all") {

            } else {
                searchCondition.categories = [categoryId];

            }
            console.log("searchCondition 형태 뭐야 : ", searchCondition)
            medusaRequester.getCategoryProductById(searchCondition.categories[0], (result) => {
                console.log("카테고리 아이디로 가져온거 : ", result)
                setList(result.product_category.products);
            });
        }
    }, [categoryId]);

    useEffect(() => {
        console.log("list : ", list)
    }, [list])
    // ------------------------------------------medusa------------------------------

    const filterClick = () => {
        NiceModal.show("filter", { maxWidth: "500px", height: "initial", currentList: list, onClose: onFilterClose });
    }

    return (
        <Container>
            <div>
                {
                    isMobile && <MenuBar />
                }

                <VerticalFlex gap={10}>
                    <FlexChild maxWidth={1200} alignItems={"flex-start"}>
                        <HorizontalFlex alignItems={"flex-start"} gap={10}>
                            {
                                !isMobile &&
                                <FlexChild width={"280px"} padding={"0px 0px"}>
                                    <CategoryPanel />
                                </FlexChild>
                            }
                            <FlexChild maxWidth={1200}>
                                <VerticalFlex>
                                    <FlexChild height={10}></FlexChild>
                                    {/* <FlexChild alignItems={"flex-start"}>
                                        <div className={style.filter} onClick={filterClick}>
                                            <HorizontalFlex>
                                                <FlexChild width={"initial"}>
                                                    <Center>
                                                        <FontAwesomeIcon color="white" icon={fas["faSlidersH"]} fontSize={14} />
                                                    </Center>
                                                </FlexChild>
                                                <FlexChild>
                                                    <Center>
                                                        <P color={"white"} size={15}>{"필터"}</P>
                                                    </Center>
                                                </FlexChild>
                                            </HorizontalFlex>
                                        </div>
                                    </FlexChild> */}
                                    <FlexChild>
                                        <AnimatedSwitch animationClass={"fade"}>
                                            <CardList data={categoryId === "all" ? medusaProducts : list} template={"normal"} />
                                        </AnimatedSwitch>
                                    </FlexChild>
                                </VerticalFlex>
                            </FlexChild>

                        </HorizontalFlex>
                    </FlexChild>
                    <FlexChild>
                        <div ref={obsRef}></div>
                    </FlexChild>
                </VerticalFlex>
            </div>
        </Container>
    );
}

export default SearchResult;