import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CircleWrapper from "layouts/wrapper/CircleWrapper";
import style from "./MobileMenuItem.module.css";

function MobileMenuItem(props) {
    const { data } = props;
    return (
        <div className={style.wrap}>
            <CircleWrapper backgroundColor={data.backgroundColor} borderColor={data.borderColor} maxWidth={"60px"}>
                <FontAwesomeIcon icon={fas[data.icon]} fontSize={"30px"} color={"var(--main-color)"}/>
            </CircleWrapper>
            <div className={style.titleArea}>
                <p>{data.title}</p>
            </div>
        </div>

    );
}

export default MobileMenuItem;