import { cilCreditCard } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { Autocomplete, Radio, RadioGroup } from "@mui/material";
import { requester } from "App";
import P from "components/P";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import VerticalFlex from "layouts/flex/VerticalFlex";
import { AuthContext } from "providers/AuthProvider";
import { useContext, useEffect, useState } from "react";
import style from "./AccountNo.module.css";

function AccountNo(props) {
    const [user, setUser] = useState();
    const { userName } = useContext(AuthContext);

    useEffect(() => {
        requester.findSelf((result) => {
            setUser(result.data);
        });
    }, [userName]);
    return (
        <VerticalFlex>

            <FlexChild>
                <div className={style.paymentMethodArea}>
                    <HorizontalFlex backgroundColor={"white"} padding={5} gap={10}>
                        {/* <FlexChild>
                <PaddingWrapper padding={"5px 0px"}>
                    <img className={style.paymentMethodIcon} src={paymentMethod.icon} />
                </PaddingWrapper>
            </FlexChild> */}
                        <FlexChild>
                            {/* <Center> */}
                            <HorizontalFlex alignItems={"flex-start"} justifyContent={"flex-start"}>
                                <FlexChild width={5} />

                                <FlexChild width={30}>
                                    <CIcon icon={cilCreditCard} size={"lg"} />
                                </FlexChild>
                                <FlexChild width={"initial"}>
                                    <P>{"국민은행"}</P>
                                </FlexChild>
                                <FlexChild width={30} />
                                <FlexChild width={"initial"}>
                                    {/* <P>{paymentMethod.title}</P> */}
                                    <P>{"예금주 : 월드인터네셔널"}</P>
                                </FlexChild>
                                <FlexChild width={30} />
                                <FlexChild>
                                    <P>{user && user.accountNo}</P>
                                </FlexChild>
                            </HorizontalFlex>
                            {/* </Center> */}
                        </FlexChild>
                    </HorizontalFlex>
                </div>
            </FlexChild>
        </VerticalFlex>
    );
}

export default AccountNo;