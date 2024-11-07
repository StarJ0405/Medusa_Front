import style from "./BuyerProtection.module.css"
import VerticalFlex from "layouts/flex/VerticalFlex";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import Container from "layouts/container/Container";
import ButtonEclipse from "components/buttons/ButtonEclipse";



function BuyerProtection() {
    return (
        <Container width={1200}>
            <VerticalFlex>
                <FlexChild height={190}>
                    <div className={style.titleContainer}>
                        <div className={style.titleWrap}>
                            <p className={style.title}>구매자 보호</p>
                            <p className={style.subTitle}>자신있게 쇼핑하세요</p>
                        </div>
                    </div>
                </FlexChild>
                <FlexChild height={600}>
                    <div className={style.refundContainer}>
                        <VerticalFlex>

                            <FlexChild>
                                <HorizontalFlex>
                                    <FlexChild width={350}></FlexChild>
                                    <FlexChild>
                                        <div>
                                            <p className={style.refunded}>환불 보증</p>
                                            <p className={style.refundedContent}>환불 보증받으신 상품이 설명된 것과 다르거나
                                                구매자 보호 기간 내에 배송되지 않았다면 환불을 약속 드립니다.
                                                불만 처리 절차가 끝나고 15일 후 대금을 돌려받으실 수 있습니다.
                                                소비자의 권리는 고객님의 거주국에서 적용하는 모든 법적 규정이 정한 바에 따라 추가로 보장되며 제한되지 않습니다.
                                            </p>


                                            <p className={style.link}>이용 약관</p>
                                        </div>

                                    </FlexChild>
                                </HorizontalFlex>
                            </FlexChild>
                            <FlexChild height={10}>
                                <div className={style.border}></div>
                            </FlexChild>
                            <FlexChild>
                                <HorizontalFlex>
                                    <FlexChild>
                                        <div className={style.refundedItem}>
                                            <p className={style.refundedItemTitle}>1. 판매자와 연락하기</p>
                                            <p className={style.refundedContent}>주문 내역으로 이동하여 물품을 선택하세요.
                                                판매자와 이 문제를 토론하고
                                                가능한 해결 방법을 확인합니다.
                                            </p>
                                        </div>
                                    </FlexChild>
                                    <FlexChild>
                                        <div className={style.refundedItem}>
                                            <p className={style.refundedItemTitle}>2. 환불 신청</p>
                                            <p className={style.refundedContent}>판매자와 원만하게 해결되지 못한 경우,
                                                상품 수령 후 15일 이내 또는 상품 수령
                                                확인 기간 종료 시점에(주문 상세 내역에 기재된 바와 같이)
                                                불만을 접수하실 수 있습니다.
                                            </p>
                                        </div>
                                    </FlexChild>
                                    <FlexChild>
                                        <div className={style.refundedItem}>
                                            <p className={style.refundedItemTitle}>3. 15일 이내에 돈을 돌려받기</p>
                                            <p className={style.refundedContent}>그러나 대부분의 판매자는 15일 이내에 돈을 반환하지만
                                                해결되지 않을 경우 주문 세부 정보 페이지에서
                                                AliExpress에 문의하여 분쟁을 확대시킬 수 있습니다.
                                            </p>
                                        </div>
                                    </FlexChild>
                                </HorizontalFlex>
                            </FlexChild>
                        </VerticalFlex>
                    </div>
                </FlexChild>
                <FlexChild>
                    <div className={style.refundGuideContainer}>
                        <HorizontalFlex>
                            <FlexChild width={350}></FlexChild>
                            <VerticalFlex>
                                <FlexChild>
                                    <div>
                                        <p className={style.refundGuideTitle}>무료 반품</p>
                                        <p className={style.refundGuideContent}>'무료 반품' 서비스를 제공하는 판매자는 제품 상세 페이지에
                                            '무료 반품' 아이콘을 넣어야 합니다.
                                            '무료 반품' 서비스는 15일 동안(배송일 이후) 사용하지 않고
                                            세척하지 않은 원 상태
                                            (포장, 택 등이 원래대로 되어있어야 합니다)
                                            의 제품 구매를 확정하실 것인지 혹은 어떤 이유로 인해
                                            반품하실 것인지 결정하실 수 있습니다. 쉽고 빠릅니다:</p>
                                    </div>
                                </FlexChild>
                                <FlexChild>
                                    <div>
                                        <p className={style.refundGuideSubTitle}>손쉬운</p>
                                        <p className={style.refundGuideContent}>• 거주지에서 손쉽게 반품하세요.
                                            1{")"} 반품 코드 또는 라벨을 받습니다.
                                            2{")"} 도어 투 도어 픽업 서비스를 기다리거나 지정된 서비스 장소에 물품을 가져갑니다.
                                            3{")"} 마지막으로 지역 물류창고의 반품 상품 수령 확인을 기다립니다.
                                        </p>
                                        <p className={style.refundGuideContent}>• 이의를 제기하실 때 '반품 상품'을 선택하시는 것을 잊지 마세요.</p>
                                    </div>
                                </FlexChild>
                                <FlexChild>
                                    <div>
                                        <p className={style.refundGuideSubTitle}>빠른 처리</p>
                                        <p className={style.refundGuideContent}>• 환불은 반품된 상품이 반품 조건을 충족하는 것을 저희가 확인한 후에 진행됩니다.</p>
                                        <p className={style.refundGuideContent}>• 제품은 판매자의 국가(예: 중국)로 보내지는 대신에 지역의 물류 창고에서 처리됩니다.</p>
                                    </div>
                                </FlexChild>
                                <FlexChild>
                                    <div>
                                        <p className={style.refundGuideSubTitle}>서비스 범위</p>
                                        <p className={style.refundGuideContent}>• 무료 반품 서비스가 적용되는 지역은 제한되어 있습니다.
                                            현시점 기준으로 해당 서비스 사용이 가능한 국가는
                                            대한민국, 미국 본토, 캐나다, 호주, 영국, 프랑스,
                                            스페인, 독일, 러시아, 사우디아라비아, UAE, 이탈리아,
                                            네덜란드, 폴란드, 브라질, 이스라엘입니다.
                                        </p>
                                        <p className={style.refundGuideContent}>
                                            • 게다가 AliExpress.com의 모든 제품이 무료 반품 서비스를 제공하는 것은 아닙니다.
                                            판매자는 이 추가 서비스를 제공할지 여부를 선택할 수 있습니다.
                                            무료 반품 서비스를 제공하는 판매자는 제품 상세 페이지에서
                                            서비스 제공 여부를 라벨 및 아이콘으로 표시합니다.
                                        </p>
                                    </div>
                                </FlexChild>
                                <FlexChild height={350}>
                                    <div>
                                        <p className={style.refundGuideSubTitle}>반품 배송 요금</p>
                                        <p className={style.refundGuideContent}>• 지정 장소 반품 서비스 또는 도어 투 도어 픽업 서비스를 통한 반품은 무료입니다.</p>
                                        <p className={style.refundGuideContent}>• 참고: 주문 하나당 한 번만 무료 지역 반품을 제공합니다.
                                            한 주문에 여러 번의 반품 요청을 하시는 경우,
                                            한 번만 무료 지역 반품 서비스를 받으실 수 있으며,
                                            다른 반품 요청 또한 지역 반품 서비스를 받으실 수 있으나
                                            지정된 지역 반품 주소로 반품하는 배송비를 부담하셔야 합니다.
                                            그러므로 추가 배송비 부담을 피하기 위해 물품을 한 번에 반품해주세요.
                                        </p>
                                    </div>
                                </FlexChild>
                            </VerticalFlex>
                        </HorizontalFlex>
                    </div>
                </FlexChild>
                <FlexChild>
                    <div className={style.refundGuideContainer}>
                        <HorizontalFlex>
                            <FlexChild width={350}></FlexChild>
                            <VerticalFlex>
                                <FlexChild>
                                    <div>
                                        <p className={style.refundGuideTitle}>국내 환불(해당되는 이탈리아 제품만 가능)</p>
                                        <p className={style.refundGuideContent}>배송 접수 후 15일 이내에 '무료 반품' 서비스를 이용하실 수 있습니다.</p>
                                    </div>
                                </FlexChild>
                                <FlexChild>
                                    <div>
                                        <p className={style.refundGuideSubTitle}>서비스 범위</p>
                                        <p className={style.refundGuideContent}>• 판매자는 해당 추가 서비스를 제공하도록 선택할 수 있으며,
                                            거주 국가에 있는 물류 창고를 이용한다면 제공하는 것이 낫습니다.
                                        </p>
                                        <p className={style.refundGuideContent}>• 현재 해당 서비스는 참여하는 이탈리아 판매자의 제품으로만 제한됩니다.</p>
                                    </div>
                                </FlexChild>
                                <FlexChild>
                                    <div>
                                        <p className={style.refundGuideSubTitle}>환불 요청 제출 조건</p>
                                        <p className={style.refundGuideContent}>• 제품이 사용되지 않았습니다.</p>
                                        <p className={style.refundGuideContent}>• 제품은 완벽한 상태이며 원래의 포장에 담겨 있습니다.</p>
                                    </div>
                                </FlexChild>
                                <FlexChild height={200}>
                                    <div>
                                        <p className={style.refundGuideSubTitle}>반품 배송 요금</p>
                                        <p className={style.refundGuideContent}>
                                            반품된 제품의 배송비는 판매자가 지불합니다.
                                        </p>

                                    </div>
                                </FlexChild>
                            </VerticalFlex>
                        </HorizontalFlex>
                    </div>
                </FlexChild>
                <FlexChild>
                    <div className={style.refundGuideContainer}>
                        <HorizontalFlex>
                            <FlexChild width={350}></FlexChild>
                            <VerticalFlex>
                                <FlexChild>
                                    <div>
                                        <p className={style.refundGuideTitle}>국내 환불(해당되는 이탈리아 제품만 가능)</p>
                                        <p className={style.refundGuideContent}>'국내 환불' 서비스를 제공하는 판매자의 제품 세부 사항 페이지에는
                                            라벨 또는 아이콘이 표시됩니다.
                                            '국내 환불' 서비스가 적용되면 조건 없이 제품 환불 여부를
                                            결정할 수 있는 기간이 (배송 보장일자를 기준으로) 15일 더 늘어납니다.
                                        </p>
                                    </div>
                                </FlexChild>
                                <FlexChild height={300}>
                                    <div>
                                        <p className={style.refundGuideSubTitle}>반품 배송 요금</p>
                                        <p className={style.refundGuideContent}>
                                            지정된 지역 반품 주소로 보내는 반품 배송 비용은 구매자가 부담합니다.
                                        </p>
                                        
                                    </div>
                                </FlexChild>
                            </VerticalFlex>
                        </HorizontalFlex>
                    </div>
                </FlexChild>
                <FlexChild>
                    <div className={style.refundGuideContainer}>
                        <HorizontalFlex>
                            <FlexChild width={350}></FlexChild>
                            <FlexChild>
                                <VerticalFlex>
                                    <FlexChild>
                                        <div>
                                        <p className={style.refundGuideTitle}>법적 권리</p>
                                        <p className={style.refundGuideContent}>
                                        판매자는 장소에 따라 구매자에 해당될 수 있는 관련된 
                                        다른 법적 요건(보증, 환불 등)을 준수해야 합니다. 
                                        예를 들어, 대부분의 유럽 국가에서는 일반적으로 2년의 보증 기간이 있으며 
                                        구매한 날로부터 14일 안에 반품을 할 수 있습니다 
                                        (환불의 경우, 구매자가 판매자에게 반품하는 비용을 부담해야 합니다.)
                                        </p>
                                        <p className={style.linkConsumers}>Statutory Rights For EU Consumers</p>
                                        </div>
                                    </FlexChild>
                                </VerticalFlex>
                            </FlexChild>
                        </HorizontalFlex>
                    </div>
                </FlexChild>
                <FlexChild height={120}>
                    
                    <p className={style.question}>아직 질문이 남아 있으신가요? 저희는 항상 도움을 드릴 준비가 되어 있습니다.</p>
                    <p className={style.chatLink}>24시간 라이브 채팅</p>
                    
                </FlexChild>

            </VerticalFlex>
        </Container>
    );
}

export default BuyerProtection;