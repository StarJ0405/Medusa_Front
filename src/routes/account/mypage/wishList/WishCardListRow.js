import { CButton } from "@coreui/react";
import NiceModal from "@ebay/nice-modal-react";
import { requester } from "App";
import CheckCircle from "components/inputs/checkBox/CheckCircle";
import P from "components/P";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import VerticalFlex from "layouts/flex/VerticalFlex";
import Center from "layouts/wrapper/Center";
import { BrowserDetectContext } from "providers/BrowserEventProvider";
import { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { WishReducer } from "shared/redux/reducers/shopping/WishReducer";
import { addCommas, getCurrentLanguageCode } from "shared/utils/Utils";
import style from "./WishCardListRow.module.css"
import initialSearchCondition from "InitialData/InitialSearchCondition.json";
import { clone } from "shared/utils/Utils";

function WishCardListRow(props) {
    const { data } = props;
    const { isMobile } = useContext(BrowserDetectContext);
    const [product, setProduct] = useState();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const input = useRef();
    const [checkedData, setCheckedData] = useState();
    const navigate = useNavigate();

    const callback = (index, state) => {
        if (props.callback) {
            props.callback(index, state);
        }
    }

    const onProductClick = () => {
        navigate(`/product/detail/${data.productId}`);
    }

    const addCartButtonClick = (e) => {
        e.stopPropagation();
        NiceModal.show("addCartCount", { product: product });
    }

    const onDeleteClick = () => {
        const onDeleteClick = () => {
            let requestData = { id: data.id };
            requester.deleteWishProduct(requestData, (result) => {
                if (result.code === 0) {
                    dispatch(WishReducer.actions.refreshProducts(result.data));
                }
            })
        }
        const onCancelClick = () => {

        }
        NiceModal.show("confirm", {
            message: t("confirmCartProductDelete"),
            confirmText: t("delete"),
            cancelText: t("cancel"),
            onConfirm: onDeleteClick,
            onCancel: onCancelClick
        });
    }

    useEffect(() => {
        if (data) {
            let searchCondition = clone(initialSearchCondition);
            searchCondition.productId = data.productId;
            requester.searchProducts(searchCondition, (result) => {
                setProduct(result.data[0]);
            });
        }
    }, [data])

    return (
        <>
            {
                product
                &&
                <div className={style.wrap}>
                    <HorizontalFlex gap={10}>
                        <FlexChild >
                            <div className={style.imgWrap}>
                                <img width={isMobile ? "100%" : "150px"} onClick={onProductClick} src={product.image} style={{ cursor: "pointer" }} />
                            </div>
                        </FlexChild>
                        <FlexChild width={isMobile && "35%"}>
                            <VerticalFlex>
                                <FlexChild width={"100%"}>
                                    <div className={style.contentWrap}>
                                        <P size={isMobile?12:15} weight={"bold"} color={"var(--font-color-disabled)"}>{product.brandTitle}</P>
                                        <P size={isMobile?12:15} weight={"bold"} >{product.title}</P>

                                        {/* .title{
                                            font - size: 15px;
                                        font-weight: bold;
                                        white-space: nowrap;
                                        text-overflow: ellipsis;
                                        overflow: hidden;

} */}
                                        {/* .textColor{
                                            color : var(--font-color-disabled);
                                        white-space: nowrap;
                                        text-overflow: ellipsis;
                                        overflow: hidden;
} */}
                                        {/* <p className={style.textColor}>{product.brandTitle}</p>
                                        <p className={style.title}>{product.title}</p> */}
                                        {
                                            isMobile &&
                                            <P color={"var(--main-color)"} weight={"800"} size={12} verticalAlign={"bottom"}>
                                                &#8361;{addCommas(product.price)}
                                            </P>
                                        }

                                    </div>
                                </FlexChild>
                            </VerticalFlex>
                        </FlexChild>
                        {
                            !isMobile &&
                            <FlexChild width={"15%"} justifyContent={"center"}>
                                <P color={"var(--main-color)"} weight={"800"} size={20} verticalAlign={"bottom"}>
                                    &#8361;{addCommas(product.price)}
                                </P>
                            </FlexChild>
                        }

                        <FlexChild justifyContent={"center"} width={isMobile ? "33%" : "20%"}>
                            <VerticalFlex gap={10}>
                                <CButton onClick={addCartButtonClick} className={style.button} size={"sm"} color="danger" variant="outline">{t("cart")}</CButton>
                                <CButton onClick={onDeleteClick} className={style.button} size={"sm"} color="dark" variant="outline">{t("cancel")}</CButton>
                            </VerticalFlex>
                        </FlexChild>
                    </HorizontalFlex>
                </div>
            }
        </>
    );
}

export default WishCardListRow;