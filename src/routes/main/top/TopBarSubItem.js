import style from "./TopBar.module.css";
import NiceModal from "@ebay/nice-modal-react";
import { Link } from "react-router-dom";

function TopBarSubItem(props) {
    const { url } = props;

    const onClick = (e) => {
        e.stopPropagation();
        if (props.login) {
            NiceModal.show("memberSignIn");
        }
    }

    return (
        <>
            {
                url ?
                    <Link to={url} onClick={onClick}>
                        <div className={style.topBarSubItem}>
                            <div>
                                {props.image &&
                                    <img className={style.topBarSubItemFlag} src={props.image} alt="" />
                                }
                                <p className={style.topBarSubItemTitle}>
                                    {props.title}
                                </p>
                            </div>
                        </div>
                    </Link>
                    :
                    <div className={style.clickable} onClick={onClick}>
                        <div className={style.topBarSubItem}>
                            <div>
                                {props.image &&
                                    <img className={style.topBarSubItemFlag} src={props.image} alt="" />
                                }
                                <p className={style.topBarSubItemTitle}>
                                    {props.title}
                                </p>
                            </div>
                        </div>
                    </div>
            }
        </>

    )
}

export default TopBarSubItem;