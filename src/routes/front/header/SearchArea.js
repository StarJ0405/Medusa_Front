import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import VerticalMiddleWrapper from "layouts/wrapper/VerticalMiddleWrapper";
import style from "./SearchArea.module.css";
import VerticalFlex from "layouts/flex/VerticalFlex";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";

function SearchArea(props) {
    const [value, setValue] = useState();
    const onChange = (e) => {
        setValue(e.target.value);
    }

    useEffect(() => {
        
        props.callback(value);
    }, [value]);


    return (
        <VerticalMiddleWrapper>
            <HorizontalFlex>
                <FlexChild>
                    <div className={style.searchArea}>
                        <VerticalFlex>
                            <FlexChild height={36}>
                                <div className={style.searchBox}>
                                    <input type="text" value={value} onChange={onChange}/>
                                    <a className={style.searchButton}>
                                        <VerticalMiddleWrapper>
                                            <div className={style.searchIcon}>
                                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                                            </div>
                                        </VerticalMiddleWrapper>

                                    </a>
                                </div>
                            </FlexChild>
                            <FlexChild>
                                <div className={style.recommendKeywordArea}>
                                    <a className={style.recommendKeyword}><p>마이크로sd</p></a>
                                    <a className={style.recommendKeyword}><p>남자시계</p></a>
                                    <a className={style.recommendKeyword}><p>미용가위</p></a>
                                </div>
                            </FlexChild>
                        </VerticalFlex>
                    </div>
                </FlexChild>
            </HorizontalFlex>


        </VerticalMiddleWrapper>
    )
}

export default SearchArea;