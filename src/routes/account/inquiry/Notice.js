import { Container } from "@mui/material";
import P from "components/P";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import VerticalFlex from "layouts/flex/VerticalFlex";
import Center from "layouts/wrapper/Center";
import { useNavigate } from "react-router-dom";
import style from "./Notice.module.css"

function TableRow(props) {
    return (
        <HorizontalFlex padding={"20px"}>
            <FlexChild width={"10%"} justifyContent={"center"}>
                <P>{props.index}</P>
            </FlexChild>
            <FlexChild justifyContent={"center"}>
                <P >개인 정보 보호 정책 변경에 대한 공지</P>
            </FlexChild>
            <FlexChild justifyContent={"center"} width={"15%"}>
                <P >2022-12-01</P>
            </FlexChild>
        </HorizontalFlex>
    );
}


function Notice() {
    return (
        <>
            <FlexChild>
                <Center width={"100%"} textAlign={"left"}>
                    <P weight={"bold"} size={"16pt"}>공지사항</P>
                    <div className={style.titleLine}></div>
                </Center>
            </FlexChild>
            <FlexChild>
                <HorizontalFlex padding={"20px"} backgroundColor={"#ddd"}>
                    <FlexChild width={"10%"} justifyContent={"center"}>
                        <P weight={"bold"}>NO.</P>
                    </FlexChild>
                    <FlexChild justifyContent={"center"}>
                        <P weight={"bold"}>제목</P>
                    </FlexChild>
                    <FlexChild justifyContent={"center"} width={"15%"}>
                        <P weight={"bold"}>작성일자</P>
                    </FlexChild>
                </HorizontalFlex>
            </FlexChild>
            <FlexChild>
                <TableRow index={15} />
            </FlexChild>
            <FlexChild>
                <TableRow index={14} />
            </FlexChild>
            <FlexChild>
                <TableRow index={13} />
            </FlexChild>
            <FlexChild>
                <TableRow index={12} />
            </FlexChild>
            <FlexChild>
                <TableRow index={11} />
            </FlexChild>
        </>
    );
}

export default Notice;