import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Dummy from "components/Dummy";
import P from "components/P";
import ProductSwiper from "components/ProductSwiper";
import Inline from "layouts/container/Inline";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import VerticalFlex from "layouts/flex/VerticalFlex";
import { useEffect, useRef, useTransition } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import Center from "./Center";
import style from "./DealWrapper.module.css";
import ProductCard from "components/card/product/ProductCard";
import PaddingWrapper from "./PaddingWrapper";

function DealWrapper(props) {
    const mobileRef = useRef();
    const desktopRef = useRef();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { title, content, head, tail, url, backgroundStart, backgroundEnd, backgroundDegree, mobile, products, template } = props;

    const onMoreClick = () => {
        navigate(url);
    }

    const Header = () => {
        return (
            <div className={style.flag} style={{ backgroundImage: `linear-gradient(${backgroundDegree}deg, ${backgroundStart}, ${backgroundEnd})` }}>
                <P color={"white"} size={"50px"} weight={"bold"}>{title}</P>
                <Dummy height={25} />
                <P color={"white"} size={"16px"} weight={500}>{content}</P>
                <Dummy height={25} />
                <Center>
                    <a className={style.tranparentText} onClick={onMoreClick}>{t("more")}</a>
                </Center>
                <Dummy height={25} />
            </div>
        );
    }

    return (
        <div className={style.wrap} style={{ borderTop: mobile ? "none" : `2px solid ${backgroundStart}`, borderBottom: mobile ? "none" : `2px solid ${backgroundEnd}` }}>
            {
                mobile ?
                    <div style={{ backgroundImage: `linear-gradient(${backgroundDegree}deg, ${backgroundStart}, ${backgroundEnd})` }}>
                        <VerticalFlex>
                            <FlexChild height={"initial"}>
                                <HorizontalFlex justifyContent={"flex-start"} padding={10} gap={10}>
                                    <FlexChild width={"initial"}>
                                        <P color={"white"} size={20} weight={"bold"}>{title}</P>
                                    </FlexChild>
                                    <FlexChild width={"initial"}>
                                        <Link to={url} >
                                            <FontAwesomeIcon icon={fas["faArrowRight"]} color={"white"} />
                                        </Link>
                                    </FlexChild>
                                </HorizontalFlex>
                            </FlexChild>
                            <FlexChild >
                                <div ref={mobileRef}>
                                    <HorizontalFlex>
                                        {products &&
                                            products.slice(0, mobileRef.current ? Math.floor(mobileRef.current.offsetWidth / 150) : null).map((product, index) =>
                                                <FlexChild key={index}>
                                                    <ProductCard data={product} template={template} />
                                                </FlexChild>
                                            )
                                        }
                                    </HorizontalFlex>
                                </div>
                            </FlexChild>
                        </VerticalFlex>
                    </div>
                    :
                    <HorizontalFlex backgroundColor={"white"}>
                        {head &&
                            <FlexChild width={"initial"}>
                                <Header />
                            </FlexChild>
                        }
                        <FlexChild backgroundColor={"white"}>
                            <div ref={desktopRef}>
                                <HorizontalFlex>
                                    {products &&
                                        products.slice(0, desktopRef.current ? Math.floor((desktopRef.current.offsetWidth) / 150) : null).map((product, index) =>
                                            <FlexChild key={index}>
                                                <ProductCard data={product} template={template} border={mobile ? null : "1px solid #ddd"} />
                                            </FlexChild>
                                        )
                                    }
                                </HorizontalFlex>
                            </div>
                        </FlexChild>
                        {tail &&
                            <FlexChild width={"initial"}>
                                <Header />
                            </FlexChild>}
                    </HorizontalFlex>
            }
        </div>
    );
}

export default DealWrapper;