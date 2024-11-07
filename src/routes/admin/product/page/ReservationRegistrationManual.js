import VerticalFlex from "layouts/flex/VerticalFlex";
import style from "./ReservationRegistrationManual.module.css"
import FlexChild from "layouts/flex/FlexChild";
import Center from "layouts/wrapper/Center";
import P from "components/P";

function ReservationRegistrationManual() {
    return (
        <div className={style.container}>
            <VerticalFlex>
                <FlexChild>
                    <Center width={"100%"} textAlign={"left"}>
                        <P size={20} weight={"bold"}>1. 상품등록은 {"("}상품관리 {">"} 상품등록{")"} 탭에서 상품을 등록해주세요 </P>
                    </Center>
                </FlexChild>
                <FlexChild>
                    <Center width={"100%"} textAlign={"left"}>
                        <P size={20} weight={"bold"}>2. 상품 관리 탭에서는 상품및 다양한 기능을 제공합니다.</P>
                    </Center>
                </FlexChild>
                <FlexChild>
                    <Center width={"100%"} textAlign={"left"}>
                        <P size={20} weight={"bold"}>3. 주문관리 탭에서는 배송상태및 입금확인 환불현황 등 다양한 상태를 체크할 수 있습니다.</P>
                    </Center>
                </FlexChild>
                <FlexChild>
                    <Center width={"100%"} textAlign={"left"}>
                        <P size={20} weight={"bold"}>4. 회원관리 탭에서는 방문회원, 신규가입 등 전반적인 회원관리에 필요한 기능을 제공합니다.</P>
                    </Center>
                </FlexChild>
                <FlexChild>
                    <Center width={"100%"} textAlign={"left"}>
                        <P size={20} weight={"bold"}>5. 화이팅.</P>
                    </Center>
                </FlexChild>
            </VerticalFlex>
        </div>
    );
}

export default ReservationRegistrationManual;