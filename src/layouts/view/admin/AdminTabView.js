import FlexChild from "layouts/flex/FlexChild";
import VerticalFlex from "layouts/flex/VerticalFlex";
import { BrowserDetectContext } from "providers/BrowserEventProvider";
import { forwardRef, useContext, useEffect, useImperativeHandle, useState } from "react";
import style from "./AdminTabView.module.css"

const AdminTabView = forwardRef((props, ref) => {
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

  return (
    <div className={style.container}>
      <VerticalFlex height={"100%"} overflow={"hidden"}>
        <FlexChild>
          {
            props.noneMenu
              ?
              null
              :
              <div className={style.menuBar}>
                <ul className={style.tabs}>
                  {tabViewChildren.map((tabItem, index) => (
                    <li key={index} className={`${currentTab === index ? style.active : ''}`} >
                      <div className={style.circle}>
                        <p className={style.text}>0{index + 1}</p>
                      </div>
                      <div style={{ position: "relative" }}>
                        <p style={{ position: "absolute", left: "-7px", whiteSpace: "nowrap" }}>{tabViewChildren[index].props.tabName}</p>
                      </div>

                    </li>
                  ))}
                  {/* <div className={isMobile ? style.mobileLine : style.line}></div> */}
                </ul>
              </div>
          }
        </FlexChild>
        <FlexChild height={"90%"} overflowY={"scroll"}>
          <div className={style.contentArea}>
            {tabViewChildren[currentTab]}
          </div>
        </FlexChild>
      </VerticalFlex>
    </div>



  )
})


export default AdminTabView;