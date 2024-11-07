import { requester } from "App";
import P from "components/P";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import VerticalFlex from "layouts/flex/VerticalFlex";
import Center from "layouts/wrapper/Center";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import style from "./MobileWishListRow.module.css"
import NiceModal from "@ebay/nice-modal-react";
import { useTranslation } from "react-i18next";
import { WishReducer } from "shared/redux/reducers/shopping/WishReducer";
import initialSearchCondition from "InitialData/InitialSearchCondition.json";
import { addCommas, clone } from "shared/utils/Utils";

function MobileWishListRow(props) {
    const { data } = props;
    const [product, setProduct] = useState();
    const dispatch = useDispatch();
    const { t } = useTranslation();

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
            {product
                ?
                <div className={style.productWrap}>
                    <div className={style.buttonWrap} onClick={onDeleteClick}>
                        <Center>
                            <P size={18}>{' '}&times;{' '}</P>
                        </Center>
                    </div>
                    <HorizontalFlex gap={10} alignItems={"flex-end"}>
                        <FlexChild width={150} >
                            <div className={style.imgWrap} style={{ backgroundColor: `${product.bgColor}11` }} >
                                <img src={product.image} className={style.img} />
                            </div>
                        </FlexChild>
                        <FlexChild>
                            <VerticalFlex>
                                <FlexChild>
                                    <div className={style.contentWrap}>
                                        <p className={style.title}>{`${product.brandTitleKr} ${product.titleKr}`}</p>
                                        <p className={style.tag}>{product.hashTagKr}</p>
                                    </div>
                                </FlexChild>
                                <FlexChild alignItems={"flex-end"}>
                                    <P color={"#c4c4c4"} weight={"500"} size={"4vw"} min={"15px"} max={"44px"} verticalAlign={"bottom"} textDecoration={"line-through"}>
                                        &#8361;{addCommas(product.price)}
                                    </P>
                                </FlexChild>
                                <FlexChild>
                                    <HorizontalFlex justifyContent={"flex-end"} alignItems={"flex-end"}>
                                        <FlexChild justifyContent={"flex-end"}>
                                            <P color={"var(--main-color)"} weight={"800"} size={"5vw"} min={"15px"} max={"44px"} verticalAlign={"bottom"}>
                                                &#8361;{addCommas(product.price)}
                                            </P>
                                        </FlexChild>
                                    </HorizontalFlex>
                                </FlexChild>
                            </VerticalFlex>
                        </FlexChild>
                    </HorizontalFlex>
                </div>
                :
                null}
        </>
    );
}

export default MobileWishListRow;