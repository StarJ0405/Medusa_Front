import P from "components/P";
import Inline from "layouts/container/Inline";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import Center from "layouts/wrapper/Center";
import FlagWrapper from "layouts/wrapper/FlagWrapper";
import PaddingWrapper from "layouts/wrapper/PaddingWrapper";
import SquareWrapper from "layouts/wrapper/SquareWrapper";
import { addCommas } from "shared/utils/Utils";
import style from "./SpecialPriceCard.module.css"

function SpecialPriceCard(props) {
    const { data } = props;

    return (
        <div className={style.card}>
            <FlagWrapper
                // backgroundColor={"#eee"}
                flagWidth={50}
                flagTopHeight={15}
                flagLeft={10}
                flagColor={"var(--main-color)"}
                flagShadowColor={"var(--main-color-dark)"}
                flagBorderColor={"var(--main-color)"}
                flag={"SALE"}
                flagTextColor={"white"}
                flagTextSize={"15px"}
                subtitleTextSize={"15px"}
                subtitleTextColor={"black"}>
                <div className={style.thumbnail} style={{ backgroundColor: `${data.bgColor}11` }}>
                    <Center>
                        <img className={style.image} src={data.image} />
                    </Center>

                </div>
                <Center width={"100%"} textAlign={"left"}>
                    <P size={"20px"} weight={"bold"}>{data.brandTitleKr}</P>
                    <Inline>
                        <P size={"12px"} color={"#6f6f6f"}>익일배송</P>
                        <P size={"12px"} color={"var(--main-color)"}>{" ★ "}</P>
                        <P size={"12px"} color={"#6f6f6f"}>4.7점</P>
                    </Inline>
                    <P size={"12px"} color={"#6f6f6f"}>무료배송 가능</P>
                    <HorizontalFlex>
                        <FlexChild>
                            <P size={"12px"} color={"#6f6f6f"}>복숭아향 / 2mg</P>
                        </FlexChild>
                        <P size={"20px"} weight={"bold"} color={"var(--main-color)"}>&#8361; {addCommas(data.price)}</P>
                    </HorizontalFlex>
                </Center>
            </FlagWrapper>



        </div>

    );
}

export default SpecialPriceCard;