import { useEffect, useState } from "react";
import style from "./Radio.module.css"

function Radio({ name, value, selectedValue, onCheckedChange }) {
    const isChecked = value === selectedValue;

    const onChange = () => {
        if (onCheckedChange) {
            onCheckedChange(value);
        }
    };

    return (
        <label className={style.radioButtionLabel}>
            <input
                className={style.radio}
                type="radio"
                name={name}
                value={value}
                onChange={onChange}
                checked={isChecked}
            />
            <div className={style.radioButton}></div>
        </label>
    );
}

export default Radio;