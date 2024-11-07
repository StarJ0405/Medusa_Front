import HorizontalFlex from "layouts/flex/HorizontalFlex";
import { Link } from "react-router-dom";
import style from "./MobileSettingListRow.module.css"

function MobileSettingListRow(props) {
    const { row } = props;
    return (
        <Link to={row.url}>
            <HorizontalFlex>
                <p className={style.list}>{row.list}</p>

                <p className={style.listOption}>{row.nation ? row.nation : null}
                    {row.fiatCurrency ? row.fiatCurrency : null}
                    {row.language ? row.language : null}
                    {row.version ? row.version : null}
                </p>
            </HorizontalFlex>
        </Link>

    );
}

export default MobileSettingListRow;