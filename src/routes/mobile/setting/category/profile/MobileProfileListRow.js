import { faEarth } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import style from "./MobileProfileListRow.module.css"

function MobileProfileListRow(props) {
    const { row } = props;

    const { userName } = useSelector((state) => ({
        userName: state.auth.userName,
      }));


    return (
        <FlexChild>
            <div className={style.container}>
            <HorizontalFlex>
                <FlexChild>
                    <p className={style.list}>{row.list}</p>
                </FlexChild>
                {row.img ?
                    <FlexChild width={70}>
                        <div className={style.logoWrap}>
                            <div className={style.imgArea}>
                                <img src={row.img} />
                            </div>
                        </div>
                    </FlexChild> : null}
                {row.name ?
                    <FlexChild width={70}>
                        <p className={style.name}>{row.name}</p>
                    </FlexChild>
                : null}
                {row.class ? 
                    <FlexChild width={120}>
                        <p className={style.class}>{row.class}&nbsp;&nbsp;<FontAwesomeIcon icon={faEarth} size={"2x"} color={"orange"} /></p>
                    </FlexChild>
                : null}
                {row.account ?
                    <FlexChild width={150}>
                        <p className={style.account}>{userName}</p>
                    </FlexChild>
                : null}
                

            </HorizontalFlex>
            </div>
        </FlexChild>
    );
}

export default MobileProfileListRow;