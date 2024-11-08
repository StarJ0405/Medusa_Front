import VerticalFlex from "layouts/flex/VerticalFlex";
import style from "./MemberStatisticsTotal.module.css";
import FlexChild from "layouts/flex/FlexChild";
import Center from "layouts/wrapper/Center";
import P from "components/P";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import CustomIcon from "components/icons/CustomIcon";
import Inline from "layouts/container/Inline";
import { useEffect, useState } from "react";
import { requester, adminRequester } from "App";

function MemberStatisticsTotal() {
  const [data, setData] = useState();

  useEffect(() => {
    adminRequester.getStatistic({ status: "visit" }, (result) => {
      setData(result.data);
    });
  }, []);

  const onClick = (e) => {
    console.log("click");
  };
  return (
    <div className={style.wrap}>
      <VerticalFlex gap={5}>
        <FlexChild>
          <Center width={"100%"} textAlign={"left"}>
            <P weight={"bold"}>통계</P>
          </Center>
        </FlexChild>
        <FlexChild>
          <HorizontalFlex gap={10}>
            {data &&
              data.map((data, index) => (
                <FlexChild key={index}>
                  <VerticalFlex>
                    <FlexChild>
                      <div className={style.boxArea}>
                        <Center>
                          <P
                            size={"14pt"}
                            cursor
                            weight={"bold"}
                            color={"#5471e6"}
                          >
                            {data.count}
                          </P>
                          <P cursor onClick={onClick}>
                            {data.text}
                          </P>
                        </Center>
                      </div>
                    </FlexChild>
                  </VerticalFlex>
                </FlexChild>
              ))}
          </HorizontalFlex>
        </FlexChild>
      </VerticalFlex>
    </div>
  );
}

export default MemberStatisticsTotal;
