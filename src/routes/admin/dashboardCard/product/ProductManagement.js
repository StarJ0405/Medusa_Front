import VerticalFlex from "layouts/flex/VerticalFlex";
import style from "./ProductManagement.module.css";
import FlexChild from "layouts/flex/FlexChild";
import Center from "layouts/wrapper/Center";
import P from "components/P";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import CustomIcon from "components/icons/CustomIcon";
import Inline from "layouts/container/Inline";
import { useEffect, useState } from "react";
import { requester, adminRequester } from "App";
import { useTranslation } from "react-i18next";

function ProductManagement() {
  const [mounted, setMounted] = useState(false);
  const [data, setData] = useState();
  const { t } = useTranslation();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      adminRequester.getProductStatus((result) => {
        setData(result.data);
      });
    }
  }, [mounted]);

  const onClick = (e) => {
    console.log("click");
  };

  return (
    <div className={style.wrap}>
      <VerticalFlex gap={5}>
        <FlexChild>
          <div className={style.label}>
            <HorizontalFlex padding={"0 10px"}>
              <FlexChild>
                <HorizontalFlex gap={5}>
                  <FlexChild width={50}>
                    <Center width={"100%"}>
                      <CustomIcon
                        name={"productManagement"}
                        color={"white"}
                        width={20}
                      />
                    </Center>
                  </FlexChild>
                  <FlexChild>
                    <Center width={"100%"} textAlign={"left"}>
                      <P color={"white"} weight={"bold"}>
                        상품관리
                      </P>
                    </Center>
                  </FlexChild>
                </HorizontalFlex>
              </FlexChild>
              <FlexChild width={"max-content"}>
                <VerticalFlex>
                  <FlexChild>
                    <P size={"14pt"} color={"white"}>
                      {">"}
                    </P>
                  </FlexChild>
                </VerticalFlex>
              </FlexChild>
            </HorizontalFlex>
          </div>
        </FlexChild>
        <FlexChild>
          <div className={style.boxWrap}>
            {data && (
              <HorizontalFlex gap={10}>
                <FlexChild>
                  <div className={style.boxArea}>
                    <VerticalFlex gap={5}>
                      <FlexChild>
                        <Center>
                          <P onClick={onClick}>{t("almostOutOfStock")}</P>
                        </Center>
                      </FlexChild>
                      <FlexChild>
                        <Center>
                          <Inline>
                            <P size={"14pt"} weight={"bold"} color={"#5471e6"}>
                              {data.min}
                            </P>
                            <P> 건</P>
                          </Inline>
                        </Center>
                      </FlexChild>
                    </VerticalFlex>
                  </div>
                </FlexChild>
                <FlexChild>
                  <div className={style.boxArea}>
                    <VerticalFlex gap={5}>
                      <FlexChild>
                        <Center>
                          <P onClick={onClick}>{t("needToBeManaged")}</P>
                        </Center>
                      </FlexChild>
                      <FlexChild>
                        <Center>
                          <Inline>
                            <P size={"14pt"} weight={"bold"} color={"#5471e6"}>
                              {data.help}
                            </P>
                            <P> 건</P>
                          </Inline>
                        </Center>
                      </FlexChild>
                    </VerticalFlex>
                  </div>
                </FlexChild>
                <FlexChild>
                  <div className={style.boxArea}>
                    <VerticalFlex gap={5}>
                      <FlexChild>
                        <Center>
                          <P onClick={onClick}>{t("hotProduct")}</P>
                        </Center>
                      </FlexChild>
                      <FlexChild>
                        <Center>
                          <Inline>
                            <P size={"14pt"} weight={"bold"} color={"#5471e6"}>
                              {data.popular}
                            </P>
                            <P> 건</P>
                          </Inline>
                        </Center>
                      </FlexChild>
                    </VerticalFlex>
                  </div>
                </FlexChild>
              </HorizontalFlex>
            )}
          </div>
        </FlexChild>
      </VerticalFlex>
    </div>
  );
}

export default ProductManagement;
