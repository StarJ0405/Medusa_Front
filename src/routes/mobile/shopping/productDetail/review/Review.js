import { requester } from "App";
import P from "components/P";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import VerticalFlex from "layouts/flex/VerticalFlex";
import Center from "layouts/wrapper/Center";
import { useEffect } from "react";
import style from "./Review.module.css"

function Review(props) {
    const { data } = props;

    const onDeleteClick = () => {
        if (props.callback) {
            const id = data.id
            props.onDeleteClick(id);
        }
    }

    return (
        <div className={style.reviewArea}>
            <div className={style.buttonWrap} onClick={onDeleteClick}>
                <Center>
                    <P size={18}>{' '}&times;{' '}</P>
                </Center>
            </div>
            <VerticalFlex gap={5}>
                <FlexChild>
                    <div className={style.area}>
                        <p className={style.user}>guest</p>
                    </div>
                </FlexChild>
                <FlexChild>
                    <HorizontalFlex >
                        <FlexChild>
                            <div className={style.area}>
                                <p>★★★★★{data.score}점</p>
                            </div>
                        </FlexChild>
                    </HorizontalFlex>
                </FlexChild>
                <FlexChild>
                    <div className={style.area}>
                        <p>{data.content}</p>
                    </div>
                </FlexChild>
            </VerticalFlex>
        </div >
    );
}

export default Review;