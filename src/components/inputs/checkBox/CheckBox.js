import Container from "layouts/container/Container";
import { useCallback, useEffect, useState } from "react";
import style from "./CheckBox.module.css"
import CheckBoxRow from "./CheckBoxRow";

function CheckBox() {
    const [checkedAll, setCheckedAll] = useState(false);
    const [checkedList, setCheckedList] = useState([]);

    const allChecked = (e) => {
        if(e){
            setCheckedList([...checkedList, e.target.checked])
        }
        
    }

    return (
        <Container width={1200}>
            <div className={style.inputWrap}>
                <input type="checkBox" className={style.input} onChange={allChecked} />전체선택
            </div>
            <CheckBoxRow />
            
        
        </Container>

    );
}

export default CheckBox;