import style from "./CssItem.module.css";
import { useState, useEffect } from "react";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import FlexChild from "layouts/flex/FlexChild";
import {ImportedColorSet} from "InitialData/colors.js";

function CssItem(props) {
    const [color, setColor] = useState(getComputedStyle(document.documentElement).getPropertyValue(props.name));
    const [name, setName] = useState(props.name);
    const [colorNo, setColorNo] = useState();
    const [colorOrder, setColorOrder] = useState();
    const [spectrum, setSpectrum] = useState();
    const [isChecked, setChecked] = useState(true);
    const [myColorSet, setMyColorSet] = useState();

    useEffect(()=>{
        
    }, [isChecked]);
    const onClickMyColor = () => {
        props.callback(name);
    }

    const handleCheck = (e) => {
        setChecked(!isChecked);
    }

    const onRandomPaletteClick = () => {
        let randomIndex = Math.floor(Math.random() * (ImportedColorSet.length));
        let paletteNo = randomIndex + 1;
        let randomSelectedPalette = ImportedColorSet[randomIndex];
        let code = randomSelectedPalette.code;
        let i = 0;
        let randomColorSet = new Array();
        while (i < 4) {
            let hex = code.substring(i * 6, i * 6 + 6);
            randomColorSet.push(hex);
            i++;
        }
        setMyColorSet(randomColorSet);
        let random = Math.floor(Math.random() * (randomColorSet.length));
        let orderNo = random + 1;
        setColor("#"+randomColorSet[random]);
        setColorNo(paletteNo);
        setColorOrder(orderNo);
    }

    const onRandomOrderClick = () => {
        let random = Math.floor(Math.random() * (myColorSet.length));
        let orderNo = random +1;
        setColor("#"+myColorSet[random]);
        setColorOrder(orderNo);
    }

    useEffect(() => {
        if(props.randomSelectedArray){
            props.randomSelectedArray.map( (row) => {
                if(row.name === name ){
                    if(isChecked){
                        setColor(row.color);
                        setColorNo(row.colorNo);
                        setColorOrder(row.colorOrder);
                    }
                }
            });
        }
        if (props.selectedItem === name) {
            if(isChecked){
            
            // if(props.color){
            setColor(props.selectedColor);
            setColorNo(props.colorNo);
            setColorOrder(props.colorOrder);
            setSpectrum(props.spectrum);
            }
            // }
        }
    }, [props]);

    useEffect(()=> {
        if(colorNo >= 0){
            let index = colorNo-1;
            let paletteNo = colorNo;
            let selectedPalette = ImportedColorSet[index];
            let code = selectedPalette.code;
            let i = 0;
            let colorSet = new Array();
            while (i < 4) {
                let hex = code.substring(i * 6, i * 6 + 6);
                colorSet.push(hex);
                i++;
            }
            setMyColorSet(colorSet);
        }
        
    }, [colorNo]);

    useEffect(() => {
        document.documentElement.style.setProperty(name, color);
    }, [color]);

    return (
        <HorizontalFlex>
            <FlexChild width={230}>
                <p>{name}</p>
            </FlexChild>
            <FlexChild width={80}>
                {
                    colorNo
                        ? <p>({colorNo}{","}{colorOrder})</p>
                        : null
                }

            </FlexChild>
            <FlexChild width={40}>
                <div className={style.colorBlock} style={{ backgroundColor: color }} onClick={onClickMyColor}></div>
            </FlexChild>
            <FlexChild width={40}>
                <input type="checkbox" checked={isChecked} onChange={handleCheck}/>
            </FlexChild>
            <FlexChild width={30}>
                <a className={style.button} onClick={onRandomPaletteClick}>P</a>
            </FlexChild>
            <FlexChild width={30}>
                <a className={style.button} onClick={onRandomOrderClick}>O</a>
            </FlexChild>
            <FlexChild>
                <p>{color}</p>
                {
                    spectrum
                        ? <p> ({spectrum})</p>
                        : null
                }

            </FlexChild>
        </HorizontalFlex>
    )
}

export default CssItem;