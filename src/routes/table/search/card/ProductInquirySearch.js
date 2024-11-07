import AdminDatePicker from "routes/admin/datePicker/AdminDatePicker";
import style from "./ProductInquirySearch.module.css"
import VerticalFlex from "layouts/flex/VerticalFlex";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import Center from "layouts/wrapper/Center";
import P from "components/P";
import CustomButton from "components/buttons/CustomButton";
import { forwardRef, useContext, useEffect, useImperativeHandle, useRef, useState } from "react";
import { BrowserDetectContext } from "providers/BrowserEventProvider";
import { useTranslation } from "react-i18next";
import InputText from "components/inputs/InputText";
import AdminDateChoice from "routes/admin/datePicker/AdminDateChoice";
import CheckBox from "components/inputs/checkBox/CheckBox";
import CheckBoxRow from "components/inputs/checkBox/CheckBoxRow";
import CheckCircle from "components/inputs/checkBox/CheckCircle";
import { Radio, RadioGroup } from "@mui/material";
import NiceModal from "@ebay/nice-modal-react";
import clsx from "classnames";
import { requester } from "App";
import { useNavigate } from "react-router-dom";

const ProductInquirySearch = forwardRef((props, ref) => {
    const { isMobile } = useContext(BrowserDetectContext);
    const { t } = useTranslation();
    const today = new Date();
    // const newDay = new Date();
    const dateRef = useRef();
    const inputRef = useRef();
    const navigate = useNavigate();
    // newDay.setDate(today.getDate() - 7);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setsEndDate] = useState(new Date());
    const [active, setActive] = useState([false, false, false, false, false]);
    const [selectedDate, setSelectedDate] = useState("paymentDate");
    const [selectedSearch, setSelectedSearch] = useState("orderNumber");
    const [selectedVendors, setSelectedVendors] = useState([]);
    const [vendors, setVendors] = useState([]);
    const [brands, setBrands] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [isMounted, setIsmounted] = useState(false);
    const [productsStatus, setProductsStatus] = useState();
    const [selectedProductDisplayValue, setSelectedProductDisplayValue] = useState("all");
    const [selectedRestockStatus, setSelectedRestockStatus] = useState("inStock");

    const onProductDisplayValueChange = (e) => {
        console.log(e.target.value);
        setSelectedProductDisplayValue(e.target.value);

    }
    const onRestockStatusValueChange = (e) => {
        console.log(e.target.value);
        setSelectedRestockStatus(e.target.value);
    }

    const vendorSelectHeader = [
        { width: 150, code: "businessName", text: "상호" },
        { width: 150, code: "userName", text: "아이디" },
        { width: 100, code: "businessNo", text: "사업자번호" },
        { width: 100, code: "name", text: "담당자명" },
        { width: 100, code: "mobileNo", text: "연락처" },
        { width: 70, code: "confirmYn", text: "승인여부" },
        { width: 70, code: "useYn", text: "사용여부" },
        { width: 100, code: "createDateTime", text: "등록일시" }
    ];
    const categorySelectHeader = [
        { width: 300, code: "title", text: "카테고리명" }
    ]
    const brandSelectHeader = [
        // { width: 150, code: "image", text: "썸네일"},
        { width: 300, code: "title", text: "브랜드명" }
    ];


    useEffect(() => {
        requester.getAllVendors((result) => {
            setVendors(result.data);
        });
        requester.getAllCategoriesForAdmin((result) => {
            setCategories(result.data);
        });
        requester.getAllBrandsForAdmin((result) => {
            setBrands(result.data);
        });
        setIsmounted(true);
    }, []);
    useEffect(() => {
        if (isMounted) {
            requester.getProductStatistics((result) => {
                setProductsStatus(result.data);
            })
        }
    }, [isMounted]);

    useImperativeHandle(ref, () => ({
        getStartDate() {
            return startDate;
        },
        getEndDate() {
            return endDate;
        }
    }));

    const onLookUpClick = () => {
        const resultStartDate = dateRef.current ? dateRef.current.getStartDate() : null;
        const resultEndDate = dateRef.current ? dateRef.current.getEndDate() : null;

        if (props.lookUp) {
            console.log(resultStartDate, resultEndDate);
            props.lookUp(resultStartDate, resultEndDate, active);
        }
    }

    const on7dayClick = () => {
        const today = new Date();
        const newDay = new Date();
        setStartDate(newDay.setDate(today.getDate() - 7));
        setsEndDate(today);
        setActive([true, false, false, false, false]);
    };

    const onOneMonthClick = () => {
        const today = new Date();
        const newDay = new Date();
        setStartDate(newDay.setDate(today.getDate() - 30));
        setsEndDate(today);
        setActive([false, true, false, false, false]);
    };

    const onThreeMonthClick = () => {
        const today = new Date();
        const newDay = new Date();
        setStartDate(newDay.setDate(today.getDate() - 90));
        setsEndDate(today);
        setActive([false, false, true, false, false]);
    };

    const onSixMonthClick = () => {
        const today = new Date();
        const newDay = new Date();
        setStartDate(newDay.setDate(today.getDate() - 180));
        setsEndDate(today);
        setActive([false, false, false, true, false]);
    };

    const onOneYearClick = () => {
        const today = new Date();
        const newDay = new Date();
        setStartDate(newDay.setDate(today.getDate() - 365));
        setsEndDate(today);
        setActive([false, false, false, false, true]);
    };
    // const datePickerClick = (active) => {
    //     setActive(active);
    // }

    const onVendorSearchClick = () => {
        NiceModal.show("checkSelect", { list: vendors, title: "입점사 목록", theader: vendorSelectHeader, justifyContent: "flex-start", onSelect: onVendorSelect });
    }
    const onVendorSelect = (vendors) => {
        console.log(vendors);
        setSelectedVendors(vendors);

    }
    const onCategorySearchClick = () => {
        NiceModal.show("checkSelect", { list: categories, title: "카테고리 목록", theader: categorySelectHeader, justifyContent: "flex-start", onSelect: onCategorySelect });
    }
    const onCategorySelect = (categories) => {
        console.log(categories)
        setSelectedCategories(categories);
    }
    const onBrandSearchClick = () => {
        NiceModal.show("checkSelect", { list: brands, title: "브랜드 목록", theader: brandSelectHeader, justifyContent: "flex-start", onSelect: onBrandSelect });
    }
    const onBrandSelect = (brands) => {
        console.log(brands)
        setSelectedBrands(brands);
    }
    const searchClick = () => {
        if (props.callback) {
            props.callback(selectedVendors, selectedBrands, selectedCategories, inputRef.current.getValue(), selectedProductDisplayValue, selectedRestockStatus);
        }
    }
    const onSelectDateChange = (e) => {

        setSelectedDate(e.target.value);

    }
    const onSelectSearchChange = (e) => {

        setSelectedSearch(e.target.value);
    }
    const onInitializationClick = () => {
        console.log("sdfsdffds");
        inputRef.current.setValue("");
        setStartDate(new Date());
        setsEndDate(new Date());
        setActive([false, false, false, false, false]);
        setSelectedDate("paymentDate");
        setSelectedSearch("orderNumber");

    }
    const onProductRegisterClick = () => {
        navigate("/admin/productRegistration");
    }

    const searchStyle = {
        backgroundColor: "var(--admin-main-color)",
        padding: "7px 20px",
        border: "1px solid #ddd"
    }
    const initializationStyle = {
        backgroundColor: "white",
        padding: "7px 20px",
        color: "black",
        border: "1px solid #ddd"
    }
    const productStatistics = [
        {
            text: "전체",
            count: productsStatus && productsStatus.allProduct
        },
        {
            text: "진열",
            count: productsStatus && productsStatus.mainItemsOnShow
        },
        {
            text: "미진열",
            count: productsStatus && productsStatus.productNotShown
        },
        {
            text: "판매중",
            count: productsStatus && productsStatus.productsOnSale
        },
        {
            text: "품절",
            count: productsStatus && productsStatus.soldOutProduct
        }
    ]

    return (
        <div className={style.container}>
            <VerticalFlex >
                <FlexChild>
                    <div style={{ backgroundColor: "#f5f6fb", padding: "0 0 30px 0" }}>
                        <div style={{ boxShadow: "1px 3px 10px 0 rgba(0, 35, 11, 0.2)" }}>
                            <HorizontalFlex backgroundColor={"white"} padding={"15px"} alignItems={"center"} justifyContent={"flex-start"} >
                                {
                                    productStatistics &&
                                    productStatistics.map((data, index) => {
                                        return (
                                            <FlexChild key={index} width={150}>
                                                <HorizontalFlex justifyContent={"flex-start"} gap={10}>
                                                    <FlexChild width={"initial"}>
                                                        <P weight={"bold"}>{data.text}</P>
                                                    </FlexChild>
                                                    <FlexChild>
                                                        <P weight={"bold"} color={"var(--admin-main-color)"}>{data.count} </P>
                                                        <P weight={"bold"}>건</P>
                                                    </FlexChild>
                                                </HorizontalFlex>
                                            </FlexChild>
                                        );
                                    })
                                }
                            </HorizontalFlex>
                        </div>
                    </div>
                </FlexChild>
                <FlexChild>
                    <VerticalFlex>
                        <FlexChild>
                            <HorizontalFlex gap={10} >
                                <FlexChild width={"10%"} backgroundColor={"var(--admin-table-bg-color)"}>
                                    <div className={style.titleWrap}>
                                        <Center>
                                            <P size={15} weight={"bold"}>입점사</P>
                                        </Center>
                                    </div>
                                </FlexChild>
                                <FlexChild>
                                    <HorizontalFlex gap={10} justifyContent={"flex-start"}>
                                        <FlexChild width={"initial"}>
                                            <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
                                                {
                                                    selectedVendors && selectedVendors.length > 0
                                                        ?
                                                        selectedVendors.length > 5 ?
                                                            [...selectedVendors.slice(0, 5), { businessName: "..." }].map((row, index) => (
                                                                <FlexChild key={index} width={"initial"}>
                                                                    <div className={style.categoryWrap} >
                                                                        <Center width={"100%"} textAlign={"left"}>
                                                                            <P>{row.businessName}</P>
                                                                        </Center>
                                                                    </div>
                                                                </FlexChild>
                                                            ))
                                                            :
                                                            selectedVendors.map((row, index) => (
                                                                <FlexChild key={index} width={"initial"}>
                                                                    <div className={style.categoryWrap} >
                                                                        <Center width={"100%"} textAlign={"left"}>
                                                                            <P>{row.businessName}</P>
                                                                        </Center>
                                                                    </div>
                                                                </FlexChild>
                                                            ))
                                                        :
                                                        <FlexChild width={"initial"}>
                                                            <div className={style.categoryWrap} >
                                                                <Center width={"100%"} textAlign={"left"}>
                                                                    <P>전체</P>
                                                                </Center>
                                                            </div>
                                                        </FlexChild>
                                                }
                                            </div>
                                        </FlexChild>
                                        <FlexChild>
                                            <CustomButton text={"입점사 선택"} style={initializationStyle} onClick={onVendorSearchClick} />
                                        </FlexChild>
                                    </HorizontalFlex>
                                </FlexChild>
                            </HorizontalFlex>
                        </FlexChild>
                        <FlexChild>
                            <HorizontalFlex gap={10}>
                                <FlexChild width={"10%"} backgroundColor={"var(--admin-table-bg-color)"}>
                                    <div className={style.titleWrap}>
                                        <Center>
                                            <P size={15} weight={"bold"}>카테고리</P>
                                        </Center>
                                    </div>
                                </FlexChild>
                                <FlexChild>
                                    <HorizontalFlex gap={10} justifyContent={"flex-start"}> 
                                        <FlexChild width={"initial"}>
                                            <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
                                                {
                                                    selectedCategories && selectedCategories.length > 0
                                                        ?
                                                        selectedCategories.length > 5 ?
                                                            [...selectedCategories.slice(0, 5), { title: "..." }].map((row, index) => (
                                                                <FlexChild key={index} width={"initial"}>
                                                                    <div className={style.categoryWrap} >
                                                                        <Center width={"100%"} textAlign={"left"}>
                                                                            <P>{row.title}</P>
                                                                        </Center>
                                                                    </div>
                                                                </FlexChild>
                                                            ))
                                                            :
                                                            selectedCategories.map((row, index) => (
                                                                <FlexChild key={index} width={"initial"}>
                                                                    <div className={style.categoryWrap} >
                                                                        <Center width={"100%"} textAlign={"left"}>
                                                                            <P>{row.title}</P>
                                                                        </Center>
                                                                    </div>
                                                                </FlexChild>
                                                            ))
                                                        :
                                                        <FlexChild width={"initial"}>
                                                            <div className={style.categoryWrap} >
                                                                <Center width={"100%"} textAlign={"left"}>
                                                                    <P>전체</P>
                                                                </Center>
                                                            </div>
                                                        </FlexChild>
                                                }
                                            </div>
                                        </FlexChild>
                                        <FlexChild>
                                            <CustomButton text={"카테고리 선택"} style={initializationStyle} onClick={onCategorySearchClick} />
                                        </FlexChild>
                                        <FlexChild />
                                    </HorizontalFlex>
                                </FlexChild>
                            </HorizontalFlex>
                        </FlexChild>
                        <FlexChild>
                            <HorizontalFlex gap={10}>
                                <FlexChild width={"10%"} backgroundColor={"var(--admin-table-bg-color)"}>
                                    <div className={style.titleWrap}>
                                        <Center>
                                            <P size={15} weight={"bold"}>브랜드</P>
                                        </Center>
                                    </div>
                                </FlexChild>
                                <FlexChild>
                                    <HorizontalFlex gap={10} justifyContent={"flex-start"}>
                                        <FlexChild width={"initial"}>
                                            <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
                                                {
                                                    selectedBrands && selectedBrands.length > 0
                                                        ?
                                                        selectedBrands.length > 5 ?
                                                            [...selectedBrands.slice(0, 5), { title: "..." }].map((row, index) => (
                                                                <FlexChild key={index} width={"initial"}>
                                                                    <div className={style.categoryWrap} >
                                                                        <Center width={"100%"} textAlign={"left"}>
                                                                            <P>{row.title}</P>
                                                                        </Center>
                                                                    </div>
                                                                </FlexChild>
                                                            ))
                                                            :
                                                            selectedBrands.map((row, index) => (
                                                                <FlexChild key={index} width={"initial"}>
                                                                    <div className={style.categoryWrap} >
                                                                        <Center width={"100%"} textAlign={"left"}>
                                                                            <P>{row.title}</P>
                                                                        </Center>
                                                                    </div>
                                                                </FlexChild>
                                                            ))
                                                        :
                                                        <FlexChild width={"initial"}>
                                                            <div className={style.categoryWrap} >
                                                                <Center width={"100%"} textAlign={"left"}>
                                                                    <P>전체</P>
                                                                </Center>
                                                            </div>
                                                        </FlexChild>
                                                }
                                            </div>
                                        </FlexChild>
                                        <FlexChild>
                                            <CustomButton text={"브랜드 선택"} style={initializationStyle} onClick={onBrandSearchClick} />
                                        </FlexChild>
                                        <FlexChild />
                                    </HorizontalFlex>
                                </FlexChild>
                            </HorizontalFlex>
                        </FlexChild>
                        <FlexChild>
                            <HorizontalFlex gap={10} justifyContent={"flex-start"}>
                                <FlexChild width={"10%"} backgroundColor={"var(--admin-table-bg-color)"}>
                                    <div className={style.titleWrap}>
                                        <Center>
                                            <P size={15} weight={"bold"}>상품명</P>
                                        </Center>
                                    </div>
                                </FlexChild>
                                <FlexChild width={300}>
                                    <InputText ref={inputRef} />
                                </FlexChild>
                            </HorizontalFlex>
                        </FlexChild>
                    </VerticalFlex>
                </FlexChild>
                <FlexChild>
                    <HorizontalFlex>
                        <FlexChild width={"10%"} backgroundColor={"var(--admin-table-bg-color)"}>
                            <div className={style.titleWrap}>
                                <Center>
                                    <P size={15} weight={"bold"}>진열상태</P>
                                </Center>
                            </div>
                        </FlexChild>
                        <FlexChild>
                            <RadioGroup value={selectedProductDisplayValue} onChange={onProductDisplayValueChange}>
                                <HorizontalFlex gap={30}>
                                    <FlexChild width={"max-content"}>
                                        <Radio name="productDisplay" value="all" />
                                        <P size={15} color={"#aaa"}>전체</P>
                                    </FlexChild>
                                    <FlexChild width={"max-content"}>
                                        <Radio name="productDisplay" value={"display"} />
                                        <P size={15} color={"#aaa"}>진열</P>
                                    </FlexChild>
                                    <FlexChild>
                                        <Radio name="productDisplay" value={"nonDisplay"} />
                                        <P size={15} color={"#aaa"}>미진열</P>
                                    </FlexChild>
                                </HorizontalFlex>
                            </RadioGroup>
                        </FlexChild>
                    </HorizontalFlex>
                </FlexChild>
                <FlexChild>
                    <HorizontalFlex>
                        <FlexChild width={"10%"} backgroundColor={"var(--admin-table-bg-color)"}>
                            <div className={style.titleWrap}>
                                <Center>
                                    <P size={15} weight={"bold"}>재고상태</P>
                                </Center>
                            </div>
                        </FlexChild>
                        <FlexChild>
                            <RadioGroup value={selectedRestockStatus} onChange={onRestockStatusValueChange}>
                                <HorizontalFlex gap={30}>
                                    <FlexChild width={"max-content"}>
                                        <Radio name="restockStatus" value="inStock" />
                                        <P size={15} color={"#aaa"}>재고여유</P>
                                    </FlexChild>
                                    <FlexChild width={"max-content"}>
                                        <Radio name="restockStatus" value="soldOut" />
                                        <P size={15} color={"#aaa"}>품절</P>
                                    </FlexChild>
                                    <FlexChild >
                                        <Radio name="restockStatus" value="almostSoldOut" />
                                        <P size={15} color={"#aaa"}>품절임박</P>
                                    </FlexChild>

                                </HorizontalFlex>
                            </RadioGroup>
                        </FlexChild>
                    </HorizontalFlex>
                </FlexChild>
                <FlexChild backgroundColor={"#f5f6fb"} padding={"15px 0"}>
                    <HorizontalFlex gap={20}>
                        <FlexChild justifyContent={"flex-end"}>
                            <CustomButton text={"조건검색"} style={searchStyle} onClick={searchClick} />
                        </FlexChild>
                        <FlexChild width={"max-content"}>
                            <CustomButton text={"상품 등록"} style={searchStyle} onClick={onProductRegisterClick} />
                        </FlexChild>
                        <FlexChild>
                            <CustomButton text={"초기화"} style={initializationStyle} onClick={onInitializationClick} />
                        </FlexChild>
                    </HorizontalFlex>
                </FlexChild>
            </VerticalFlex>
        </div>
    );
});


export default ProductInquirySearch;