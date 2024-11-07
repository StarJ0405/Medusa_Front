import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import style from "./MobileSearchBar.module.css";
import NiceModal from "@ebay/nice-modal-react";

function MobileSearchBar(props) {
    const onSearchInputFocus = () => {
        NiceModal.show("search");
    }

    return (
        <div className={style.searchBarArea}>
            <div className={style.searchBar}>
                <HorizontalFlex>
                    <FlexChild>
                        <div className={style.searchTextArea}>
                            <input className={style.searchTextInput} type="text" value={props.keyword} onFocus={onSearchInputFocus} />
                        </div>
                    </FlexChild>
                    <FlexChild width={50} height={30}>
                        <div className={style.searchButtonArea}>
                            <FontAwesomeIcon icon={fas["faSearch"]} color={"var(--main-color)"} />
                        </div>
                    </FlexChild>
                </HorizontalFlex>
            </div>
        </div>
    );
}

export default MobileSearchBar;