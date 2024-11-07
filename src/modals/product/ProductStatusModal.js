
import NiceModal from "@ebay/nice-modal-react";
import FlexChild from "layouts/flex/FlexChild";
import ModalBase from "modals/base/ModalBase";
import { BrowserDetectContext } from "providers/BrowserEventProvider";
import { createRef, useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import style from "./ProductStatusModal.module.css";
import { requester } from "App";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import VerticalFlex from "layouts/flex/VerticalFlex";
import Center from "layouts/wrapper/Center";
import P from "components/P";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import CustomButton from "components/buttons/CustomButton";
import clsx from "classnames";
import TabView from "layouts/view/TabView";
import TabViewChild from "layouts/view/TabViewChild";
import InputText from "components/inputs/InputText";
import CheckCircleGroup from "components/inputs/checkBox/CheckCircleGroup";
import ProductOptionRow from "./ProductOptionRow";
import CheckCircle from "components/inputs/checkBox/CheckCircle";
import { Container } from "@mui/material";
import Dummy from "components/Dummy";
import RadioChildren from "components/manager/views/forms/radio/RadioChildren";
import RadioGroup from "components/manager/views/forms/radio/RadioGroup";
import { textFormat } from "InitialData/regExp";
import InputNumber from "components/inputs/InputNumber";
import InputHashTag from "components/inputs/InputHashTag";
import QuillEditor from "components/inputs/richEditor/QuillEditor";
import InputImage from "components/inputs/image/InputImage";
import { validateInputs } from "shared/utils/Utils";
import { CButton } from "@coreui/react";



const ProductStatusModal = NiceModal.create(
    (props) => {
        const { t } = useTranslation();
        const { isMobile } = useContext(BrowserDetectContext);
        const { data } = props;
        const inputs = useRef([]);
        const [withHeader, withFooter] = [true, false];
        const [width, height] = ["min(95%, 1200px)", "80vh"];
        const withCloseButton = true;
        const clickOutsideToClose = true;
        const modal = useRef();
        const title = "상품 정보";
        const buttonText = t("close");
        const [displayYn, setDisplayYn] = useState();
        const [categories, setCategories] = useState();
        const [selectedCategory, setSelectedCategory] = useState();
        const [brands, setBrands] = useState();
        const [selectedBrand, setSelectedBrand] = useState();
        const [vendors, setVendors] = useState();
        const [selectedVendor, setSelectedVendor] = useState();
        const [isMounted, setMounted] = useState(false);
        const [product, setProduct] = useState();
        // min(95%, 1200px)
        useEffect(() => {
            setMounted(true);
        }, [isMounted])
        useEffect(() => {
            if (isMounted) {
                requester.getAllCategoriesForAdmin((result) => {
                    setCategories(result.data);
                });

                requester.getAllVendors((result) => {
                    setVendors(result.data);
                });

                requester.getAllBrandsForAdmin((result) => {
                    setBrands(result.data);
                });
            }
        }, [isMounted]);
        useEffect(() => {
            console.log(data);
            if (data) {
                setDisplayYn(data.displayYn);
                setSelectedCategory(
                    {
                        id: data.categoryId
                    }
                );
                setSelectedBrand(
                    {
                        id: data.brandId
                    }
                );
                setSelectedVendor(
                    {
                        id: data.vendorId
                    }
                );
            }
        }, [data])

        const onCategoryRegisterClick = () => {
            NiceModal.show("categoryRegister", { onChange: categoryRegCallback });
        }

        const categoryRegCallback = (value) => {
            requester.getAllCategoriesForAdmin((result) => {
                setCategories(result.data);
            });
        }

        const onCategorySelect = (category) => {
            setSelectedCategory(category);
        }

        const onVendorSelect = (vendor) => {
            setSelectedVendor(vendor);
        }
        const onBrandSelect = (brand) => {
            setSelectedBrand(brand);
        }
        const onBrandRegisterClick = () => {
            NiceModal.show("brandRegister", { onChange: brandRegCallback });
        }

        const brandRegCallback = (value) => {
            requester.getAllBrandsForAdmin((result) => {
                setBrands(result.data);
            });
        }

        const onSaveClick = () => {
            if (selectedVendor) {
                if (selectedCategory) {
                    if (selectedBrand) {
                        if (displayYn === undefined) {
                            console.log(displayYn);
                            toast.error("진열상태를 선택해주세요", {
                                autoClose: 1000, position: toast.POSITION.BOTTOM_CENTER
                            });
                        } else {
                            validateInputs(inputs.current).then((result) => {
                                if (result.isValid) {
                                    let validateData = {};
                                    validateData.id = data.productId;
                                    validateData.vendorAccount = selectedVendor.id;
                                    validateData.category = selectedCategory.id;
                                    validateData.title = inputs.current[0].getValue();
                                    validateData.price = inputs.current[1].getValue();
                                    validateData.displayYn = displayYn;
                                    validateData.quantity = inputs.current[2].getValue();
                                    validateData.hashTag = inputs.current[3].getValue();
                                    validateData.brand = selectedBrand.id;
                                    validateData.image = inputs.current[4].getValue();
                                    validateData.content = inputs.current[5].getValue();
                                    validateData.displayYn = displayYn;

                                    console.log(validateData);
                                    requester.saveProduct(validateData, (result) => {
                                        if (result.code === 0) {
                                            setProduct(result.data);
                                            console.log(result.data);
                                        }
                                    });

                                } else {
                                    toast.error(`${inputs.current[result.index].getName()} 항목을 확인해주세요`, {
                                        autoClose: 1000, position: toast.POSITION.BOTTOM_CENTER
                                    });
                                }


                            });
                        }
                    } else {
                        toast.error("브랜드를 선택해주세요", {
                            autoClose: 1000, position: toast.POSITION.BOTTOM_CENTER
                        });
                    }
                } else {
                    toast.error("카테고리를 선택해주세요", {
                        autoClose: 1000, position: toast.POSITION.BOTTOM_CENTER
                    });
                }
            } else {
                toast.error("입점사를 선택해주세요", {
                    autoClose: 1000, position: toast.POSITION.BOTTOM_CENTER
                });
            }
        }

        const Button = ({ text, onClick }) => {
            const btnStyle = {
                backgroundColor: "white",
                color: "#727272",
                borderColor: "#727272",
                borderRadius: "5px",
                padding: "3px 10px",
                fontSize: "10pt"
            }
            return (
                <CButton style={btnStyle} color={"primary"} onClick={onClick} active={true} >
                    {text}
                </CButton>
            );
        }




        return (
            <ModalBase borderRadius={"10px"} headerStyle ref={modal} width={width} height={height} withHeader={withHeader} withFooter={withFooter} withCloseButton={withCloseButton} clickOutsideToClose={clickOutsideToClose} title={title} buttonText={buttonText}>
                <div style={{ overflow: "scroll", height: "75vh" }}>
                    <Container maxWidth={1500}>
                        <VerticalFlex gap={20}>
                            <FlexChild>
                                <div className={style.container} sty>
                                    <VerticalFlex>
                                        <FlexChild>
                                            <div className={style.contentWrap}>
                                                <VerticalFlex gap={20}>
                                                    <FlexChild>
                                                        <HorizontalFlex gap={40}>
                                                            <FlexChild width={"15%"}>
                                                                <P>입점사</P>
                                                            </FlexChild>
                                                            <FlexChild>
                                                                <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
                                                                    {/* <P>{data && data.vendorName}</P> */}
                                                                    {
                                                                        vendors &&
                                                                        vendors.map((row, index) => (
                                                                            <FlexChild key={index} width={"initial"}>
                                                                                <div className={clsx(style.categoryWrap, { [style.selected]: selectedVendor && selectedVendor.id === row.id })} onClick={() => onVendorSelect(row)}>
                                                                                    <Center width={"100%"} textAlign={"left"}>
                                                                                        <P>{row.businessName}</P>
                                                                                    </Center>
                                                                                </div>
                                                                            </FlexChild>
                                                                        ))
                                                                    }
                                                                </div>
                                                            </FlexChild>
                                                        </HorizontalFlex>
                                                    </FlexChild>
                                                    <FlexChild>
                                                        <div className={style.line} />
                                                    </FlexChild>
                                                    <FlexChild>
                                                        <HorizontalFlex gap={40}>
                                                            <FlexChild width={"15%"}>
                                                                <P>카테고리 설정</P>
                                                            </FlexChild>
                                                            <FlexChild>
                                                                <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
                                                                    {
                                                                        categories &&
                                                                        categories.map((row, index) => (
                                                                            <FlexChild key={index} width={"initial"}>
                                                                                <div className={clsx(style.categoryWrap, { [style.selected]: selectedCategory && selectedCategory.id === row.id })} onClick={() => onCategorySelect(row)}>
                                                                                    <Center width={"100%"} textAlign={"left"}>
                                                                                        <P>{row.title}</P>
                                                                                    </Center>
                                                                                </div>
                                                                            </FlexChild>
                                                                        ))
                                                                    }
                                                                </div>
                                                            </FlexChild>
                                                        </HorizontalFlex>
                                                    </FlexChild>
                                                    <FlexChild>
                                                        <HorizontalFlex gap={40}>
                                                            <FlexChild width={"15%"} />
                                                            <FlexChild>
                                                                <div className={style.categoryModalBtn} onClick={onCategoryRegisterClick}>
                                                                    <P>카테고리 등록</P>
                                                                </div>
                                                            </FlexChild>
                                                        </HorizontalFlex>
                                                    </FlexChild>
                                                    <FlexChild>
                                                        <div className={style.line} />
                                                    </FlexChild>
                                                    <FlexChild>
                                                        <div className={style.line} />
                                                    </FlexChild>
                                                    <FlexChild>
                                                        <HorizontalFlex gap={40}>
                                                            <FlexChild width={"15%"}>
                                                                <P>상품명</P>
                                                            </FlexChild>
                                                            <FlexChild>
                                                                <InputText value={data &&data.productName} ref={el => (inputs.current[0] = el)} name={"상품명"} placeHolder={"상품명"} regExp={[textFormat]} />
                                                            </FlexChild>
                                                            <FlexChild width={"30%"}>
                                                                {/* <InputText placeHolder={"상품번호 자동 생성"} disabled /> */}
                                                            </FlexChild>
                                                        </HorizontalFlex>
                                                    </FlexChild>
                                                    <FlexChild>
                                                        <HorizontalFlex gap={40} justifyContent={"flex-start"}>
                                                            <FlexChild width={"15%"} >
                                                                <P>판매가</P>
                                                            </FlexChild>
                                                            <FlexChild width={200}>
                                                                <InputNumber value={data && data.price} ref={el => (inputs.current[1] = el)} name={"판매가"} min={0} max={999999} required={true} width={200} height={50} />
                                                            </FlexChild>
                                                        </HorizontalFlex>
                                                    </FlexChild>
                                                    <FlexChild>
                                                        <div className={style.line} />
                                                    </FlexChild>
                                                    <FlexChild>
                                                        <HorizontalFlex gap={40}>
                                                            <FlexChild width={"15%"}>
                                                                <P>진열상태</P>
                                                            </FlexChild>
                                                            <FlexChild>
                                                                <div className={style.radioWrap}>
                                                                    <RadioGroup name="example" value={displayYn} onChange={setDisplayYn}>
                                                                        <RadioChildren value={true}>진열</RadioChildren>
                                                                        <RadioChildren value={false}>미진열</RadioChildren>
                                                                    </RadioGroup>
                                                                </div>
                                                            </FlexChild>
                                                        </HorizontalFlex>
                                                    </FlexChild>
                                                    <FlexChild>
                                                        <HorizontalFlex gap={40} justifyContent={"flex-start"}>
                                                            <FlexChild width={"15%"} >
                                                                <P>재고수량</P>
                                                            </FlexChild>
                                                            <FlexChild width={200}>
                                                                <InputNumber value={data && data.quantity} ref={el => (inputs.current[2] = el)} min={0} max={999999} name={"재고수량"} width={200} height={50} />
                                                            </FlexChild>
                                                        </HorizontalFlex>
                                                    </FlexChild>
                                                    <FlexChild>
                                                        <HorizontalFlex gap={40} justifyContent={"flex-start"}>
                                                            <FlexChild width={"15%"} >
                                                                <P>해시태그</P>
                                                            </FlexChild>
                                                            <FlexChild>
                                                                <InputHashTag value={data && data.hashTag} ref={el => (inputs.current[3] = el)} name={"해시태그"} placeHolder={"해시태그"} />
                                                            </FlexChild>
                                                        </HorizontalFlex>
                                                    </FlexChild>
                                                </VerticalFlex>
                                            </div>
                                        </FlexChild>
                                    </VerticalFlex>
                                </div>
                            </FlexChild>
                            <FlexChild>
                                <div className={style.container}>
                                    <VerticalFlex>
                                        <FlexChild>
                                            <div className={style.contentWrap}>
                                                <VerticalFlex gap={20}>
                                                    <FlexChild>
                                                        <HorizontalFlex gap={40}>
                                                            <FlexChild width={"15%"}>
                                                                <P>브랜드 설정</P>
                                                            </FlexChild>
                                                            <FlexChild>
                                                                <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
                                                                    {
                                                                        brands &&
                                                                        brands.map((row, index) => (
                                                                            <FlexChild key={index} width={"initial"}>
                                                                                <div className={clsx(style.categoryWrap, { [style.selected]: selectedBrand && selectedBrand.id === row.id })} onClick={() => onBrandSelect(row)}>
                                                                                    <Center width={"100%"} textAlign={"left"}>
                                                                                        <P>{row.title}</P>
                                                                                    </Center>
                                                                                </div>
                                                                            </FlexChild>
                                                                        ))
                                                                    }
                                                                </div>
                                                            </FlexChild>
                                                        </HorizontalFlex>
                                                    </FlexChild>

                                                </VerticalFlex>
                                            </div>
                                        </FlexChild>
                                        <FlexChild>
                                            <HorizontalFlex gap={40}>
                                                <FlexChild width={"15%"} />
                                                <FlexChild>
                                                    <div className={style.categoryModalBtn} onClick={onBrandRegisterClick}>
                                                        <P>브랜드 등록</P>
                                                    </div>
                                                </FlexChild>
                                            </HorizontalFlex>
                                        </FlexChild>
                                    </VerticalFlex>
                                </div>
                            </FlexChild>
                            <FlexChild>
                                <div className={style.container}>
                                    <VerticalFlex>
                                        <FlexChild>
                                            <div className={style.contentWrap}>
                                                <VerticalFlex gap={20}>
                                                    <FlexChild>
                                                        <HorizontalFlex gap={40}>
                                                            <FlexChild width={"15%"}>
                                                                <P>썸네일</P>
                                                            </FlexChild>
                                                            <FlexChild>
                                                                <VerticalFlex gap={10} flexStart>
                                                                    <FlexChild>
                                                                        <InputImage ref={el => (inputs.current[4] = el)} name={"상품 라벨"} path={"product/"} labelWidth={0} cropWidth={100} cropHeight={100} value={data && data.image ? data.image : ""} maxSizeMb={1} />
                                                                    </FlexChild>
                                                                    <FlexChild borderBottom={"2px solid #e7e7e7"} >
                                                                        <Dummy height={10} />
                                                                    </FlexChild>
                                                                </VerticalFlex>
                                                            </FlexChild>
                                                        </HorizontalFlex>
                                                    </FlexChild>
                                                    <FlexChild>
                                                        <div className={style.line} />
                                                    </FlexChild>
                                                    <FlexChild height={"100%"}>
                                                        <HorizontalFlex gap={40}>
                                                            <FlexChild width={"15%"}>
                                                                <P>상세페이지</P>
                                                            </FlexChild>
                                                            <FlexChild height={"100%"}>
                                                                <div style={{ maxWidth: "1200px" }}>
                                                                    <QuillEditor ref={el => (inputs.current[5] = el)} name={"상세"} value={data && data.content ? data.content : ""} path={"product/" + "product.id"} preview={true} />
                                                                </div>
                                                            </FlexChild>
                                                        </HorizontalFlex>
                                                    </FlexChild>
                                                </VerticalFlex>
                                            </div>
                                        </FlexChild>
                                    </VerticalFlex>
                                </div>
                            </FlexChild>
                            <FlexChild padding={15}>
                                <Button text={"저장"} onClick={onSaveClick} />
                            </FlexChild>
                        </VerticalFlex>
                    </Container>
                </div>

            </ModalBase>
        );
    }
);

export default ProductStatusModal;