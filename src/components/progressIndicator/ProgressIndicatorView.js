import FlexChild from "layouts/flex/FlexChild";
import VerticalFlex from "layouts/flex/VerticalFlex";
import { useEffect, useState } from "react";
import style from "./ProgressIndicatorView.module.css"

function ProgressIndicatorView(props) {
  const progressIndicatorView = props.children;
  const [currentTab, setCurrentTab] = useState(props.initTabIndex);

  useEffect(() => {
    if (props.onTabChange) {
      props.onTabChange(currentTab);
    }
  }, [currentTab]);

  return (
    <VerticalFlex>
      <FlexChild height={"auto"}>
        <div className={style.menuBar}>
          <ul className={style.tabs}>
            {progressIndicatorView.map((tabItem, index) => (
              <li key={index} className={`${currentTab === index ? style.active : ''}`} onClick={() => setCurrentTab(index)}>
                <div className={style.circle}>
                  <p>01</p>
                  <div className={style.border}></div>
                </div>
                
                <p>{progressIndicatorView[index].props.tabName}</p>
                <div className={style.bullet}></div>
              </li>
            ))}
          </ul>
        </div>
      </FlexChild>
      <FlexChild>
        <div className={style.contentArea}>
          {progressIndicatorView[currentTab]}
        </div>
      </FlexChild>
    </VerticalFlex>


  )
}

export default ProgressIndicatorView;