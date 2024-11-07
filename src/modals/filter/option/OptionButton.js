import { useEffect, useState } from "react";
import style from "./OptionButton.module.css"
import clsx from "classnames"
import { getCurrentLanguageCode } from "shared/utils/Utils";



function OptionButton(props) {
    const { data } = props;
    const [isSelected, setSelected] = useState(false);

    const onClick = (e) => {
        if (isSelected === true) {
            setSelected(false);
        } else {
            setSelected(true);
        }
    }

    const callback = () => {
        if (props.callback) {
            props.callback(data.id, isSelected);
        }
    }

    useEffect(() => {
        callback(isSelected);
    }, [isSelected])


    return (
        <div className={style.wrap}>
            <p onClick={onClick} className={clsx(style.button, { [style.active]: isSelected })}>{data.title}</p>
        </div>
    );
}


export default OptionButton;