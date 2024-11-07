import VerticalFlex from "layouts/flex/VerticalFlex";
import style from "./VendorManagement.module.css";
import FlexChild from "layouts/flex/FlexChild";
import Center from "layouts/wrapper/Center";
import P from "components/P";
import VendorManagementDetail from "./VendorManagementDetail";

function VendorManagement() {
    return (
        <div className={style.container}>
            <VerticalFlex>
                <FlexChild>
                    <div className={style.label}>
                        <Center width={"100%"} textAlign={"left"}>
                            <P>입점사 현황 </P>
                        </Center>
                    </div>
                </FlexChild>                    
                <FlexChild>
                    <div className={style.contentWrap}>
                        <VendorManagementDetail />
                    </div>
                </FlexChild>
            </VerticalFlex>
        </div>
    );
}

export default VendorManagement;