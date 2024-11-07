import style from "./TopBar.module.css";
import VerticalMiddleWrapper from "layouts/wrapper/VerticalMiddleWrapper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import clsx from "classnames";
import { useState } from "react";
import { OmitProps } from "antd/lib/transfer/ListBody";
import { Link, useNavigate } from "react-router-dom";

function TopBarItem(props) {
  const navigate = useNavigate();
  const [isSubListVisible, setSubListVisible] = useState(false);

  const onMouseOver = () => {
    setSubListVisible(true);
  };

  const onMouseLeave = () => {
    setSubListVisible(false);
  };

  const url = props.url ? props.url : "";

  const onClick = () => {
    navigate(url);
  }

  return (
    <li className={style.column} onClick={onClick}>
      <VerticalMiddleWrapper>
        <div className={style.topBarItem} onMouseOver={onMouseOver} onMouseLeave={onMouseLeave}>
          <span>
            {props.icon ? <FontAwesomeIcon icon={props.icon} /> : null}
            {props.image ? (
              <img className={style.topBarFlag} src={props.image} />
            ) : null}
            <p className={style.itemTitle}>{props.title}</p>
            {props.children ? (
              <FontAwesomeIcon icon={isSubListVisible ? faAngleUp : faAngleDown} />
            ) : null}
          </span>
          {props.children ? (
            <div className={clsx(style.subItemList, { [style.show]: isSubListVisible, })}>
              {props.children}
            </div>
          ) : null}
        </div>
      </VerticalMiddleWrapper>
    </li>
  );
}

export default TopBarItem;
