import P from "components/P";
import FlexChild from "layouts/flex/FlexChild";
import VerticalFlex from "layouts/flex/VerticalFlex";
import Center from "layouts/wrapper/Center";
import style from "./PromotionRegister.module.css";
import PromotionRegisterDetail from "./PromotionRegisterDetail";

function PromotionRegister() {
    return (
        <div className={style.container}>
            <VerticalFlex>
                <FlexChild>
                    <div className={style.label}>
                        <Center width={"100%"} textAlign={"left"}>
                            <P>프로모션 등록</P>
                        </Center>
                    </div>
                </FlexChild>
                <FlexChild>
                    <div className={style.contentWrap}>
                        <PromotionRegisterDetail/>
                    </div>
                </FlexChild>
            </VerticalFlex>
        </div>
    );
}

export default PromotionRegister;