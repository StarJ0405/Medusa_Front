
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import style from "./CourierInterlocking.module.css";
import FlexChild from "layouts/flex/FlexChild";
import CustomIcon from "components/icons/CustomIcon";
import Center from "layouts/wrapper/Center";
import P from "components/P";
import { useParams } from "react-router-dom";
import VerticalFlex from "layouts/flex/VerticalFlex";
import { useEffect, useState } from "react";
import { Switch } from "@mui/material";
import CustomButton from "components/buttons/CustomButton";

function CourierInterlocking() {
    const [isDraggable, setDraggable] = useState(false);
    const [isDraggable2, setDraggable2] = useState(false);
    const [isDraggable3, setDraggable3] = useState(false);

    const onDraggable1Click = () => {
        setDraggable(!isDraggable);
    }
    const onDraggable2Click = () => {
        setDraggable2(!isDraggable2);
    }
    const onDraggable3Click = () => {
        setDraggable3(!isDraggable3);
    }

    return (
        <div className={style.wrap}>
            <VerticalFlex gap={30}>
                <FlexChild>
                    <div className={style.label}>
                        <Center width={"100%"} textAlign={"left"}>
                            <P weight={"bold"}>택배연동</P>
                        </Center>
                    </div>

                </FlexChild>
                <FlexChild>
                    <HorizontalFlex padding={"10px"}>
                        <FlexChild>
                            <Center width={"100%"} textAlign={"left"}>
                                <P weight={"bold"} size={17} padding={"10px"}>사용하실 택배사를 선택해주세요 </P>
                            </Center>
                        </FlexChild>
                        <FlexChild justifyContent={"flex-end"}>
                            <CustomButton text={"저장"} />
                        </FlexChild>
                    </HorizontalFlex>
                </FlexChild>
                <FlexChild>

                    <div className={style.switch}>
                        <Switch onClick={onDraggable1Click} checked={isDraggable} /><P weight={"bold"}>우체국</P>
                    </div>
                    <div className={style.switch}>
                        <Switch onClick={onDraggable2Click} checked={isDraggable2} /><P weight={"bold"}>대한통운</P>
                    </div>
                    <div className={style.switch}>
                        <Switch onClick={onDraggable3Click} checked={isDraggable3} /><P weight={"bold"}>굿스플</P>
                    </div>

                </FlexChild>
                <FlexChild>
                    <Center width={"100%"} textAlign={"left"}>
                        <P weight={"bold"} color={"#aaa"} padding={"10px"}>평균 배송기간</P>
                        <P weight={"bold"} color={"#aaa"} padding={"10px"}>우체국 : 영업일 기준 3 ~ 7일 소요</P>
                        <P weight={"bold"} color={"#aaa"} padding={"10px"}>대한통운 : 영업일 기준 5 ~ 9일 소요</P>
                        <P weight={"bold"} color={"#aaa"} padding={"10px"}>우체국 : 영업일 기준 7 ~ 10일 소요</P>
                        <P weight={"bold"} color={"#aaa"} padding={"10px"}>배송은 해당 업체사정에 따라 변경될 수 있습니다</P>
                    </Center>
                </FlexChild>
            </VerticalFlex>
        </div>
    );
}

export default CourierInterlocking;