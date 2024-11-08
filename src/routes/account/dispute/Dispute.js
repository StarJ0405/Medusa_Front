import P from "components/P";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import VerticalFlex from "layouts/flex/VerticalFlex";
import style from "./Dispute.module.css";
import dispute1 from "resources/img/dispute001.png";
import dispute2 from "resources/img/dispute002.png";
import dispute3 from "resources/img/dispute003.png";
import dispute4 from "resources/img/dispute004.png";
import dispute5 from "resources/img/dispute005.png";
import returnBox from "resources/img/returnBox.png";
import faqImg from "resources/img/faqImg.png";
import monitor from "resources/img/monitor.png";
import exchange from "resources/img/exchange.png";
import circleChecked from "resources/img/circleChecked.png";
import { Container } from "@mui/material";
import Center from "layouts/wrapper/Center";
import { BrowserDetectContext } from "providers/BrowserEventProvider";
import { useContext } from "react";

function Dispute() {
  const { isMobile } = useContext(BrowserDetectContext);
  return (
    <Container>
      <Container maxWidth={1200}>
        <VerticalFlex backgroundColor={"white"} gap={50} padding={"20px"}>
          <FlexChild>
            {isMobile ? (
              <VerticalFlex>
                <FlexChild>
                  <HorizontalFlex>
                    <FlexChild>
                      <img src={dispute1} width={"90%"} />
                    </FlexChild>
                    <FlexChild>
                      <VerticalFlex>
                        <FlexChild justifyContent={"center"}>
                          <P weight={"bold"} size={"16pt"}>
                            교환/환불 접수
                          </P>
                        </FlexChild>
                        <FlexChild justifyContent={"center"}>
                          <P size={"10pt"}>교환/환불 신청 접수</P>
                        </FlexChild>
                      </VerticalFlex>
                    </FlexChild>
                  </HorizontalFlex>
                </FlexChild>
                <FlexChild>
                  <HorizontalFlex>
                    <FlexChild>
                      <img src={dispute2} width={"90%"} />
                    </FlexChild>
                    <FlexChild>
                      <VerticalFlex>
                        <FlexChild justifyContent={"center"}>
                          <P weight={"bold"} size={"16pt"}>
                            상품 재포장
                          </P>
                        </FlexChild>
                        <FlexChild justifyContent={"center"}>
                          <Center>
                            <P size={"10pt"}>교환하실 상품과 메모동봉</P>
                            <P size={"10pt"}>{"(성함,연락처,교환사유 기재)"}</P>
                          </Center>
                        </FlexChild>
                      </VerticalFlex>
                    </FlexChild>
                  </HorizontalFlex>
                </FlexChild>
                <FlexChild>
                  <HorizontalFlex>
                    <FlexChild>
                      <img src={dispute3} width={"90%"} />
                    </FlexChild>
                    <FlexChild>
                      <VerticalFlex>
                        <FlexChild justifyContent={"center"}>
                          <P weight={"bold"} size={"16pt"}>
                            상품 수거
                          </P>
                        </FlexChild>
                        <FlexChild justifyContent={"center"}>
                          <Center>
                            <P size={"10pt"}>교환/환불 물건을</P>
                            <P size={"10pt"}>택배기사에게 전달</P>
                          </Center>
                        </FlexChild>
                      </VerticalFlex>
                    </FlexChild>
                  </HorizontalFlex>
                </FlexChild>
                <FlexChild>
                  <HorizontalFlex>
                    <FlexChild>
                      <img src={dispute4} width={"90%"} />
                    </FlexChild>
                    <FlexChild>
                      <VerticalFlex>
                        <FlexChild justifyContent={"center"}>
                          <P weight={"bold"} size={"16pt"}>
                            상품 확인
                          </P>
                        </FlexChild>
                        <FlexChild justifyContent={"center"}>
                          <Center>
                            <P size={"10pt"}>교환/환불 상품</P>
                            <P size={"10pt"}>판매자에게 도착</P>
                          </Center>
                        </FlexChild>
                      </VerticalFlex>
                    </FlexChild>
                  </HorizontalFlex>
                </FlexChild>
                <FlexChild>
                  <HorizontalFlex>
                    <FlexChild>
                      <img src={dispute5} width={"90%"} />
                    </FlexChild>
                    <FlexChild>
                      <VerticalFlex>
                        <FlexChild justifyContent={"center"}>
                          <P weight={"bold"} size={"16pt"}>
                            판매자 확인
                          </P>
                        </FlexChild>
                        <FlexChild justifyContent={"center"}>
                          <Center>
                            <P size={"10pt"}>교환/환불 상품 확인 후</P>
                            <P size={"10pt"}>판매자 승인 결정</P>
                          </Center>
                        </FlexChild>
                      </VerticalFlex>
                    </FlexChild>
                  </HorizontalFlex>
                </FlexChild>
              </VerticalFlex>
            ) : (
              <VerticalFlex>
                <FlexChild>
                  <HorizontalFlex>
                    <FlexChild>
                      <img src={dispute1} width={"90%"} />
                    </FlexChild>
                    <FlexChild>
                      <img src={dispute2} width={"90%"} />
                    </FlexChild>
                    <FlexChild>
                      <img src={dispute3} width={"90%"} />
                    </FlexChild>
                    <FlexChild>
                      <img src={dispute4} width={"90%"} />
                    </FlexChild>
                    <FlexChild>
                      <img src={dispute5} width={"90%"} />
                    </FlexChild>
                  </HorizontalFlex>
                </FlexChild>
                <FlexChild>
                  <HorizontalFlex>
                    <FlexChild justifyContent={"center"}>
                      <P weight={"bold"} size={"18pt"}>
                        교환/환불 접수
                      </P>
                    </FlexChild>
                    <FlexChild justifyContent={"center"}>
                      <P weight={"bold"} size={"18pt"}>
                        상품 재포장
                      </P>
                    </FlexChild>
                    <FlexChild justifyContent={"center"}>
                      <P weight={"bold"} size={"18pt"}>
                        상품 수거
                      </P>
                    </FlexChild>
                    <FlexChild justifyContent={"center"}>
                      <P weight={"bold"} size={"18pt"}>
                        상품 확인
                      </P>
                    </FlexChild>
                    <FlexChild justifyContent={"center"}>
                      <P weight={"bold"} size={"18pt"}>
                        판매자 확인
                      </P>
                    </FlexChild>
                  </HorizontalFlex>
                </FlexChild>
                <FlexChild>
                  <HorizontalFlex>
                    <FlexChild justifyContent={"center"}>
                      <P size={"8pt"}>교환/환불 신청 접수</P>
                    </FlexChild>
                    <FlexChild justifyContent={"center"}>
                      <Center>
                        <P size={"8pt"}>교환하실 상품과 메모동봉</P>
                        <P size={"8pt"}>{"(성함,연락처,교환사유 기재)"}</P>
                      </Center>
                    </FlexChild>
                    <FlexChild justifyContent={"center"}>
                      <Center>
                        <P size={"8pt"}>교환/환불 물건을</P>
                        <P size={"8pt"}>택배기사에게 전달</P>
                      </Center>
                    </FlexChild>
                    <FlexChild justifyContent={"center"}>
                      <Center>
                        <P size={"8pt"}>교환/환불 상품</P>
                        <P size={"8pt"}>판매자에게 도착</P>
                      </Center>
                    </FlexChild>
                    <FlexChild justifyContent={"center"}>
                      <Center>
                        <P size={"8pt"}>교환/환불 상품 확인 후</P>
                        <P size={"8pt"}>판매자 승인 결정</P>
                      </Center>
                    </FlexChild>
                  </HorizontalFlex>
                </FlexChild>
              </VerticalFlex>
            )}
          </FlexChild>
          <FlexChild>
            <Center width={"100%"} textAlign={"left"}>
              <P weight={"bold"} size={"18pt"}>
                교환/환불 FAQ
              </P>
            </Center>
          </FlexChild>
          <FlexChild border={"1px solid #ddd"} padding={"20px"}>
            <VerticalFlex>
              <FlexChild>
                <HorizontalFlex>
                  <FlexChild width={"initial"}>
                    <img src={returnBox} width={"100px"} />
                  </FlexChild>
                  <FlexChild padding={"0 0 0 20px"}>
                    <VerticalFlex>
                      <FlexChild>
                        <Center width={"100%"} textAlign={"left"}>
                          <P color={"black"}>반품 가능 기간은?</P>
                        </Center>
                      </FlexChild>
                      <FlexChild>
                        <Center width={"100%"} textAlign={"left"}>
                          <P size={"10pt"}>
                            단순변심(배송비 소비자 부담)은 상품 수령일로부터 7일
                            이내 신청가능합니다.
                          </P>
                        </Center>
                      </FlexChild>
                    </VerticalFlex>
                  </FlexChild>
                </HorizontalFlex>
              </FlexChild>
              <FlexChild padding={"10px 0"}>
                <div className={style.line}></div>
              </FlexChild>
              <FlexChild>
                <HorizontalFlex>
                  <FlexChild width={"initial"}>
                    <img src={faqImg} width={"100px"} />
                  </FlexChild>
                  <FlexChild padding={"0 0 0 20px"}>
                    <VerticalFlex>
                      <FlexChild>
                        <Center width={"100%"} textAlign={"left"}>
                          <P color={"black"}>
                            상품 수령일로부터 7일 이후에 상품의 문제를
                            발견한다면?
                          </P>
                        </Center>
                      </FlexChild>
                      <FlexChild>
                        <Center width={"100%"} textAlign={"left"}>
                          <P size={"10pt"}>1:1 문의를 통해 문의해 주세요.</P>
                        </Center>
                      </FlexChild>
                    </VerticalFlex>
                  </FlexChild>
                </HorizontalFlex>
              </FlexChild>
              <FlexChild padding={"10px 0"}>
                <div className={style.line}></div>
              </FlexChild>
              <FlexChild>
                <HorizontalFlex>
                  <FlexChild width={"initial"}>
                    <img src={monitor} width={"100px"} />
                  </FlexChild>
                  <FlexChild padding={"0 0 0 20px"}>
                    <VerticalFlex>
                      <FlexChild>
                        <Center width={"100%"} textAlign={"left"}>
                          <P color={"black"}>교환/환불 신청 방법은?</P>
                        </Center>
                      </FlexChild>
                      <FlexChild>
                        <Center width={"100%"} textAlign={"left"}>
                          <P size={"10pt"}>
                            마이페이지 교환/환불 신청에서 접수하시면, 입점사
                            확인 후 처리됩니다.
                          </P>
                        </Center>
                      </FlexChild>
                    </VerticalFlex>
                  </FlexChild>
                </HorizontalFlex>
              </FlexChild>
              <FlexChild padding={"10px 0"}>
                <div className={style.line}></div>
              </FlexChild>
              <FlexChild>
                <HorizontalFlex>
                  <FlexChild width={"initial"}>
                    <img src={exchange} width={"100px"} />
                  </FlexChild>
                  <FlexChild padding={"0 0 0 20px"}>
                    <VerticalFlex>
                      <FlexChild>
                        <Center width={"100%"} textAlign={"left"}>
                          <P color={"black"}>교환/환불은 언제 처리되나요?</P>
                        </Center>
                      </FlexChild>
                      <FlexChild>
                        <Center width={"100%"} textAlign={"left"}>
                          <P size={"10pt"}>
                            입점사에서 물건을 확인 후 처리되기 떄문에 시일이
                            소요될 수 있습니다.
                          </P>
                        </Center>
                      </FlexChild>
                    </VerticalFlex>
                  </FlexChild>
                </HorizontalFlex>
              </FlexChild>
            </VerticalFlex>
          </FlexChild>
          <FlexChild>
            <VerticalFlex>
              <FlexChild>
                <HorizontalFlex>
                  <FlexChild width={"initial"} padding={"0 10px 0 0"}>
                    <img src={circleChecked} width={"40px"} />
                  </FlexChild>
                  <FlexChild>
                    <P weight={"bold"} size={"16pt"}>
                      이런 경우, 교환/환불이 불가합니다.
                    </P>
                  </FlexChild>
                </HorizontalFlex>
              </FlexChild>
              <FlexChild>
                <Center width={"100%"} textAlign={"left"}>
                  <P weight={"bold"} size={"10pt"}>
                    1. 소비자의 책임이 있는 사유로 상품 등이 멸실/훼손된
                    경우(단, 상품 확인을 위한 포장 훼손 제외)
                  </P>
                  <P weight={"bold"} size={"10pt"}>
                    2. 소비자의 사용/소비에 의해 상품 등의 가치가 현저히 감소한
                    경우
                  </P>
                  <P weight={"bold"} size={"10pt"}>
                    3.시간의 결과에 의해 재판매가 곤란할 정도로 상품 등의 가치가
                    현저히 감소한 경우
                  </P>
                  <P weight={"bold"} size={"10pt"}>
                    4. 복제가 가능한 상품 등의 포장을 훼손한 경우
                  </P>
                  <P weight={"bold"} size={"10pt"}>
                    5. 판매/생산 방식의 특성상, 교환/반품시 판매자에게 회복할 수
                    없는 손해가 발생하는 경우
                  </P>
                </Center>
              </FlexChild>
            </VerticalFlex>
          </FlexChild>
        </VerticalFlex>
      </Container>
    </Container>
  );
}

export default Dispute;
