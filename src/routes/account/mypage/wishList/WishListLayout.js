import P from "components/P";
import Container from "layouts/container/Container";
import FlexChild from "layouts/flex/FlexChild";
import VerticalFlex from "layouts/flex/VerticalFlex";
import Center from "layouts/wrapper/Center";
import { AuthContext } from "providers/AuthProvider";
import { BrowserDetectContext } from "providers/BrowserEventProvider";
import { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import WishCardList from "./WishCardList";
import NiceModal from "@ebay/nice-modal-react";
import MypageContentHeader from "../header/MypageContentHeader";

function WishListLayout() {
    const { t } = useTranslation();
    const { isMobile } = useContext(BrowserDetectContext);

    return (
        <Container backgroundColor={"white"}>
            <VerticalFlex>
                <FlexChild>
                    <VerticalFlex>
                        {/* <FlexChild padding={"0 0 10px 0"}>
                            <Center width={"100%"} textAlign={"left"}>
                                <P size={"16pt"} weight={"bold"} padding={"5px"}>{t("wishList")}</P>
                            </Center>
                        </FlexChild> */}
                        <FlexChild>
                            {
                                isMobile &&
                                <MypageContentHeader />
                            }
                        </FlexChild>
                    </VerticalFlex>
                </FlexChild>
                <FlexChild>
                    <WishCardList />
                </FlexChild>
            </VerticalFlex>
        </Container>
    );
}

export default WishListLayout;