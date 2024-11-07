import { useEffect, useRef, useState } from "react";
import style from "./ProductRegisterOptionDetail.module.css";
import VerticalFlex from "layouts/flex/VerticalFlex";
import FlexChild from "layouts/flex/FlexChild";
import Center from "layouts/wrapper/Center";
import P from "components/P";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import NiceModal from "@ebay/nice-modal-react";
import { requester } from "App";

function ProductRegisterOptionDetail(props) {
    const [option, setOption] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [singleOptionsList, setSingleOptionsList] = useState([]);

    useEffect(() => {
        setMounted(true);
    }, [])

    useEffect(() => {

        requester.findProductOptionsByUserId((result => {
            if (result.data) {
                const newSingleOptions = [];
                const newInterlockingOptions = [];
                result.data.forEach(row => {
                    if (row.optionType === "single") {
                        newSingleOptions.push(row);
                    } else {
                        newInterlockingOptions.push(row);
                    }
                });
                console.log(newSingleOptions);
                setSingleOptionsList(newSingleOptions);
                // setInterlockingOptionList(newInterlockingOptions);
            }
        }))
    },[mounted])

    const onSwitchClick = () => {
        setOption(!option);
    }
    const onAddOptionClick = () => {
        NiceModal.show("productOption");
    }

    return (
        <div className={style.container}>
            <VerticalFlex>
                <FlexChild>
                    <div className={style.label}>
                        <Center width={"100%"} textAlign={"left"}>
                            <P>SETP 2. 옵션설정 </P>
                        </Center>
                    </div>
                </FlexChild>
                <FlexChild>
                    <div className={style.contentWrap}>
                        <VerticalFlex gap={20}>
                            <FlexChild>
                                <HorizontalFlex gap={40}>
                                    <FlexChild width={"max-content"}>
                                        <P>옵션사용</P>
                                    </FlexChild>
                                    <FlexChild>

                                        <div className={style.switchContainer}>
                                            <label className={style.switch}>
                                                <input
                                                    type="checkbox"
                                                    onClick={onSwitchClick}
                                                    checked={option}
                                                />
                                                <span className={style.slider}>사용하기</span>
                                            </label>
                                        </div>

                                    </FlexChild>
                                </HorizontalFlex>

                            </FlexChild>
                            <FlexChild>
                                <div className={style.line} />
                            </FlexChild>
                            <FlexChild>
                                {
                                    option &&
                                    <div className={style.addOption} onClick={onAddOptionClick}>
                                        <P>옵션추가</P>
                                        <div className={style.plus}>+</div>
                                    </div>
                                }

                            </FlexChild>
                            <FlexChild>

                            </FlexChild>
                        </VerticalFlex>
                    </div>
                </FlexChild>
            </VerticalFlex>

        </div>
    );
}

export default ProductRegisterOptionDetail;