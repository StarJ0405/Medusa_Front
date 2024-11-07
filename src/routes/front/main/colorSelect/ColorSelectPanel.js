import {ImportedColorSet} from "InitialData/colors.js";
import FlexChild from "layouts/flex/FlexChild";
import VerticalFlex from "layouts/flex/VerticalFlex";
import ColorCard from "./ColorCard";
import style from "./ColorSelectPanel.module.css";
import { useEffect, useState } from "react";
import PaddingWrapper from "layouts/wrapper/PaddingWrapper";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import CssItem from "./CssItem";
import * as ColorUtils from "shared/ColorUtils";
import cssVariables from "InitialData/CssVariables.json";

function ColorSelectPanel() {

    const [selectedCssItem, setSelectedCssItem] = useState();
    const [selectedColor, setSelectedColor] = useState();
    const [colorNo, setColorNo] = useState();
    const [colorOrder, setColorOrder] = useState();
    const [colorArray, setColorArray] = useState();
    const [spectrum, setSpectrum] = useState();
    const [spectrumOrder, setSpectrumOrder] = useState();
    const [randomSelectedArray, setRandomSelectedArray] = useState();
    const [randomSelectedColorSet, setRandomSelectedColorSet] = useState();

    const callbackCssItem = (name) => {
        setSelectedCssItem(name);
    }

    const callbackPalette = (type, colorSetNo, colorOrderNo, colors, color) => {
        if (type === "colors") {
            selectRandomArray(colors, colorSetNo);
        } else if (type === "color") {
            setSpectrum(ColorUtils.generateSpectrum(color, 10));
            setSelectedColor(color);
            setSpectrumOrder();
            setColorNo(colorSetNo);
            setColorOrder(colorOrderNo);
        }
    }

    const onSpectrumClick = (e) => {
        setSpectrumOrder(e.target.getAttribute("color"));
        setSelectedColor(e.target.getAttribute("color"));
    }

    useEffect(() => {
        let tempColorArray = new Array();
        ImportedColorSet.map((colorSet) => {
            let code = colorSet.code;
            let i = 0;
            let set = new Array();
            while (i < 4) {
                let hex = code.substring(i * 6, i * 6 + 6);
                set.push(hex);
                i++;
            }
            tempColorArray.push(set);
        });

        setColorArray(tempColorArray);

    }, []);



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
        selectRandomArray(randomColorSet, paletteNo);
        setRandomSelectedColorSet(randomIndex);
    }

    const onRandomOrderClick = () => {
        let randomIndex = randomSelectedColorSet;
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

        selectRandomArray(randomColorSet, paletteNo);
    }

    const onRandomAllClick = () => {
        let tempArray = new Array();
        cssVariables.map((cssItem) => {
                let randomIndex = Math.floor(Math.random() * (ImportedColorSet.length));
                let palletNo = randomIndex + 1;
                let randomSelectedPalette = ImportedColorSet[randomIndex];
                let code = randomSelectedPalette.code;
                let i = 0;
                let randomColorSet = new Array();
                while (i < 4) {
                    let hex = code.substring(i * 6, i * 6 + 6);
                    randomColorSet.push(hex);
                    i++;
                }

                let random = Math.floor(Math.random() * (randomColorSet.length));

                setSelectedColor("#" + randomColorSet[random]);
                setColorNo(palletNo);
                setColorOrder(random + 1);
                setSelectedCssItem(cssItem.name);
                let tempRow = {
                    name: cssItem.name,
                    color: "#" + randomColorSet[random],
                    colorNo: palletNo,
                    colorOrder: random + 1
                }
                tempArray.push(tempRow);
        });
        setRandomSelectedArray(tempArray);
    }

    const selectRandomArray = (randomColorSet, paletteNo) => {
        let tempArray = new Array();
        cssVariables.map((cssItem) => {
                let random = Math.floor(Math.random() * (randomColorSet.length));

                setSelectedColor("#" + randomColorSet[random]);
                setColorNo(paletteNo);
                setColorOrder(random + 1);
                setSelectedCssItem(cssItem.name);
                let tempRow = {
                    name: cssItem.name,
                    color: "#" + randomColorSet[random],
                    colorNo: paletteNo,
                    colorOrder: random + 1
                }
                tempArray.push(tempRow);
        });
        setRandomSelectedArray(tempArray);
    }

    return (
        <div className={style.wrapper}>
            <VerticalFlex>
                <FlexChild>
                    <HorizontalFlex>
                        <FlexChild>
                            <div>
                                <div className={style.inline}>
                                    <a className={style.button} onClick={onRandomPaletteClick}>randomPalette</a>
                                    <a className={style.button} onClick={onRandomOrderClick}>randomOrder</a>
                                    <a className={style.button} onClick={onRandomAllClick}>randomAll</a>
                                </div>

                            </div>
                        </FlexChild>

                        <FlexChild>
                            <HorizontalFlex>
                                {
                                    spectrum ?
                                        spectrum.map((color, index) => <FlexChild key={index}><div className={style.generatedSpectrum} color={color} onClick={onSpectrumClick} style={{ backgroundColor: color }}></div></FlexChild>)
                                        : null
                                }
                            </HorizontalFlex>

                        </FlexChild>
                    </HorizontalFlex>

                </FlexChild>
                {
                    cssVariables.map((variable, index) =>
                        <FlexChild key={index} height={30}>
                            <CssItem
                                name={variable.name}
                                callback={callbackCssItem}
                                selectedItem={selectedCssItem}
                                selectedColor={selectedColor}
                                colorNo={colorNo}
                                colorOrder={colorOrder}
                                spectrum={spectrumOrder}
                                randomSelectedArray={randomSelectedArray}
                            />
                        </FlexChild>)
                }

                <FlexChild height={30}></FlexChild>
                <FlexChild>
                    <div className={style.colorSelectArea}>

                        {colorArray ?
                            colorArray.map((colorSet, index) =>
                                <div key={index} className={style.colorCardArea}>
                                    <ColorCard index={index} colorSet={colorSet} callback={callbackPalette} />
                                </div>
                            )
                            : null
                        }
                    </div>
                </FlexChild>
            </VerticalFlex>
        </div>
    )
}



export default ColorSelectPanel;