import { useEffect, useState, forwardRef, useImperativeHandle, useRef } from "react";
import style from "./CheckCircle.module.css";
import clsx from "classnames";
import { useTranslation } from "react-i18next";

const CheckCircle = forwardRef((props, ref) => {
    const { t } = useTranslation();
    const [isChecked, setChecked] = useState(false);
    const [isValid, setValid] = useState(true);
    const input = useRef();
    const [name, setName] = useState();

    useEffect(() => {
        if (props.checked) {
            setChecked(true);
        } else {
            setChecked(false);
        }
        
    }, [props.checked])

    useEffect(() => {
        if (props.callback) {
            props.callback(props.index, isChecked);
        }
    }, [isChecked]);

    const onChange = (e) => {
        if(props.readOnly){

        }else{
            if (e.target.checked === true) {
                setChecked(true);
            } else {
                setChecked(false);
            }
        }
        
    }
    useImperativeHandle(ref, () => ({
        isChecked() {
            return isChecked;
        },
        setChecked(value) {
            setChecked(value);
        },
        isIndexed() {
            return props.index;
        },
        getName() {
            return name;
        },
        getValue() {
            return isChecked;
        },
        setValue(value) {
            setChecked(value);
        },
        isValid() {
            return isValid;
        },
        focus() {
            input.current.scrollTo(0, input.current.offsetTop);
        }
    }))

    return (
        <div className={style.wrap}>
            <label className={style.checkbox} style={{backgroundColor: props.disabled && "#bbbbbb"}}>
                <input disabled={props.disabled ? props.disabled : null} type={"checkbox"} onChange={onChange} checked={isChecked} />
                <span ref={input} className={style.checkboxIcon} style={{width: props.width, height: props.height, cursor: props.disabled ? "default": "pointer"}} />
            </label>
            <span className={style.checkboxText} >
                <p className={style.label}>{props.label}</p>
            </span>
        </div>
    );
});

export default CheckCircle;