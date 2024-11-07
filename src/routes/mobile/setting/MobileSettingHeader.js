import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./MobileSettingHeader.module.css"

function MobileSettingHeader(props) {

    const onClickBack = () => {
        window.history.back();
    }
    return (
        <div className={style.header}>
            <p onClick={onClickBack}><FontAwesomeIcon icon={faArrowLeft} /></p>
            <p>{props.text ? props.text : "없음"}</p>
        </div>
    );
}

export default MobileSettingHeader;