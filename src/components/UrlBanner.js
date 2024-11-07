import P from "components/P";
import Container from "layouts/container/Container";
import FlexChild from "layouts/flex/FlexChild";
import VerticalFlex from "layouts/flex/VerticalFlex";
import style from "./UrlBanner.module.css";

function UrlBanner(props) {
    return (
        <div className={style.banner} style={{ backgroundImage: `url(${props.backgroundImage})` }}>
            <Container maxWidth={1200} padding={15}>
                <VerticalFlex>
                    <FlexChild></FlexChild>
                    <FlexChild height={"initial"} alignItems={"flex-start"}>
                        <P size={"40px"} color={"white"} fontWeight={"bold"}>{props.title}</P>
                        <P size={"18px"} color={"white"} fontWeight>{props.subTitle}</P>
                    </FlexChild>
                </VerticalFlex>
            </Container>
        </div>
    );
}

export default UrlBanner;
