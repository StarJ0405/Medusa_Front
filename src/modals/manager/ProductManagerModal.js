import ModalBase from "modals/base/ModalBase";
import { forwardRef, useContext, useEffect, useImperativeHandle, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import NiceModal from "@ebay/nice-modal-react";
import style from "./ProductManagerModal.module.css";
import { requester } from "App";
import { clone, getCurrentLanguageCode, validateInput, validateInputs } from "shared/utils/Utils";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import FlexChild from "layouts/flex/FlexChild";
import ButtonEclipse from "components/buttons/ButtonEclipse";
import VerticalFlex from "layouts/flex/VerticalFlex";
import InputText from "components/inputs/InputText";
import clsx from "clsx";
import InputFile from "components/inputs/InputFile";
import InputHashTag from "components/inputs/InputHashTag";
import QuillEditor from "components/inputs/richEditor/QuillEditor";
import NavTabs from "components/manager/NavTabs";
import { CButton, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from "@coreui/react";
import NavTabChild from "components/manager/NavTabChild";
import InputNumber from "components/inputs/InputNumber";
import { CategorySpecType, ProductThumbnailType } from "shared/constants/constants";
import ReactDragSort from "react-drag-sort";
import CIcon from "@coreui/icons-react";
import { cilCursorMove, cilX } from "@coreui/icons";
import Center from "layouts/wrapper/Center";
import PaddingWrapper from "layouts/wrapper/PaddingWrapper";
import InputBiliBiliVideo from "components/inputs/InputBiliBiliVideo";
import P from "components/P";
import Dummy from "components/Dummy";
import Inline from "layouts/container/Inline";
import warning from "resources/img/warning.svg"
import UploadImage from "components/inputs/upload/UploadImage";
import UploadBiliBiliVideo from "components/inputs/upload/UploadBiliBiliVideo";
import { BrowserDetectContext } from "providers/BrowserEventProvider";

const ProductManagerModal = NiceModal.create((props) => {
    const { isMobile } = useContext(BrowserDetectContext);
    const { t } = useTranslation();
    const [withHeader, withFooter] = [false, false];
    // const [width, height] = ["min(100%, 800px)", "min(100%, 800px)"];
    const [width, height] = ["100%", "100%"];
    const withCloseButton = true;
    const clickOutsideToClose = true;
    const title = props.product ? t('editProduct') : t("addProduct");
    const buttonText = t("close");
    const modal = useRef();

    const [product, setProduct] = useState();
    const inputs = useRef([]);
    const [brands, setBrands] = useState([]);
    const specRefs = useRef([]);
    const thumbnailRefs = useRef([]);
    const [thumbnails, setThumbnails] = useState([]);

    useEffect(() => {
        requester.getAllBrands((result) => {
            setBrands(result.data);
        });

    }, []);


    const onSaveClick = () => {
        let data = clone(product);
        let oldSpecs = clone(data.productSpecs);
        let newSpecs = oldSpecs.map((spec, index) => {
            let specRefRow = specRefs.current[index];
            let specRefCol = specRefRow.getRef();
            let value = specRefCol.getValue();
            if (spec.type === CategorySpecType.TEXT) {
                spec.valueText = value;
            } else if (spec.type === CategorySpecType.NUMBER) {
                spec.valueNumber = value;
            } else if (spec.type === CategorySpecType.FLOAT) {
                spec.valueFloat = value;
            }
            spec.productId = product.id;
            return spec;
        });

        data.productSpecs = newSpecs;
        //상품 메인 이미지와 다수 썸네일이 파일인풋이기 때문에 비동기 함수로 감싸기 위해 인풋들을 합쳐줌 
        let thumbnailInputs = thumbnailRefs.current.map((ref) => ref.getRef());
        let combinedInputs = [...inputs.current, ...thumbnailInputs];

        validateInputs(combinedInputs).then((result) => {
            if (result.isValid) {
                data.brandId = inputs.current[0].getValue();
                data.titleKr = inputs.current[1].getValue();
                data.titleCn = inputs.current[2].getValue();
                data.image = inputs.current[3].getValue();
                data.hashTagKr = inputs.current[4].getValue();
                data.hashTagCn = inputs.current[5].getValue();
                data.comment = inputs.current[6].getValue();
                data.price = inputs.current[7].getValue();
                data.quantity = inputs.current[8].getValue();
                data.contentKr = inputs.current[9].getValue();
                data.contentCn = inputs.current[10].getValue();


                let oldThumbnails = clone(thumbnails);
                let newThumbnails = oldThumbnails.map((thumbnail, index) => {
                    let thumbnailFileInput = thumbnailRefs.current[index].getRef();
                    let content = thumbnailFileInput.getValue();
                    thumbnail.productId = product.id;
                    thumbnail.orderNo = index;
                    thumbnail.content = content;

                    return thumbnail;
                })

                data.thumbnails = newThumbnails;

                requester.saveProduct(data, (result) => {
                    if (result.code === 0) {
                        setProduct(result.data);
                        // setThumbnails(result.data.thumbnails);
                        let receivedThumbnails = result.data.thumbnails;
                        let indexedThumbnails = receivedThumbnails.map((thumbnail, index) => {
                            thumbnail.index = result.data.thumbnails[index].orderNo;
                            thumbnail.key = result.data.thumbnails[index].orderNo;
                            thumbnail.value = result.data.thumbnails[index].orderNo;
                            return thumbnail;
                        })
                        setThumbnails(indexedThumbnails);
                    }
                });
            }
        });
    }

    useEffect(() => {
        let data = { id: props.product.id }
        requester.getProductForAdmin(data, (result) => {
            setProduct(result.data);
            let receivedThumbnails = result.data.thumbnails;
            let indexedThumbnails = receivedThumbnails.map((thumbnail, index) => {
                thumbnail.index = result.data.thumbnails[index].orderNo;
                thumbnail.key = result.data.thumbnails[index].orderNo;
                thumbnail.value = result.data.thumbnails[index].orderNo;
                return thumbnail;
            })
            setThumbnails(indexedThumbnails);
            // setThumbnails(result.data.thumbnails);
        });
    }, [props.product]);


    const onCloseClick = () => {
        modal.current.close();
    }

    const onDeleteClick = (category) => {
        // let data;
        // if (category) {
        //     data = clone(category);
        // } else {
        //     // data = clone(selectedCategory);
        // }

        // requester.deleteCategory(data, (result) => {
        //     props.onChange && props.onChange();
        // });
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

    const Spec = forwardRef((props, ref) => {
        const { data } = props;
        const specRef = useRef();
        useImperativeHandle(ref, () => ({
            getRef() {
                return specRef.current;
            }
        }));

        return (
            <CTableRow>
                <CTableDataCell>
                    <CDropdown popper={false}>
                        <CDropdownToggle color="secondary">{data && data.type ? data.type : t("categorySpecType")}</CDropdownToggle>
                    </CDropdown>
                </CTableDataCell>
                <CTableDataCell>
                    <InputText value={data.description} readOnly />
                </CTableDataCell>
                <CTableDataCell>
                    <InputText value={data.unit} readOnly />
                </CTableDataCell>
                <CTableDataCell>
                    {
                        {
                            TEXT: <InputText ref={specRef} value={data.valueText} />,
                            NUMBER: <InputNumber ref={specRef} value={data.valueNumber} />,
                            FLOAT: <InputNumber ref={specRef} value={data.valueFloat} />
                        }[data.type]
                    }
                </CTableDataCell>
            </CTableRow>
        );
    });

    const Button = ({ text, onClick }) => {
        const btnStyle = {
            backgroundColor: "white",
            color: "#727272",
            borderColor: "#727272",
            borderRadius: "5px",
            padding : "3px 10px",
            fontSize: "10pt"
        }
        return (
            <CButton style={btnStyle} color={"primary"} onClick={onClick} active={true} >
                {text}
            </CButton>
        );
    }

    const ThumbnailContainer = (props) => {
        const { value, index, onRemove, onChange, decorateHandle } = props;
        const [data, setData] = useState(thumbnails[index]);

        return (
            <PaddingWrapper padding={10} border={"1px solid #ddd"}>
                <HorizontalFlex gap={15}>
                    <FlexChild width={50}>
                        <Center>
                            {decorateHandle(
                                <div className={style.thumbnailHandle}>
                                    <CIcon icon={cilCursorMove} />
                                </div>
                            )}
                        </Center>
                    </FlexChild>
                    <FlexChild width={100}>
                        <CDropdown>
                            <CDropdownToggle color="secondary">{data && data.type ? data.type : ProductThumbnailType.IMAGE}</CDropdownToggle>
                            <CDropdownMenu>
                                {Object.keys(ProductThumbnailType).map((type, thumbnailTypeIndex) =>
                                    <CDropdownItem key={thumbnailTypeIndex} onClick={() => onThumbnailTypeSelect(type, index)}>{type}</CDropdownItem>
                                )}
                            </CDropdownMenu>
                        </CDropdown>
                    </FlexChild>
                    <FlexChild overflowX={"hidden"} >
                        <Thumbnail ref={el => (thumbnailRefs.current[index] = el)} data={data} index={index} />
                    </FlexChild>
                    <FlexChild width={50}>
                        <Center>
                            <div onClick={onRemove}>
                                <CIcon icon={cilX} />
                            </div>
                        </Center>
                    </FlexChild>
                </HorizontalFlex>
            </PaddingWrapper>
        );
    }

    const onThumbnailTypeSelect = (selectedType, index) => {
        let oldThumbnails = clone(thumbnails);
        let newThumbnails = oldThumbnails.map((oldThumbnail, oldThumbnailIndex) => {
            if (oldThumbnailIndex === index) {
                oldThumbnail.type = selectedType;
            }
            return oldThumbnail;
        });

        setThumbnails(newThumbnails);
    }

    const Thumbnail = forwardRef((props, ref) => {
        const { data } = props;
        const thumbnailRef = useRef();

        useImperativeHandle(ref, () => ({
            getRef() {
                return thumbnailRef.current;
            }
        }));

        return (
            <HorizontalFlex gap={10} >
                <FlexChild overflowX={"hidden"}>
                    {
                        {
                            null: <UploadImage ref={thumbnailRef} name={"상품 라벨"} path={"product/" + product.id} value={data.content} />,
                            IMAGE: <UploadImage ref={thumbnailRef} name={"상품 라벨"} path={"product/" + product.id} value={data.content} />,
                            VIDEO: <UploadBiliBiliVideo ref={thumbnailRef} value={data.content} />,
                        }[data.type]
                    }
                </FlexChild>
            </HorizontalFlex>
        )
    });

    const Table = (props) => {

        return (
            <HorizontalFlex flexStart>
                <FlexChild width={"min(150px, 30%)"}>
                    <div className={style.titleArea} style={{ height: props.height ? props.height : "145px" }}>
                        <P>{props.title}</P>
                    </div>
                </FlexChild>
                <FlexChild alignItems={"flex-start"}>
                    <div className={style.contentArea}>
                        {props.content}
                    </div>
                </FlexChild>
            </HorizontalFlex>
        );
    }


    return (
        <ModalBase ref={modal} width={width} height={height} withHeader={withHeader} withFooter={withFooter} withCloseButton={withCloseButton} clickOutsideToClose={clickOutsideToClose} title={title} buttonText={buttonText} >
            <div className={style.container}>
                {product &&
                    <NavTabs buttonVisible buttons={[<Button text={t("save")} onClick={onSaveClick} />, <Button text={t("delete")} onClick={onDeleteClick} />, <Button text={t("close")} onClick={onCloseClick} />]}>
                        <NavTabChild title={t("basicInfo")}>
                            <VerticalFlex flexStart>
                                <FlexChild>
                                    <Dummy height={10} />
                                </FlexChild>
                                <FlexChild >
                                    <P size={"18pt"}>기본 정보</P>
                                </FlexChild>
                                <FlexChild>
                                    <div style={{borderBottom: "2px solid #707070"}}></div>
                                </FlexChild>
                                <FlexChild>
                                    <Table
                                        title={"상품명(한글)"}
                                        content={<InputText ref={el => (inputs.current[1] = el)} placeHolder={"상품명(한글)"} value={product.titleKr} />}
                                        height={"70px"}
                                    />
                                </FlexChild>
                                <FlexChild>
                                    <Table
                                        title={"상품명(중문)"}
                                        content={<InputText ref={el => (inputs.current[2] = el)} placeHolder={"상품명(중문)"} value={product.titleCn} />}
                                        height={"70px"}
                                    />
                                </FlexChild>
                                <FlexChild>
                                    <Table
                                        title={"해시태그(한글)"}
                                        content={<InputHashTag ref={el => (inputs.current[4] = el)} placeHolder={"해시태그(한글)"} value={product.hashTagKr || ""} />}
                                    />
                                </FlexChild>
                                <FlexChild >
                                    <Table
                                        title={"해시태그(중문)"}
                                        content={<InputHashTag ref={el => (inputs.current[5] = el)} placeHolder={"해시태그(중문)"} value={product.hashTagCn || ""} />}
                                    />
                                </FlexChild>
                                <FlexChild borderBottom={"2px solid #e7e7e7"}>
                                    <Table
                                        title={"소개"}
                                        content={<InputText ref={el => (inputs.current[6] = el)} placeHolder={"소개"} value={product.comment} />}
                                        height={"70px"}
                                    />
                                </FlexChild>
                            </VerticalFlex>
                        </NavTabChild>
                        <NavTabChild title={t("상품 이미지 등록")}>
                            <VerticalFlex flexStart>
                                <FlexChild borderBottom={"2px solid #707070"}>
                                    <P size={"18pt"}>상품 이미지 등록</P>
                                </FlexChild>
                                <FlexChild>
                                    <Table
                                        title={"대표이미지"}
                                        height={"200px"}
                                        content={
                                            <div>
                                                <VerticalFlex flexStart gap={10}>
                                                    <FlexChild>
                                                        <VerticalFlex gap={10} flexStart>
                                                            <Inline>
                                                                <img src={warning} width="5%" />
                                                                <P size={"16pt"} weight={"bold"} color={"var(--main-color)"}> 꼭 확인하세요!</P>
                                                            </Inline>
                                                            <P>- 대표이미지 제작 가이드를 준수한 상품/딜의 경우 노출 가중치가 적용됩니다.</P>
                                                            <P>- 가이드 위반시 상품 수정요청을 드릴 수 있으며 판매가 불가할 수 있습니다.</P>
                                                        </VerticalFlex>
                                                    </FlexChild>
                                                    <FlexChild>
                                                        <HorizontalFlex gap={15}>
                                                            <FlexChild width={"max-content"}>
                                                                <P cursor padding={"5px 10px"} color={"var(--main-color)"} border={"1px solid var(--main-color)"}>이미지 제작 가이드</P>
                                                            </FlexChild>
                                                            <FlexChild>
                                                                <P cursor padding={"5px 10px"} color={"#727272"} border={"1px solid #727272"}>대행 서비스 신청</P>
                                                            </FlexChild>
                                                        </HorizontalFlex>
                                                    </FlexChild>

                                                </VerticalFlex>
                                            </div>
                                        }
                                    />
                                </FlexChild>
                                <FlexChild>
                                    <Table
                                        title={"이미지 업로드"}
                                        content={
                                            <VerticalFlex flexStart gap={10}>
                                                <FlexChild>
                                                    <P size={"18pt"}>대표이미지</P>
                                                    <P>판매상품의 대표이미지 입니다.</P>

                                                </FlexChild>
                                                <FlexChild>
                                                    <UploadImage ref={el => (inputs.current[3] = el)} name={"상품 라벨"} label={t("mainImage")} path={"product/" + product.id} value={product.image} />
                                                </FlexChild>
                                            </VerticalFlex>
                                        }
                                        height={"350px"}
                                    />

                                </FlexChild>
                                <FlexChild>
                                    <Table
                                        title={"썸네일 업로드"}
                                        content={
                                            <VerticalFlex flexStart gap={10}>
                                                <FlexChild>
                                                    <P size={"18pt"}>썸네일 이미지</P>
                                                    <P>판매상품의 썸네일 입니다.</P>
                                                    <P>사진 및 영상을 넣을 수 있습니다.</P>
                                                </FlexChild>
                                                <FlexChild>
                                                    <VerticalFlex gap={10} flexStart>
                                                        <FlexChild>
                                                            <Button text={t("addThumbnail")} onClick={onAddThumbnailClick} />
                                                        </FlexChild>
                                                        <FlexChild>
                                                            <ReactDragSort
                                                                collection={thumbnails}
                                                                onChange={thumbnails => setThumbnails(thumbnails)}
                                                                Component={ThumbnailContainer}
                                                            />
                                                        </FlexChild>
                                                        <FlexChild borderBottom={"2px solid #e7e7e7"} >
                                                            <Dummy height={10} />
                                                        </FlexChild>
                                                    </VerticalFlex>
                                                </FlexChild>
                                            </VerticalFlex>
                                        }
                                        height={"650px"}
                                    />
                                </FlexChild>
                                {/* <FlexChild>
                                    <InputFile ref={el => (inputs.current[3] = el)} name={"상품 라벨"} label={t("mainImage")} path={"product/" + product.id} value={product.image} />
                                </FlexChild> */}
                                {/* <FlexChild>
                                    <Button text={t("addThumbnail")} onClick={onAddThumbnailClick} />
                                </FlexChild>
                                <FlexChild>
                                    <ReactDragSort
                                        collection={thumbnails}
                                        onChange={thumbnails => setThumbnails(thumbnails)}
                                        Component={ThumbnailContainer}
                                    />
                                </FlexChild>
                                <FlexChild borderBottom={"2px solid #e7e7e7"} >
                                    <Dummy height={10} />
                                </FlexChild> */}

                            </VerticalFlex>
                        </NavTabChild>
                        {/* <NavTabChild title={t("brandInfo")}>
                            <VerticalFlex flexStart>
                                <FlexChild height={70} >
                                    <InputText ref={el => (inputs.current[0] = el)} label={"브랜드"} labelWidth={140} placeHolder={"브랜드"} value={product.brandId} />
                                </FlexChild>
                                <FlexChild>
                                    <div className={style.brandGroup}>
                                        {brands ?
                                            brands.map((brandItem, index) =>
                                                <div key={index} className={clsx(style.icon, { [style.selected]: true })} onClick={() => inputs.current[0].setValue(brandItem.id)}>
                                                    <img src={brandItem.icon} />
                                                </div>
                                            )
                                            : null
                                        }
                                    </div>
                                </FlexChild>
                            </VerticalFlex>
                        </NavTabChild> */}
                        <NavTabChild title={t("spec")}>
                            {product &&
                                <VerticalFlex flexStart>
                                    <FlexChild borderBottom={"2px solid #707070"}>
                                        <P size={"18pt"}>상품 스펙</P>
                                    </FlexChild>
                                    <FlexChild >
                                        <Table
                                            title={"가격"}
                                            content={<InputText ref={el => (inputs.current[7] = el)} placeHolder={"가격"} value={product.price} />}
                                            height={"70px"}
                                        />
                                    </FlexChild>
                                    <FlexChild height={70} >
                                        <Table
                                            title={"수량"}
                                            content={<InputText ref={el => (inputs.current[8] = el)} placeHolder={"수량"} value={product.quantity} />}
                                            height={"70px"}
                                        />

                                    </FlexChild>
                                    <FlexChild>
                                        <Table
                                            title={"상품 스펙"}
                                            content={
                                                product.productSpecs.length > 0 &&
                                                <CTable striped hover bordered align="middle">
                                                    <CTableHead align={"center"}>
                                                        <CTableRow>
                                                            <CTableHeaderCell scope="col">{t("categorySpecType")}</CTableHeaderCell>
                                                            <CTableHeaderCell scope="col">{t("specDescription")}</CTableHeaderCell>
                                                            <CTableHeaderCell scope="col">{t("unit")}</CTableHeaderCell>
                                                            <CTableHeaderCell scope="col">{t("content")}</CTableHeaderCell>
                                                        </CTableRow>
                                                    </CTableHead>
                                                    <CTableBody>
                                                        {product.productSpecs.map((spec, index) =>
                                                            <Spec ref={el => (specRefs.current[index] = el)} data={spec} key={index} />
                                                        )}
                                                    </CTableBody>
                                                </CTable>
                                            }
                                            height={"340px"}
                                        />
                                    </FlexChild>
                                </VerticalFlex>
                            }
                        </NavTabChild>
                        <NavTabChild title={t("detailInfoKr")}>
                            <VerticalFlex height={"100%"}>
                                <FlexChild height={"100%"}>
                                    <QuillEditor ref={el => (inputs.current[9] = el)} name={"상세"} value={product.content} path={"product/" + product.id} preview={true} />
                                </FlexChild>
                            </VerticalFlex>
                        </NavTabChild>
                        <NavTabChild title={t("detailInfoCn")}>
                            <VerticalFlex height={"100%"}>
                                <FlexChild height={"100%"}>
                                    <QuillEditor ref={el => (inputs.current[10] = el)} name={"상세"} value={product.content} path={"product/" + product.id} preview={true} />
                                </FlexChild>
                            </VerticalFlex>
                        </NavTabChild>
                    </NavTabs>
                }

            </div>
        </ModalBase>
    );
});

export default ProductManagerModal;

