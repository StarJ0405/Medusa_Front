import style from "./WorkSharing.module.css";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import CustomIcon from "components/icons/CustomIcon";
import P from "components/P";
import Inline from "layouts/container/Inline";
import Center from "layouts/wrapper/Center";
import VerticalFlex from "layouts/flex/VerticalFlex";

function WorkSharing() {
  const date = new Date();
  return (
    <div className={style.wrap}>
      <VerticalFlex gap={5}>
        <FlexChild>
          <div className={style.label}>
            <FlexChild>
              <Center>
                <P color={"white"} weight={"bold"}>
                  업무공유
                </P>
              </Center>
            </FlexChild>
          </div>
        </FlexChild>
        <FlexChild>
          <div className={style.textWrap}>
            <VerticalFlex gap={10}>
              <FlexChild>
                <Center width={"100%"} textAlign={"left"}>
                  <P>{`${date.getMonth() + 1}월 ${date.getDate()}일`}</P>
                </Center>
              </FlexChild>
              <FlexChild>
                <Center width={"100%"} textAlign={"left"}>
                  <P>{">"} 일정이 없습니다.</P>
                </Center>
              </FlexChild>
            </VerticalFlex>
          </div>
        </FlexChild>
      </VerticalFlex>
    </div>
  );
}

export default WorkSharing;
