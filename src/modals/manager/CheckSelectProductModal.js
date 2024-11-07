import NiceModal from "@ebay/nice-modal-react";
import FlexChild from "layouts/flex/FlexChild";
import ModalBase from "modals/base/ModalBase";
import { BrowserDetectContext } from "providers/BrowserEventProvider";
import { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { requester } from "App";
import VerticalFlex from "layouts/flex/VerticalFlex";
import SimpleTable from "routes/admin/table/SimpleTable";
import style from "./CheckSelectModal.module.css";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import Center from "layouts/wrapper/Center";
import P from "components/P";
import CustomButton from "components/buttons/CustomButton";
import InputText from "components/inputs/InputText";

const CheckSelectProductModal = NiceModal.create(
    (props) => {
        const { t } = useTranslation();
        const [withHeader, withFooter] = [true, false];
        const [width, height] = ["min(95%, 1300px)", "85vh"];
        const withCloseButton = true;
        const modal = useRef();
        const clickOutsideToClose = true;
        const buttonText = t("close");
        const { isMobile } = useContext(BrowserDetectContext);
        const { theader, title, list, justifyContent } = props;
        const [selectedVendors, setSelectedVendors] = useState([]);
        const [vendors, setVendors] = useState([]);
        const [brands, setBrands] = useState([]);
        const [products, setProducts] = useState([]);
        const [selectedBrands, setSelectedBrands] = useState([]);
        const [categories, setCategories] = useState([]);
        const [selectedCategories, setSelectedCategories] = useState([]);
        const [isMounted, setIsmounted] = useState(false);
        const [header, setHeader] = useState([]);
        const inputRef = useRef();

        useEffect(() => {
            setIsmounted(true);
            return () => {
                if (props.onClose) {
                    props.onClose();
                }
            }
        }, []);
        useEffect(() => {
            console.log(list);
            setProducts(list);
        },[list])
        useEffect(() => {
            setHeader(theader);
        },[theader])
        useEffect(() => {
            
        })
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
        }, [isMounted])


        const ocDataCallback = (selectedItems) => {
            if (props.onSelect) {
                if (list.length === selectedItems.length) {
                    props.onSelect([]);
                } else {
                    console.log(selectedItems);
                    props.onSelect(selectedItems);
                }
            }
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
        const selectedProductHeader = [
            { width: 300, code: "brandName", text: "브랜드명" },
            { width: 300, code: "productName", text: "상품명" }
        ]

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
            const categoryIds = selectedCategories.map(item => item.id);
            const brandIds = selectedBrands.map(item => item.id);
            const vendorIds = selectedVendors.map(item => item.id);
            console.log(categoryIds);
            console.log(brandIds);
            console.log(vendorIds);
            console.log(inputRef.current.getValue());
            let data =
            {
                categoryIds: categoryIds,
                brandIds: brandIds,
                vendorIds: vendorIds,
                input: inputRef.current.getValue()
            }
            requester.getSearchForProductTerms(data, (result) => {
                console.log(result.data);
                setProducts(result.data);
                setHeader(selectedProductHeader);
            })

        }

        
        const initializationStyle = {
            backgroundColor: "white",
            padding: "7px 20px",
            color: "black",
            border: "1px solid #ddd"
        }
        const searchStyle = {
            backgroundColor: "var(--admin-main-color)",
            padding: "7px 20px",
            border: "1px solid #ddd"
        }

        return (
            <ModalBase borderRadius={"10px"} headerStyle ref={modal} width={width} height={height} withHeader={withHeader} withFooter={withFooter} withCloseButton={withCloseButton} clickOutsideToClose={clickOutsideToClose} title={title} buttonText={buttonText} >
                <div style={{ display: "flex", gap: "15px", flexWrap: "wrap", overflowY: "scroll", height: "75vh" }}>
                    <VerticalFlex>
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
                        <FlexChild justifyContent={"flex-end"}>
                            <CustomButton text={"상품검색"} style={searchStyle} onClick={searchClick} />
                        </FlexChild>
                        <FlexChild>
                            {
                                header && products &&
                                <SimpleTable theader={header} data={products} callback={ocDataCallback} fileName={title} justifyContent={justifyContent} type={"modal"} />
                            }
                        </FlexChild>
                    </VerticalFlex>
                </div>
            </ModalBase>
        );
    }
);

export default CheckSelectProductModal;