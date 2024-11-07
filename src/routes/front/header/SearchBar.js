import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import Center from "layouts/wrapper/Center";
import { clone, getLocalStorage } from "shared/utils/Utils";
import style from "./SearchBar.module.css";
import initialSearchCondition from "InitialData/InitialSearchCondition.json";
import { useNavigate } from "react-router-dom";

const { forwardRef, useImperativeHandle, useRef } = require("react");

const SearchBar = forwardRef((props, ref) => {
    const navigate = useNavigate();
    const input = useRef();
    const { width, height, color, borderSize, borderRadius } = props;

    const onKeyUp = (e) => {
        if(e.keyCode === 13){
            search();
        }
    }

    const onSearchClick = () => {
        search();
    }

    const search = () => {
        let keyword = input.current.value.trim();
        let history = JSON.parse(getLocalStorage("keyword"));
        let searchCondition = clone(initialSearchCondition);
        searchCondition.keyword = keyword;
        if (keyword && keyword.length > 0) {
            if (keyword.replaceAll(" ", "") && keyword.replaceAll(" ", "").length > 0) {
                navigate("/productList/search", {
                    state: {
                        productSearchCondition: searchCondition
                    }
                });
            }
        }else {
            //keyword 없이 검색한 경우
            navigate("/productList/search", {
                state: {
                    productSearchCondition: initialSearchCondition
                }
            });
        }
    }

    useImperativeHandle(ref, () => ({
        getValue() {
            // return value;
        },
        setValue(value) {
            // setValue(value);
        },
        isValid() {
            // return isValid;
        },
        focus() {
        }
    }));

    return (
        <div className={style.wrap}>
            <HorizontalFlex>
                <FlexChild>
                    <input ref={input} className={style.input} type="text" onKeyUp={onKeyUp}/>
                </FlexChild>
                <FlexChild width={50}>
                    <div className={style.icon} onClick={onSearchClick}>
                        <Center>
                            <FontAwesomeIcon icon={fas["faSearch"]} />
                        </Center>
                    </div>
                </FlexChild>
            </HorizontalFlex>
        </div>
    );
});

export default SearchBar;