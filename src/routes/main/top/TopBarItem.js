import style from "./TopBar.module.css";
import VerticalMiddleWrapper from "layouts/wrapper/VerticalMiddleWrapper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import clsx from "classnames";
import { useState } from "react";
import { OmitProps } from "antd/lib/transfer/ListBody";
import { Link, useNavigate } from "react-router-dom";
import CustomIcon from "components/icons/CustomIcon";
import Inline from "layouts/container/Inline";
import Center from "layouts/wrapper/Center";
import { shoppingCart } from "react-icons-kit/feather/shoppingCart";
import Icon from "react-icons-kit";
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
    <li className={style.column} onClick={props.onClick ? props.onClick : onClick}>
      <VerticalMiddleWrapper>
        <div className={style.topBarItem} onMouseOver={onMouseOver} onMouseLeave={onMouseLeave}>
          <span>
            <Inline>
              {props.icon ? <FontAwesomeIcon color={props.color} icon={props.icon} /> : null}
              {props.image ? (
                <img className={style.topBarFlag} src={props.image} />
              ) : null}
              <p className={style.itemTitle} style={{ color: props.color }}>{props.title}</p>
              {props.children ? (
                <FontAwesomeIcon icon={isSubListVisible ? faAngleUp : faAngleDown} color={props.color} />
              ) : null}

            </Inline>
          </span>
          {props.children ? (
            <div className={clsx(style.subItemList, { [style.show]: isSubListVisible, })}>
              <div className={style.subItemWrap}>
                {props.children}
              </div>
            </div>
          ) : null}
        </div>
      </VerticalMiddleWrapper>
    </li>
  );
}

export default TopBarItem;
