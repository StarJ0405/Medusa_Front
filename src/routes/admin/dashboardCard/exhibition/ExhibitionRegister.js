import VerticalFlex from "layouts/flex/VerticalFlex";
import style from "./ExhibitionRegister.module.css"
import FlexChild from "layouts/flex/FlexChild";
import Center from "layouts/wrapper/Center";
import P from "components/P";
import ExhibitionRegisterDetail from "./ExhibitionRegisterDetail";

function ExhibitionRegister() {
    return (
        <div className={style.container}>
            <VerticalFlex>
                <FlexChild>
                    <div className={style.label}>
                        <Center width={"100%"} textAlign={"left"}>
                            <P>기획전 등록</P>
                        </Center>
                    </div>
                </FlexChild>
                <FlexChild>
                    <div className={style.contentWrap}>
                        <ExhibitionRegisterDetail />
                    </div>
                </FlexChild>
            </VerticalFlex>
        </div>
    );
}

export default ExhibitionRegister;