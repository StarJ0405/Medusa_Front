import VerticalFlex from "layouts/flex/VerticalFlex";
import style from "./ProductRegisterDetail.module.scss";
import FlexChild from "layouts/flex/FlexChild";
import Center from "layouts/wrapper/Center";
import P from "components/P";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import InputText from "components/inputs/InputText";
import { Checkbox } from "@mui/material";
import CustomButton from "components/buttons/CustomButton";
import NiceModal from "@ebay/nice-modal-react";
import RadioChildren from "components/manager/views/forms/radio/RadioChildren";
import RadioGroup from "components/manager/views/forms/radio/RadioGroup";
import { requester } from "App";
import clsx from "clsx";
import InputNumber from "components/inputs/InputNumber";
import InputHashTag from "components/inputs/InputHashTag";
import UploadImage from "components/inputs/upload/UploadImage";
import { useTranslation } from "react-i18next";
import { CButton, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from "@coreui/react";
import { ProductThumbnailType } from "shared/constants/constants";
import ReactDragSort from "react-drag-sort";
import Dummy from "components/Dummy";
import PaddingWrapper from "layouts/wrapper/PaddingWrapper";
import CIcon from "@coreui/icons-react";
import { cilCursorMove, cilX } from "@coreui/icons";
import UploadBiliBiliVideo from "components/inputs/upload/UploadBiliBiliVideo";
import { clone, getCurrentLanguageCode, validateInput, validateInputs } from "shared/utils/Utils";
import QuillEditor from "components/inputs/richEditor/QuillEditor";
import { toast, ToastContainer } from "react-toastify";
import { textFormat } from "InitialData/regExp";
import InputImage from "components/inputs/image/InputImage";
import Container from "layouts/container/Container";

function ProductRegisterDetail() {
    const { t } = useTranslation();
    const inputs = useRef([]);
    const [displayYn, setDisplayYn] = useState();
    const [categories, setCategories] = useState();
    const [selectedCategory, setSelectedCategory] = useState();
    const [brands, setBrands] = useState();
    const [selectedBrand, setSelectedBrand] = useState();
    const [vendors, setVendors] = useState();
    const [selectedVendor, setSelectedVendor] = useState();
    const [isMounted, setMounted] = useState(false);
    const [thumbnails, setThumbnails] = useState([]);
    const thumbnailRefs = useRef([]);
    const [product, setProduct] = useState();

    const radioStyle = {
        flex: 1,
        display: "flex",
        gap: "10px",
        border: "1px solid #eee",
        padding: "10px 15px"
    }

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

    const onAddThumbnailClick = () => {
        let index = thumbnails.length;
        let thumbnail = {
            index: index,
            id: null,
            type: ProductThumbnailType.IMAGE,
            productId: null,
            content: null,
            value: index,
            key: index
        }

        setThumbnails((before) => {
            // let oldThumbnails = clone(before);
            // let newThumbnails = oldThumbnails.map((thumbnail, index) => {
            //     let thumbnailRefRow = thumbnailRefs.current[index];
            //     let thumbnailRefRowCol = thumbnailRefRow.getRef();
            //     let content = thumbnailRefRowCol.getValue();
            //     thumbnail.content = content;
            //     return thumbnail;
            // });

            // return [...newThumbnails, thumbnail];
            return [...before, thumbnail];
        });
    }

    const onBrandRegisterClick = () => {
        NiceModal.show("brandRegister", { onChange: brandRegCallback });
    }

    const brandRegCallback = (value) => {
        requester.getAllBrandsForAdmin((result) => {
            setBrands(result.data);
        });
    }

    const onBrandSelect = (brand) => {
        setSelectedBrand(brand);
    }

    const onSaveClick = () => {
        if (selectedVendor) {
            if (selectedCategory) {
                if (selectedBrand) {
                    if (displayYn === undefined) {
                        toast.error("진열상태를 선택해주세요", {
                            autoClose: 1000, position: toast.POSITION.BOTTOM_CENTER
                        });
                    } else {
                        validateInputs(inputs.current).then((result) => {
                            if (result.isValid) {
                                let data = {};
                                data.vendorAccountId = selectedVendor.id;
                                data.categoryId = selectedCategory.id;
                                data.title = inputs.current[0].getValue();
                                data.price = inputs.current[1].getValue();
                                data.displayYn = displayYn;
                                data.quantity = inputs.current[2].getValue();
                                data.hashTag = inputs.current[3].getValue();
                                data.brandId = selectedBrand.id;
                                data.image = inputs.current[4].getValue();
                                data.content = inputs.current[5].getValue();

                                console.log(data);
                                requester.createProduct(data, (result) => {
                                    if (result.code === 0) {
                                        setProduct(result.data);
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
        setMounted(true);
    }, []);

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
        <Container maxWidth={1500}>
            <VerticalFlex gap={20}>
                <FlexChild>
                    <div className={style.container}>
                        <VerticalFlex>
                            <FlexChild>
                                <div className={style.label}>
                                    <Center width={"100%"} textAlign={"left"}>
                                        <P>STEP 1. 상품정보입력 </P>
                                    </Center>
                                </div>
                            </FlexChild>
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
                                            <HorizontalFlex gap={40}>
                                                <FlexChild width={"15%"}>
                                                    <P>상품명</P>
                                                </FlexChild>
                                                <FlexChild>
                                                    <InputText ref={el => (inputs.current[0] = el)} name={"상품명"} placeHolder={"상품명"} regExp={[textFormat]} />
                                                </FlexChild>
                                                <FlexChild width={"30%"}>
                                                    {/* <InputText placeHolder={"상품번호 자동 생성"} disabled /> */}
                                                </FlexChild>
                                            </HorizontalFlex>
                                        </FlexChild>
                                        {/* <FlexChild>
                                        <HorizontalFlex gap={40}>
                                            <FlexChild width={"15%"} >
                                                <P>요약설명</P>
                                            </FlexChild>
                                            <FlexChild>
                                                <InputText placeHolder={"상품명 밑에 보여지는 문구 입니다."} />
                                            </FlexChild>
                                        </HorizontalFlex>
                                    </FlexChild> */}
                                        <FlexChild>
                                            <HorizontalFlex gap={40} justifyContent={"flex-start"}>
                                                <FlexChild width={"15%"} >
                                                    <P>판매가</P>
                                                </FlexChild>
                                                <FlexChild width={200}>
                                                    <InputNumber ref={el => (inputs.current[1] = el)} name={"판매가"} min={0} max={999999} required={true} width={200} height={50} />
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
                                                    <InputNumber ref={el => (inputs.current[2] = el)} min={0} max={999999} name={"재고수량"} width={200} height={50} />
                                                </FlexChild>
                                            </HorizontalFlex>
                                        </FlexChild>
                                        <FlexChild>
                                            <HorizontalFlex gap={40} justifyContent={"flex-start"}>
                                                <FlexChild width={"15%"} >
                                                    <P>해시태그</P>
                                                </FlexChild>
                                                <FlexChild>
                                                    <InputHashTag ref={el => (inputs.current[3] = el)} name={"해시태그"} placeHolder={"해시태그"} />
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
                                <div className={style.label}>
                                    <Center width={"100%"} textAlign={"left"}>
                                        <P>STEP 2. 브랜드 </P>
                                    </Center>
                                </div>
                            </FlexChild>
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
                        </VerticalFlex>
                    </div>
                </FlexChild>
                <FlexChild>
                    <div className={style.container}>
                        <VerticalFlex>
                            <FlexChild>
                                <div className={style.label}>
                                    <Center width={"100%"} textAlign={"left"}>
                                        <P>STEP 3. 상품 상세등록 </P>
                                    </Center>
                                </div>
                            </FlexChild>
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
                                                            <InputImage ref={el => (inputs.current[4] = el)} name={"상품 라벨"} path={"product/"} labelWidth={0} cropWidth={100} cropHeight={100} value={product && product.image ? product.image : ""} maxSizeMb={1} />
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
                                                        <QuillEditor ref={el => (inputs.current[5] = el)} name={"상세"} value={product && product.content ? product.content : ""} path={"product/" + "product.id"} preview={true} />
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
                <FlexChild>
                    <Button text={"저장"} onClick={onSaveClick} />
                </FlexChild>
            </VerticalFlex>
        </Container>
    );
}

export default ProductRegisterDetail