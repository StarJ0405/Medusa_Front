import P from "components/P";
import style from "./MypageContentHeader.module.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

function MypageContentHeader(props) {
    const params = useParams();
    const fullPath = params["*"];
    const parts = fullPath.split('/');
    const lastPart = parts.pop();
    const { t } = useTranslation();
    const [mypageLocation, setMypageLocation] = useState();

    useEffect(() => {
        if (lastPart === "mypage") {

        } else {
            setMypageLocation(lastPart);
        }

    }, [params])
    return (
        <div className={style.wrap}>
            {
                mypageLocation &&

                <div className={style.titleWrap}>
                    <P size={"16pt"} weight={"bold"}>{t(mypageLocation && mypageLocation)}</P>
                </div>
            }

            {props.children}
        </div>
    );
}

export default MypageContentHeader;