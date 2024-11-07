import { useParams } from "react-router-dom";
import style from "./MobileCategory.module.css";
import { getUniqColumns, getSpreadArray, normalizeArrayHeight, getGroupedList, getMultipleGroupedList, rpad, clone, deepFind } from "shared/utils/Utils";
import { useEffect, useState } from "react";
import { requester } from "App";
import VerticalFlex from "layouts/flex/VerticalFlex";
import FlexChild from "layouts/flex/FlexChild";
import P from "components/P";
import Center from "layouts/wrapper/Center";

function MobileCategoryRecommend() {
    const [hashTags, setHashTags] = useState();

    useEffect(() => {
        requester.getNewProducts((result) => {
            let productList = result.data;
            let spreadArray = getSpreadArray(productList, "hashTagKr", "#", "기타");
            const groupedByHashTag = getGroupedList(spreadArray, "hashTagKr", "children");
            setHashTags(groupedByHashTag);
        });
    }, []);

    return (
        <div className={style.container}>
            <div className={style.listWrap}>
                {
                    hashTags && hashTags.map((tag, index) =>
                        <div key={index} className={style.card}>
                            <Center>
                                <img className={style.tagImage} src={tag.children[0].image} />
                                <P size={"min(3vw, 18px)"}>{tag.hashTagKr}</P>
                            </Center>


                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default MobileCategoryRecommend;