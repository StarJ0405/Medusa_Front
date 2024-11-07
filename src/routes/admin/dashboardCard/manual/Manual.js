import VerticalFlex from "layouts/flex/VerticalFlex";
import style from "./Manual.module.css";
import FlexChild from "layouts/flex/FlexChild";
import P from "components/P";
import Center from "layouts/wrapper/Center";
import CustomIcon from "components/icons/CustomIcon";
import HorizontalFlex from "layouts/flex/HorizontalFlex";


function Manual() {
    const manual = [
        {
            text: "상품관리 메뉴얼",
            icon: <CustomIcon name={"productManagement"}  width={20} />,
            line: true
        },
        {
            text: "주문/취소 메뉴얼",
            icon: <CustomIcon name={"orderList"} color={"var(--main-color)"} width={20} />,
            line: true
        },
        {
            text: "디자인 메뉴얼",
            icon: <CustomIcon name={"design"} color={"var(--main-color)"} width={20} />,
            line: true
        },
        {
            text: "설정/기타메뉴얼",
            icon: <CustomIcon name={"setting"} color={"var(--main-color)"} width={20} />,
            line: false
        }
    ]
    const onClick = (e) => {
        console.log("click");
    }
    return (
        <div className={style.wrap}>
            <VerticalFlex gap={10}>
                <FlexChild>
                    <Center width={"90%"} textAlign={"left"}>
                        <P weight={"bold"}>메뉴얼</P>
                    </Center>
                </FlexChild>
                {
                    manual &&
                    manual.map((data, index) => (
                        <FlexChild key={index}>
                            <VerticalFlex gap={5}>
                                <FlexChild>
                                    <HorizontalFlex gap={10}>
                                        <FlexChild width={"max-content"}>
                                            {data.icon}
                                        </FlexChild>
                                        <FlexChild>
                                            <P >{data.text}</P>
                                        </FlexChild>
                                    </HorizontalFlex>
                                </FlexChild>
                                {
                                    data.line &&
                                    <FlexChild width={"95%"}>
                                        <div className={style.line} />
                                    </FlexChild>
                                }
                            </VerticalFlex>
                        </FlexChild>
                    ))
                }
            </VerticalFlex>
        </div>
    );
}

export default Manual;