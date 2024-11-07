import React, { useEffect, useRef, useState } from "react";
import style from "./StickySlideTab.module.scss";
import clsx from "classnames";
import $ from "jquery";
import Container from "layouts/container/Container";

function StickySlideTab(props) {
    const [currentId, setCurrentId] = useState();
    const [currentTab, setCurrentTab] = useState();
    const container = useRef();
    const tabContainerHeight = 70 ;
    const children = React.Children.toArray(props.children);

    useEffect(() => {
        let width = $(`.${style.tab}`).width();
        $(`.${style.slider}`).css('width', width);
        findCurrentTabSelector();
        $(window).scroll(() => { onScroll(); });
        // $(window).resize(() => { onResize(); });
        return () => {
            $(window).unbind("scroll");
        }
    }, []);

    const onScroll = () => {
        findCurrentTabSelector();
    }

    // const onResize = () => {
    //     let width = $(`.${style.tab}`).width();
    //     $(`.${style.slider}`).css('width', width);
    //     let left = currentTab.offset().left;
    
    //     $(`.${style.slider}`).css('left', left);
    //     findCurrentTabSelector();
    // }

    const onTabClick = (e, id) => {
        let scrollTo = $(`#${id}`).offset().top - tabContainerHeight + 1;
        $('html, body').animate({ scrollTop: scrollTo }, 0);
    }

    const findCurrentTabSelector = () => {
        let newCurrentId;
        let newCurrentTab;

        $(`.${style.tab}`).each(function () {
            let id = $(this).attr('href');
            let offsetTop = $(id).offset().top - tabContainerHeight;
            let offsetBottom = $(id).offset().top + $(id).height() - tabContainerHeight;
            if ($(window).scrollTop() > offsetTop && $(window).scrollTop() < offsetBottom) {
                newCurrentId = id;
                newCurrentTab = $(this);
            }
        });

        // if (newCurrentTab) {
        //     let left = newCurrentTab.offset().left;
        //     $(`.${style.slider}`).css('left', left);
        // }

        if (currentId != newCurrentId || currentId === null) {
            setCurrentId(newCurrentId);
            setCurrentTab(newCurrentTab);
        }
    }

    return (
        <div ref={container} className={style.wrap}>
            <div className={style.container}>
                <div className={style.tabControlWrap} style={{height:props.height?props.height : 40}}>
                    <div className={style.tabControl} style={{height:props.height?props.height : 40}}>
                        {
                            children.map((child, index) =>
                                <div key={index} className={clsx(style.tab, { [style.active]: currentId === `#${child.props.id}` })} href={`#${child.props.id}`} onClick={(e) => onTabClick(e, child.props.id)}>{child.props.render?child.props.render:child.props.title}</div>
                            )
                        }
                        {/* <span className={style.slider} style={{}}></span> */}
                    </div>
                </div>
                <Container maxWidth={1200}>
                    {
                        children.map((child, index) =>
                            <div key={index} className={style.slide} id={child.props.id}>
                                {child}
                            </div>
                        )
                    }
                </Container>
            </div>
        </div>
    );
}

export default StickySlideTab;