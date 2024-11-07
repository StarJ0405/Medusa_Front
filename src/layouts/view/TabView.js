import FlexChild from "layouts/flex/FlexChild";
import VerticalFlex from "layouts/flex/VerticalFlex";
import { BrowserDetectContext } from "providers/BrowserEventProvider";
import { forwardRef, useContext, useEffect, useImperativeHandle, useState } from "react";
import style from "./TabView.module.css";
import clsx from "classnames";

const TabView = forwardRef((props, ref) => {
  const tabViewChildren = props.children;
  const [currentTab, setCurrentTab] = useState(props.initTabIndex);
  const { isMobile } = useContext(BrowserDetectContext);



  useEffect(() => {
    if (props.onTabChange) {
      props.onTabChange(currentTab);
    }

  }, [currentTab]);

  useImperativeHandle(ref, () => ({
    nextIndex() {
      return setCurrentTab(1);
    },
    setIndex(index) {
      return setCurrentTab(index);
    },
    getIndex() {
      return currentTab;
    }
  }));

const onNextClick = (index) => {
  setCurrentTab(index);
}


  return (
    <div className={style.container}>
      <VerticalFlex height={"100%"} overflow={"hidden"}>
        <FlexChild>
          {
            props.noneMenu
              ?
              null
              :
              props.table ?
                <div className={style.tableMenuBar} >
                  <ul className={style.tabs} >
                    {tabViewChildren.map((tabItem, index) => (
                      <li onClick={() => onNextClick(index)} key={index} data-index={index} className={clsx(style.tableLi , `${currentTab === index ? style.active : ''}`)}>
                        <div className={style.tableLine} >
                          <p style={{  whiteSpace: "nowrap" }}>{tabViewChildren[index].props.tabName}</p>
                        </div>
                      </li>
                    ))}
                    
                  </ul>
                </div>
                :
                <div className={style.menuBar}>
                  <ul className={style.tabs}>
                    {tabViewChildren.map((tabItem, index) => (
                      <li key={index} className={`${currentTab === index ? style.active : ''}`} >
                        <div className={style.circle} style={props.circleStyle && props.circleStyle}>
                          <p className={style.text}>0{index + 1}</p>
                        </div>
                        <div style={{ position: "relative" }}>
                          <p style={
                            props.textStyle 
                            ?
                            props.textStyle
                            :
                            { position: "absolute", left: "-7px", whiteSpace: "nowrap" }
                          }>{tabViewChildren[index].props.tabName}</p>
                        </div>

                      </li>
                    ))}
                    {/* <div className={isMobile ? style.mobileLine : style.line}></div> */}
                  </ul>
                </div>
          }
        </FlexChild>
        <FlexChild height={"90%"} overflowY={props.noneScroll ? null : "scroll"}>
          <div className={style.contentArea}>
            {tabViewChildren[currentTab]}
          </div>
        </FlexChild>
      </VerticalFlex>
    </div>



  )
})


export default TabView;