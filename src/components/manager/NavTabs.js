import clsx from "clsx";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import React, { useContext, useEffect, useState } from "react";
import style from "./NavTabs.module.css";
import { Children } from "react";
import { BrowserDetectContext } from "providers/BrowserEventProvider";
import Dummy from "components/Dummy";

function NavTabs(props) {
    const { isMobile } = useContext(BrowserDetectContext);
    const [activeIndex, setActiveIndex] = useState(0);
    const { children, buttons, buttonVisible } = props;

    const onTabClick = (index) => {
        setActiveIndex(index);
    }

    useEffect(() => {
        if (props.onChange) {
            props.onChange(activeIndex);
        }
    }, [activeIndex]);

    const childrenWithProps = Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, { activeIndex: activeIndex, index: index });
        }
        return child;
    });

    return (
        <div className={style.container}>
            <div className={style.stickyTop}>
                <ul className="nav nav-tabs">
                    {
                        children.map((tab, index) =>
                            <li className="nav-item" key={index}>
                                <a className={clsx("nav-link", style.navLink, { ["active"]: activeIndex === index }, { [style.active]: activeIndex === index })} aria-current="page" onClick={() => onTabClick(index)}>{tab.props.title}</a>
                            </li>
                        )
                    }
                    {
                        !isMobile &&
                        <HorizontalFlex gap={10}>
                            <FlexChild></FlexChild>
                            {
                                buttons && buttons.map((button, index) =>
                                    <FlexChild width={"initial"} key={index}>{button}</FlexChild>
                                )
                            }
                        </HorizontalFlex>
                    }

                </ul>
            </div>
            <div className={style.contentArea}>
                {
                    childrenWithProps.map((child, index) =>
                        child
                    )
                }
                {/* {children[activeIndex]} */}
            </div>
            {
                isMobile &&
                <div className={clsx(style.bottom, {[style.show] : buttonVisible})}>
                    <HorizontalFlex gap={10}>
                        <FlexChild></FlexChild>
                        {
                            buttons && buttons.map((button, index) =>
                                <FlexChild width={"initial"} key={index}>{button}</FlexChild>
                            )
                        }
                    </HorizontalFlex>
                </div>
            }

        </div>
    );
}

export default NavTabs;