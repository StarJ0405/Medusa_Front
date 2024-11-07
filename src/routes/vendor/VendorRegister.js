import P from "components/P";
import FlexChild from "layouts/flex/FlexChild";
import VerticalFlex from "layouts/flex/VerticalFlex";
import Center from "layouts/wrapper/Center";
import style from "./VendorRegister.module.css";
import VendorRegisterDetail from "./VendorRegisterDetail";


function VendorRegister() {
    return (
        <div className={style.container}>
            <VerticalFlex>
                <FlexChild>
                    <div className={style.label}>
                        <Center width={"100%"} textAlign={"left"}>
                            <P>입점사 등록 </P>
                        </Center>
                    </div>
                </FlexChild>
                <FlexChild>
                    <div className={style.contentWrap}>
                        <VendorRegisterDetail/>
                    </div>
                </FlexChild>
            </VerticalFlex>
        </div>
    );
}

export default VendorRegister;