
import NiceModal from "@ebay/nice-modal-react";
import FlexChild from "layouts/flex/FlexChild";
import ModalBase from "modals/base/ModalBase";
import { BrowserDetectContext } from "providers/BrowserEventProvider";
import { createRef, useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import style from "./AddProductOptionModal.module.css";
import { requester } from "App";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import VerticalFlex from "layouts/flex/VerticalFlex";
import Center from "layouts/wrapper/Center";
import P from "components/P";
import CustomIcon from "components/icons/CustomIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import CustomButton from "components/buttons/CustomButton";
import { largeCategory, middleCateogy } from "InitialData/category/categoryData.js";
import clsx from "classnames";
import TabView from "layouts/view/TabView";
import TabViewChild from "layouts/view/TabViewChild";

import InputText from "components/inputs/InputText";
import { Checkbox } from "@mui/material";
import CheckCircleGroup from "components/inputs/checkBox/CheckCircleGroup";
import ProductOptionRow from "./ProductOptionRow";
import CheckCircle from "components/inputs/checkBox/CheckCircle";
import { ConsoleView } from "react-device-detect";


const AddProductOptionModal = NiceModal.create(
    (props) => {
        const { t } = useTranslation();
        const [withHeader, withFooter] = [true, false];
        const [width, height] = ["min(95%, 1200px)", "80vh"];
        const withCloseButton = true;
        const clickOutsideToClose = true;
        const modal = useRef();
        const tabViewRef = useRef();
        const inputTabIndex = useRef();
        const optionNameInput = useRef();
        const optionRequiredOptionYnInput = useRef();
        const optionValueInput = useRef();
        const optionRowRefs = useRef([]);
        const [tabIndex, setTabIndex] = useState();
        const [mounted, setMounted] = useState(false);
        const [modalTitle, setModalTitle] = useState("카테고리 등록");
        const [selectedList, setSelectedList] = useState([]);
        const [optionsList, setOptionsList] = useState([]);
        const [singleOptionsList, setSingleOptionsList] = useState([]);
        const [interlockingOptionList, setInterlockingOptionList] = useState([]);
        const title = modalTitle;
        const buttonText = t("close");
        const { isMobile } = useContext(BrowserDetectContext);


        useEffect(() => {
            setMounted(true);
        }, [])

        const onTabChange = (activeTabIndex) => {
            setTabIndex(activeTabIndex);
        }
        const onSingleOptionsClick = () => {
            tabViewRef.current.setIndex(1);
            setModalTitle("단일 옵션 등록");
        }
        const onInterlockingOptionsClick = () => {
            tabViewRef.current.setIndex(2);
            setModalTitle("연동형 옵션 등록");
        }
        const btnStyle = {
            backgroundColor: "var(--admin-main-color)"
        }
        const onCheckGroupCallback = (checkedIndex, value) => {
            let selectedProducts = [];
            console.log(checkedIndex);
            console.log(value);
            // checkedIndex && checkedIndex.map((index) => {
            //     selectedProducts.push(products[index]);
            // });
            setSelectedList(selectedProducts);
        }

        const onOptionsAddClick = () => {
            setSingleOptionsList(prevOptions => {
                const newOptionName = optionNameInput.current.getValue();
                const newOptionItem = {
                    optionName: newOptionName,
                    optionRequiredOptionYn: optionRequiredOptionYnInput.current.getValue(),
                    optionItem: optionValueInput.current.getValue()
                };
                console.log(newOptionItem);

                if (prevOptions.length > 0 && prevOptions[0].optionType === "single") {
                    // optionName이 중복되는지 확인
                    if (prevOptions[0].options.some(option => option.optionName === newOptionName)) {
                        // 중복되는 경우, 리스트를 변경하지 않음
                        toast.error("중복된 옵션입니다.", {
                            autoClose: 1000, position: toast.POSITION.BOTTOM_CENTER, onClose: () => {

                            }
                        });
                        return prevOptions;
                    }

                    const newOption = {
                        ...prevOptions[0],
                        options: [...prevOptions[0].options, newOptionItem]
                    };

                    return [newOption];
                } else {
                    const newOption = {
                        optionType: "single",
                        options: [newOptionItem]
                    };

                    return [newOption];
                }
            });
        };

        const onSaveClick = () => {
            const productOptionsRaw = optionRowRefs.current.map(ref => ref.current.getValue());
            console.log(productOptionsRaw);
            if(productOptionsRaw.length > 0){
                const productOptionsArray = productOptionsRaw.reduce((acc, current) => {
                    const existingOptionIndex = acc.findIndex(
                        option => option.optionType === current.optionType && option.optionName === current.optionName
                    );
    
                    if (existingOptionIndex !== -1) {
                        console.log(current.outOfStockYn);
                        acc[existingOptionIndex].options.push({
                            optionItem: current.optionItem,
                            increaseOrDecreaseInAmount: Number(current.increaseOrDecreaseInAmount),
                            instock: Number(current.instock),
                            safetyInstock: Number(current.safetyInstock),
                            outOfStockYn: current.outOfStockYn,
                            requiredOptionYn: optionRequiredOptionYnInput.current.getValue()
                        });
                    } else {
                        console.log(current.outOfStockYn);
                        acc.push({
                            optionType: current.optionType,
                            optionName: optionNameInput.current.getValue(),
                            
                            options: [{
                                optionItem: current.optionItem,
                                increaseOrDecreaseInAmount: Number(current.increaseOrDecreaseInAmount),
                                instock: Number(current.instock),
                                safetyInstock: Number(current.safetyInstock),
                                outOfStockYn: current.outOfStockYn,
                                requiredOptionYn: optionRequiredOptionYnInput.current.getValue()
                            }]
                        });
                    }
    
                    return acc;
                }, []);
    
                const productOptions = productOptionsArray[0];
                console.log(productOptions);
                requester.updateProductoptions(productOptions, (result => {
                    console.log(result.data);
                }));
            }else{
                toast.error("옵션을 추가해주세요.", {
                    autoClose: 1000, position: toast.POSITION.BOTTOM_CENTER, onClose: () => {

                    }
                });
            }

            
        };

        // const onSaveClick = () => {
        //     const productOptionsRaw = singleOptionsList[0].options;

        //     const productOptions = {
        //         optionType: "single",
        //         options: productOptionsRaw.map(option => ({
        //             optionName: option.optionName,
        //             optionItem: option.optionItem,
        //             increaseOrDecreaseInAmount: (option.increaseOrDecreaseInAmount),
        //             instock: (option.instock),
        //             safetyInstock: (option.safetyInstock),
        //             outOfStockYn: option.outOfStockYn,
        //         }))
        //     };

        //     console.log(productOptions);
        //     // requester.updateProductoptions(productOptions, (result => {
        //     //     console.log(result.data);
        //     // }));
        // };
        useEffect(() => {
            const totalOptions = singleOptionsList.reduce((count, product) => count + (product.options ? product.options.length : 0), 0);
            optionRowRefs.current = Array.from({ length: totalOptions }, () => createRef());
            console.log(singleOptionsList);
        }, [singleOptionsList]);
        useEffect(() => {
            const totalOptions = interlockingOptionList.reduce((count, product) => count + (product.options ? product.options.length : 0), 0);
            optionRowRefs.current = Array.from({ length: totalOptions }, () => createRef());
        }, [interlockingOptionList]);

        const onTestSaveClick = () => {
            let data = {
                optionType: "single",

                options: [
                    {
                        optionName: "컬러",
                        optionItem: "블랙",
                        increaseOrDecreaseInAmount: 1000,
                        instock: 10,
                        safetyInstock: 10,
                        outOfStockYn: false
                    },
                    {
                        optionName: "컬러",
                        optionItem: "블랙",
                        increaseOrDecreaseInAmount: 1000,
                        instock: 20,
                        safetyInstock: 20,
                        outOfStockYn: true
                    },
                    {

                        optionItem: "블랙",
                        optionName: "컬러",
                        increaseOrDecreaseInAmount: 1000,
                        instock: 30,
                        safetyInstock: 30,
                        outOfStockYn: false
                    }
                ]
            };
            requester.updateProductoptions(data, (result => {
                console.log(result.data);
            }))
            // requester.findProductOptionsByUserId((result => {
            //     console.log(result.data);
            // }))
        }


        return (
            <ModalBase borderRadius={"10px"} headerStyle ref={modal} width={width} height={height} withHeader={withHeader} withFooter={withFooter} withCloseButton={withCloseButton} clickOutsideToClose={clickOutsideToClose} title={title} buttonText={buttonText}>
                <TabView noneMenu ref={tabViewRef} height={"100%"} initTabIndex={props.initTabIndex || 0} onTabChange={onTabChange}>
                    <TabViewChild tabName={"optionChoice"}>
                        <div className={style.wrap} >
                            <HorizontalFlex gap={15}>
                                <FlexChild>
                                    <div className={style.boxWrap} onClick={onSingleOptionsClick}>
                                        <VerticalFlex gap={10}>
                                            <FlexChild>
                                                <HorizontalFlex>
                                                    <FlexChild>
                                                        <P weight={"bold"}>단일 옵션</P>
                                                    </FlexChild>
                                                    <FlexChild justifyContent={"flex-end"}>
                                                        <FontAwesomeIcon icon={fas["faArrowRight"]} size="xl" color={"var(--admin-main-color)"} />
                                                    </FlexChild>
                                                </HorizontalFlex>
                                            </FlexChild>
                                            <FlexChild>
                                                <Center width={"98%"} textAlign={"left"}>
                                                    <P>먼저선택한 옵션에 영향을 받지 않는 개별 옵션</P>
                                                </Center>
                                            </FlexChild>
                                            <FlexChild>
                                                <HorizontalFlex gap={20} flexStart>
                                                    <FlexChild width={"10%"} padding={"5px"}>
                                                        <P color={"var(--admin-text-color)"}>상의</P>
                                                    </FlexChild>
                                                    <FlexChild >
                                                        <div className={style.contentWrap}>
                                                            <VerticalFlex>
                                                                <FlexChild>
                                                                    <div className={clsx(style.contentArea, style.contentBgColor)}>
                                                                        <HorizontalFlex>
                                                                            <FlexChild>
                                                                                <P color={"var(--admin-text-color)"}>블라우스</P>
                                                                            </FlexChild>
                                                                            <FlexChild justifyContent={"flex-end"}>
                                                                                <div className={style.triangle} />
                                                                            </FlexChild>
                                                                        </HorizontalFlex>
                                                                    </div>
                                                                </FlexChild>
                                                                <FlexChild>
                                                                    <div className={style.contentArea}>
                                                                        <Center width={"100%"} textAlign={"left"}>
                                                                            <P color={"var(--admin-text-color)"}>니트</P>
                                                                        </Center>
                                                                    </div>
                                                                </FlexChild>
                                                                <FlexChild>
                                                                    <div className={style.line} />
                                                                </FlexChild>
                                                                <FlexChild>
                                                                    <div className={style.contentArea}>
                                                                        <Center width={"100%"} textAlign={"left"}>
                                                                            <P color={"var(--admin-text-color)"}>셔츠</P>
                                                                        </Center>
                                                                    </div>
                                                                </FlexChild>
                                                            </VerticalFlex>
                                                        </div>
                                                    </FlexChild>
                                                </HorizontalFlex>
                                            </FlexChild>
                                            <FlexChild>
                                                <HorizontalFlex gap={20} flexStart>
                                                    <FlexChild width={"10%"} padding={"5px"}>
                                                        <P color={"var(--admin-text-color)"}>하의</P>
                                                    </FlexChild>
                                                    <FlexChild >
                                                        <div className={style.contentWrap}>
                                                            <VerticalFlex>
                                                                <FlexChild>
                                                                    <div className={clsx(style.contentArea, style.contentBgColor)}>
                                                                        <HorizontalFlex>
                                                                            <FlexChild>
                                                                                <P color={"var(--admin-text-color)"}>스커트</P>
                                                                            </FlexChild>
                                                                            <FlexChild justifyContent={"flex-end"}>
                                                                                <div className={style.triangle} />
                                                                            </FlexChild>
                                                                        </HorizontalFlex>
                                                                    </div>
                                                                </FlexChild>
                                                                <FlexChild>
                                                                    <div className={style.contentArea}>
                                                                        <Center width={"100%"} textAlign={"left"}>
                                                                            <P color={"var(--admin-text-color)"}>팬츠</P>
                                                                        </Center>
                                                                    </div>
                                                                </FlexChild>
                                                            </VerticalFlex>
                                                        </div>
                                                    </FlexChild>
                                                </HorizontalFlex>
                                            </FlexChild>
                                        </VerticalFlex>
                                    </div>
                                </FlexChild>
                                <FlexChild>
                                    <div className={clsx(style.boxWrap, style.bgColor)} onClick={onInterlockingOptionsClick}>
                                        <VerticalFlex gap={10}>
                                            <FlexChild>
                                                <HorizontalFlex>
                                                    <FlexChild>
                                                        <P weight={"bold"}>연동형 옵션</P>
                                                    </FlexChild>
                                                    <FlexChild justifyContent={"flex-end"}>
                                                        <FontAwesomeIcon icon={fas["faArrowRight"]} size="xl" color={"var(--admin-main-color)"} />
                                                    </FlexChild>
                                                </HorizontalFlex>
                                            </FlexChild>
                                            <FlexChild>
                                                <Center width={"98%"} textAlign={"left"}>
                                                    <P>먼저선택한 옵션에 선택에 따라 이어지는 옵션이 바뀌는 경우</P>
                                                </Center>
                                            </FlexChild>
                                            <FlexChild>
                                                <HorizontalFlex gap={20} flexStart>
                                                    <FlexChild width={"10%"} padding={"5px"}>
                                                        <P color={"var(--admin-text-color)"}>상의</P>
                                                    </FlexChild>
                                                    <FlexChild >
                                                        <div className={style.contentWrap}>
                                                            <VerticalFlex>
                                                                <FlexChild>
                                                                    <div className={clsx(style.contentArea, style.contentBgColor)}>
                                                                        <HorizontalFlex>
                                                                            <FlexChild>
                                                                                <P color={"var(--admin-text-color)"}>블라우스</P>
                                                                            </FlexChild>
                                                                            <FlexChild justifyContent={"flex-end"}>
                                                                                <div className={style.triangle} />
                                                                            </FlexChild>
                                                                        </HorizontalFlex>
                                                                    </div>
                                                                </FlexChild>
                                                                <FlexChild>
                                                                    <div className={style.contentArea}>
                                                                        <Center width={"100%"} textAlign={"left"}>
                                                                            <P color={"var(--admin-text-color)"}>니트</P>
                                                                        </Center>
                                                                    </div>
                                                                </FlexChild>
                                                                <FlexChild>
                                                                    <div className={style.line} />
                                                                </FlexChild>
                                                                <FlexChild>
                                                                    <div className={style.contentArea}>
                                                                        <Center width={"100%"} textAlign={"left"}>
                                                                            <P color={"var(--admin-text-color)"}>셔츠</P>
                                                                        </Center>
                                                                    </div>
                                                                </FlexChild>
                                                            </VerticalFlex>
                                                        </div>
                                                    </FlexChild>
                                                </HorizontalFlex>
                                            </FlexChild>
                                            <FlexChild>
                                                <HorizontalFlex gap={20} flexStart>
                                                    <FlexChild width={"10%"} padding={"5px"}>
                                                        <P color={"var(--admin-text-color)"}>하의</P>
                                                    </FlexChild>
                                                    <FlexChild >
                                                        <div className={style.contentWrap}>
                                                            <VerticalFlex>
                                                                <FlexChild>
                                                                    <div className={clsx(style.contentArea, style.contentBgColor)}>
                                                                        <HorizontalFlex>
                                                                            <FlexChild>
                                                                                <P color={"var(--admin-text-color)"}>스커트</P>
                                                                            </FlexChild>
                                                                            <FlexChild justifyContent={"flex-end"}>
                                                                                <div className={style.triangle} />
                                                                            </FlexChild>
                                                                        </HorizontalFlex>
                                                                    </div>
                                                                </FlexChild>
                                                                <FlexChild>
                                                                    <div className={style.contentArea}>
                                                                        <Center width={"100%"} textAlign={"left"}>
                                                                            <P color={"var(--admin-text-color)"}>팬츠</P>
                                                                        </Center>
                                                                    </div>
                                                                </FlexChild>
                                                            </VerticalFlex>
                                                        </div>
                                                    </FlexChild>
                                                </HorizontalFlex>
                                            </FlexChild>
                                        </VerticalFlex>
                                    </div>
                                </FlexChild>
                            </HorizontalFlex>
                        </div>
                    </TabViewChild>
                    <TabViewChild tabName={"singleOption"}>
                        <div className={style.wrap}>
                            <VerticalFlex gap={20}>
                                <FlexChild>
                                    <HorizontalFlex gap={20}>
                                        <FlexChild width={"10%"} padding={"10px"}>
                                            <P size={15} weight={"bold"}>옵션명</P>
                                        </FlexChild>
                                        <FlexChild>
                                            <InputText placeHolder={"옵션명을 입력하세요 (예: 컬러)."} ref={optionNameInput} />
                                        </FlexChild>
                                        <FlexChild width={"15%"}>
                                            <CheckCircle ref={optionRequiredOptionYnInput} />
                                            <P>필수옵션</P>
                                        </FlexChild>
                                    </HorizontalFlex>
                                </FlexChild>
                                <FlexChild>
                                    <HorizontalFlex gap={20}>
                                        <FlexChild width={"10%"} padding={"10px"}>
                                            <P size={15} weight={"bold"}>옵션 설정</P>
                                        </FlexChild>
                                        <FlexChild>
                                            <InputText ref={optionValueInput} placeHolder={"옵션값을 입력하세요 (예: 블랙)."} />
                                        </FlexChild>
                                        <FlexChild width={"15%"}>
                                            <CustomButton text={"입력"} style={btnStyle} onClick={onOptionsAddClick} />
                                        </FlexChild>
                                    </HorizontalFlex>
                                </FlexChild>
                                <FlexChild>
                                    <CheckCircleGroup gap={10} callback={onCheckGroupCallback} padding={10} backgroundColor={"#f5f6fb"} labelWidth={30} borderTop={"1px solid #ddd"} borderBottom={"1px solid #ddd"}
                                        headerGap={30} header={!isMobile &&
                                            [
                                                { width: 100, text: "옵션명", justifyContent: "flex-start", weight: "bold" },
                                                { width: 200, text: "옵션항목", justifyContent: "flex-start", weight: "bold" },
                                                { width: 120, text: "증감액", justifyContent: "flex-start", weight: "bold" },
                                                { width: 120, text: "재고수량", justifyContent: "flex-start", weight: "bold" },
                                                { width: 120, text: "안전재고", justifyContent: "flex-start", weight: "bold" },
                                                { width: null, text: "품절", justifyContent: "flex-start", weight: "bold" }
                                            ]
                                        }>
                                        {
                                            singleOptionsList
                                            &&
                                            singleOptionsList.length > 0
                                            &&
                                            singleOptionsList.flatMap((product, productIndex) => {
                                                return product.options ? product.options.map((row, optionIndex) => {
                                                    const globalIndex = singleOptionsList.slice(0, productIndex).reduce((count, prevProduct) => count + (prevProduct.options ? prevProduct.options.length : 0), 0) + optionIndex;
                                                    return <ProductOptionRow optionType={singleOptionsList[0].optionType} ref={optionRowRefs.current[globalIndex]} key={globalIndex} index={globalIndex} data={row} />;
                                                }) : [];
                                            })
                                        }
                                    </CheckCircleGroup>
                                </FlexChild>
                                <FlexChild>
                                    <CustomButton style={btnStyle} text={"옵션 저장 버튼"} onClick={onSaveClick} />
                                    <CustomButton style={btnStyle} text={"테스트 버튼"} onClick={onTestSaveClick} />
                                </FlexChild>
                            </VerticalFlex>
                        </div>
                    </TabViewChild>
                    <TabViewChild tabName={"interlockingOptions"}>
                        <P>3번입니다</P>
                    </TabViewChild>
                </TabView>
                {/* <input ref={inputTabIndex} className={"qdqdq"} type={"hidden"} value={tabIndex || 0} /> */}

            </ModalBase>
        );
    }
);

export default AddProductOptionModal;