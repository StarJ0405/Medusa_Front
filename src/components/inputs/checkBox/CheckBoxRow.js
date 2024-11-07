import { useEffect, useState } from "react";
import style from "./CheckBoxRow.module.css"

function CheckBoxRow (props) {
   

    return(
        <div className={style.inputWrap}>
                <input type="checkBox" className={style.input}  />hello
            </div>
    );
}

export default CheckBoxRow;