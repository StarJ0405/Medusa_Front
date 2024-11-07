import style from "./SearchModal.module.css";
import NiceModal from "@ebay/nice-modal-react";
import { faL, fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import VerticalFlex from "layouts/flex/VerticalFlex";
import Center from "layouts/wrapper/Center";
import ModalBase from "modals/base/ModalBase";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import useLocalStorage from "shared/hooks/useLocalStorage";
import { clone, getLocalStorage, setLocalStorage } from "shared/utils/Utils";
import P from "components/P";
import Inline from "layouts/container/Inline";
import { far } from "@fortawesome/free-regular-svg-icons";
import PaddingWrapper from "layouts/wrapper/PaddingWrapper";
import { requester } from "App";
import { useNavigate } from "react-router-dom";
import initialSearchCondition from "InitialData/InitialSearchCondition.json";

const SearchModal = NiceModal.create(
    (props, ref) => {
        const modal = useRef();
        const { t } = useTranslation();
        const [withHeader, withFooter] = [false, false];
        const [width, height] = ["100%", "100%"];
        const withCloseButton = false;
        const clickOutsideToClose = false;
        const title = "검색";
        const [placeHolder, setPlaceHolder] = useState("");
        const [keywordHistory, setKeywordHistory] = useState([]);
        const [recommendKeywords, setRecommendKeywords] = useState(["심쿵"]);
        const input = useRef();
        const navigate = useNavigate();

        useEffect(() => {
            input.current.value = "";
            input.current.focus();
            let keyword = JSON.parse(getLocalStorage("keyword"));
            setKeywordHistory(keyword);
        }, []);

        const onCloseButtonClick = () => {
            // let searchCondition = clone(initialSearchCondition);
            // navigate("/productList/search", {
            //     state: {
            //         productSearchCondition: searchCondition
            //     }
            // });
            modal.current.close();
        }

        const onSearchClick = () => {
            search();
        }

        const search = (inputKeyword) => {
            let keyword = inputKeyword || input.current.value.trim();
            let history = JSON.parse(getLocalStorage("keyword"));
            let searchCondition = clone(initialSearchCondition);
            searchCondition.keyword = keyword;
            if (keyword && keyword.length > 0) {
                if (keyword.replaceAll(" ", "") && keyword.replaceAll(" ", "").length > 0) {
                    let filtered = history.filter((row) => row !== keyword);
                    filtered.push(keyword);
                    setKeywordHistory(filtered.slice(-10,));
                    navigate("/productList/search", {
                        state: {
                            productSearchCondition: searchCondition
                        }
                    });
                    modal.current.close();
                }
            }else {
                //keyword 없이 검색한 경우
                navigate("/productList/search", {
                    state: {
                        productSearchCondition: initialSearchCondition
                    }
                });
                modal.current.close();
            }
        }

        const onHistoryDeleteClick = () => {
            NiceModal.show("confirm", {
                message: t("confirmSearchHistoryDelete"),
                confirmText: t("delete"),
                cancelText: t("cancel"),
                onConfirm: onHistoryDeleteConfirmClick,
                onCancel: onHistoryDeleteCancelClick
            });
        }

        const onHistoryDeleteConfirmClick = () => {
            setKeywordHistory([]);
        }

        const onHistoryDeleteCancelClick = () => {

        }

        const onKeyPress = (event) => {
            if (event.keyCode === 13) {
                search();
            }
        }

        useEffect(() => {
            let keywordJson = JSON.stringify(keywordHistory);
            setLocalStorage("keyword", keywordJson);
        }, [keywordHistory]);

        const Keyword = ({ text }) => {
            const onKeywordClick = () => {
                search(text);
            }

            return (
                <div className={style.keyword} onClick={onKeywordClick}>
                    <P size={12}>{text}</P>
                </div>
            );
        }

        return (
            <ModalBase ref={modal} width={width} height={height} withHeader={withHeader} withFooter={withFooter} withCloseButton={withCloseButton} clickOutsideToClose={clickOutsideToClose} title={title} borderRadius={"0px"} onKeyPress={onKeyPress}>
                <div className={style.container}>
                    <VerticalFlex gap={5}>
                        <FlexChild height={35}>
                            <HorizontalFlex>
                                <FlexChild width={50}>
                                    <div onClick={onCloseButtonClick}>
                                        <Center>
                                            <FontAwesomeIcon icon={fas["faAngleLeft"]} />
                                        </Center>
                                    </div>
                                </FlexChild>
                                <FlexChild>
                                    <div className={style.searchBar}>
                                        <HorizontalFlex>
                                            <FlexChild>
                                                <div className={style.inputArea}>
                                                    <input ref={input} className={style.inputText} type={"text"} placeholder={placeHolder} />
                                                </div>
                                            </FlexChild>
                                            <FlexChild width={50}>
                                                <div className={style.button} onClick={onSearchClick}>
                                                    <Center>
                                                        <FontAwesomeIcon icon={fas["faSearch"]} color={"white"} />
                                                    </Center>
                                                </div>
                                            </FlexChild>
                                        </HorizontalFlex>
                                    </div>
                                </FlexChild>
                            </HorizontalFlex>
                        </FlexChild>
                        <FlexChild height={"fit-content"} padding={5}>
                            {
                                keywordHistory && keywordHistory.length > 0 ?
                                    <PaddingWrapper padding={"10px 0px 10px 10px"}>
                                        <VerticalFlex gap={10}>
                                            <FlexChild>
                                                <HorizontalFlex>
                                                    <FlexChild width={"fit-content"}>
                                                        <P weight={"bold"}>{t("searchHistory")}</P>
                                                    </FlexChild>
                                                    <FlexChild></FlexChild>
                                                    <FlexChild width={30}>
                                                        <div onClick={onHistoryDeleteClick}>
                                                            <Center>
                                                                <FontAwesomeIcon icon={far["faTrashAlt"]} />
                                                            </Center>
                                                        </div>
                                                    </FlexChild>
                                                </HorizontalFlex>
                                            </FlexChild>
                                            <FlexChild height={"initial"} padding={5}>
                                                <div className={style.keywordList}>
                                                    {
                                                        keywordHistory.slice(0).reverse().map((keyword, index) =>
                                                            <Keyword key={index} text={keyword} />
                                                        )
                                                    }
                                                </div>
                                            </FlexChild>
                                        </VerticalFlex>
                                    </PaddingWrapper>
                                    : null
                            }
                        </FlexChild>
                        <FlexChild height={"fit-content"} padding={5}>
                            {
                                recommendKeywords && recommendKeywords.length > 0 ?
                                    <PaddingWrapper padding={"10px 0px 10px 10px"}>
                                        <VerticalFlex gap={10}>
                                            <FlexChild alignItems={"flex-start"}>
                                                <P weight={"bold"}>{t("recommendKeywords")}</P>
                                            </FlexChild>
                                            <FlexChild padding={5}>
                                                <div className={style.keywordList}>
                                                    {
                                                        recommendKeywords.map((keyword, index) =>
                                                            <Keyword key={index} text={keyword} />
                                                        )
                                                    }
                                                </div>
                                            </FlexChild>
                                        </VerticalFlex>
                                    </PaddingWrapper>
                                    : null
                            }
                        </FlexChild>
                    </VerticalFlex>
                </div>
            </ModalBase>
        );
    }
)

export default SearchModal;