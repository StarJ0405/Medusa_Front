import P from "components/P";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import VerticalFlex from "layouts/flex/VerticalFlex";
import Center from "./Center";
import style from "./CardList.module.css";
import { ReactComponent as GridIcon } from "resources/img/icons/grid.svg";
import { ReactComponent as ListIcon } from "resources/img/icons/list.svg";
import ProductCard from "components/card/product/ProductCard";
import { useRef, useState } from "react";
import clsx from "classnames";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { useEffect } from "react";
import { BrowserDetectContext } from "providers/BrowserEventProvider";
import CategoryPanel from "routes/front/main/productList/CategoryPanel";
import { useTranslation } from "react-i18next";
import PaddingWrapper from "./PaddingWrapper";

function CardList(props) {
    const ref = useRef();
    const { t } = useTranslation();
    const [dummies, setDummies] = useState([]);
    const GALLERY = 0;
    const LIST = 1;
    const [currentType, setCurrentType] = useState(GALLERY);
    const { isMobile } = useContext(BrowserDetectContext);

    useEffect(() => {
        initDummies();
    }, []);

    const initDummies = () => {
        if (props.data) {
            // let cols = Math.floor(ref.current.offsetWidth / 200);
            let cols = 10;
            let lastRowCols = props.data.length % cols;
            let needs = cols - lastRowCols;
            let dummies = Array.from({ length: needs });
            setDummies(dummies);
        }
    }

    const onGalleryClick = () => {
        setCurrentType(GALLERY);
    }

    const onListClick = () => {
        setCurrentType(LIST);
    }

    useEffect(() => {
        initDummies();
    }, [props.data]);

    const Skeleton = () => {
        return (
            <>
                <div className={style.card}>
                    {
                        currentType === LIST ?
                            <ProductCard template={props.template} type={"horizontal"} skeleton />
                            : <ProductCard template={props.template} skeleton />
                    }
                </div>
                <div className={style.card}>
                    {
                        currentType === LIST ?
                            <ProductCard template={props.template} type={"horizontal"} skeleton />
                            : <ProductCard template={props.template} skeleton />
                    }
                </div>
                <div className={style.card}>
                    {
                        currentType === LIST ?
                            <ProductCard template={props.template} type={"horizontal"} skeleton />
                            : <ProductCard template={props.template} skeleton />
                    }
                </div>
                <div className={style.card}>
                    {
                        currentType === LIST ?
                            <ProductCard template={props.template} type={"horizontal"} skeleton />
                            : <ProductCard template={props.template} skeleton />
                    }
                </div>
            </>
        )
    }

    return (
        <div className={style.wrap} ref={ref}>
            <VerticalFlex gap={10}>
                <FlexChild>
                    <PaddingWrapper padding={"0px 10px"}>
                        <HorizontalFlex>
                            <FlexChild width={"fit-content"}>
                                <HorizontalFlex gap={10}>
                                    <FlexChild width={"fit-content"}>
                                        <P size={15} weight={800}>{props.title}</P>
                                    </FlexChild>
                                    <FlexChild width={25}>
                                        <img className={style.icon} src={props.headerIcon} alt={""} />
                                    </FlexChild>
                                </HorizontalFlex>
                            </FlexChild>
                            <FlexChild width={"fit-content"}>
                                <HorizontalFlex gap={5}>
                                    {
                                        props.viewType &&
                                        <>
                                            <FlexChild width={20}>
                                                <Center>
                                                    <GridIcon className={clsx(style.displayTypeIcon, { [style.active]: currentType === GALLERY })} onClick={onGalleryClick} />
                                                </Center>
                                            </FlexChild>
                                            <FlexChild width={20}>
                                                <Center>
                                                    <ListIcon className={clsx(style.displayTypeIcon, { [style.active]: currentType === LIST })} onClick={onListClick} />
                                                </Center>
                                            </FlexChild>
                                        </>
                                    }
                                </HorizontalFlex>
                            </FlexChild>
                        </HorizontalFlex>
                    </PaddingWrapper>
                </FlexChild>
                <FlexChild>
                    <div className={clsx(style.listWrap, { [style.list]: currentType === LIST }, { [style.mobile]: isMobile })}>
                        {
                            props.data ? props.data.map((product, index) =>
                                <div className={clsx(style.card, { [style.mobile]: isMobile })} key={index} >
                                    {
                                        currentType === LIST ?
                                            <ProductCard data={product} template={props.template} type={"horizontal"} />
                                            : <ProductCard data={product} template={props.template} />
                                    }
                                </div>
                            )
                                :
                                <Skeleton />
                        }
                        {
                            dummies && dummies.map((dummy, index) =>
                                <div className={style.card} key={index} style={{ flex: `1 1 min(200px, 40%)` }}>

                                </div>
                            )
                        }
                    </div>
                </FlexChild>
            </VerticalFlex>
        </div>
    );
}

export default CardList;