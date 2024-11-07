import { Link } from "react-router-dom";
import style from "./ChoiceCompanyRow.module.css"

function ChoiceCompanyRow(props) {
    const { data } = props;

    return (
        <Link to="/chat">
            <div className={style.wrap}>
                <div className={style.imgArea}>
                    <img src={data.img} />
                </div>
                <p className={style.text}>World International</p>
            </div>
        </Link>
    );
}

export default ChoiceCompanyRow;