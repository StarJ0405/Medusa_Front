import CustomIcon from "components/icons/CustomIcon";
import style from "./ChoiceToggleMenu.module.css";
import ToggleMenu from "./ToggleMenu";

function ChoiceToggleMenu(props) {
    const { name } = props;


    const data = [
        {
            title: "상품등록",
            content: "쇼핑몰에 판매할 상품 등록 ",
            icon: <CustomIcon name={"productRegister"} width={65} />
        },
        {
            title: "상품관리",
            content: "등록된 상품 관리 페이지",
            icon: <CustomIcon name={"productManagement2"} width={65} />
        },
        {
            title: "카테고리 관리",
            content: "상품 카테고리 수정 및 추가",
            icon: <CustomIcon name={"category"} width={65} />
        },
        {
            title: "메인상품 관리",
            content: "메인 페이지에 등록된 상품 관리",
            icon: <CustomIcon name={"mainProductManagement"} width={65} />
        },
        {
            title: "상품옵션 관리",
            content: "상품에 등록된 옵션 수정 및 관리",
            icon: <CustomIcon name={"productOption"} width={65} />
        },
        {
            title: "재고관리",
            content: "재고수량 편집 및 관리",
            icon: <CustomIcon name={"inventoryControl"} width={65} />
        },
        {
            title: "회원 정보 조회",
            content: "쇼핑몰에 가입되어 있는 회원 정보 조회 페이지",
            icon: <CustomIcon name={"memberInformationInquiry"} width={65} />
        },
        {
            title: "회원 관리",
            content: "쇼핑몰에 가입한 회원 관리 페이지",
            icon: <CustomIcon name={"userManagement"} width={65} />
        },
        {
            title: "게시판 관리",
            content: "게시판 편집 및 관리",
            icon: <CustomIcon name={"articleManagement"} width={65} />
        },
        {
            title: "게시글 관리",
            content: "등록된 게시글 답변 및 관리",
            icon: <CustomIcon name={"postManagement"} width={65} />
        },
        {
            title: "이벤트 관리",
            content: "출석체크 이벤트 및 기타 이벤트 등록 및 관리",
            icon: <CustomIcon name={"eventManagement"} width={65} />
        },
        {
            title: "쿠폰 관리",
            content: "쇼핑몰에서 사용할 수 있는 쿠폰 등록 및 관리",
            icon: <CustomIcon name={"couponManagement"} width={65} />
        },
        {
            title: "매출통계",
            content: "쇼핑몰 매출 조회 및 통계",
            icon: <CustomIcon name={"statistics"} width={65} />
        },
        {
            title: "상품통계",
            content: "판매중인 상품의 판매현황 및 통계",
            icon: <CustomIcon name={"productStatistics"} width={65} />
        },
        {
            title: "택배연동",
            content: "배송시작부터 완료까지 자동처리 가능한\n우체국/대한통운/굿스플로 택배연동",
            icon: <CustomIcon name={"courierInterlocking"} width={65} />
        },
        {
            title: "자동입금 확인",
            content: "번거로운 통장확인은그만!\n한번에 자동입금확인",
            icon: <CustomIcon name={"directDeposit"} width={65} />
        }
    ]

    return (
        <div className={style.wrap}>
            {
                {
                    productRegistration: <ToggleMenu data={data[0]} name={name} />,
                    registeredProductManagement: <ToggleMenu data={data[1]} name={name} />,
                    productCategory: <ToggleMenu data={data[2]} name={name} />,
                    mainProductManagement: <ToggleMenu data={data[3]} name={name} />,
                    productOptionManagement: <ToggleMenu data={data[4]} name={name} />,
                    stockManagement: <ToggleMenu data={data[5]} name={name} />,
                    userInfoInquiry: <ToggleMenu data={data[6]} name={name} />,
                    userManagement: <ToggleMenu data={data[7]} name={name} />,
                    articleManagement: <ToggleMenu data={data[8]} name={name} />,
                    postManagement: <ToggleMenu data={data[9]} name={"articleManagement"} />,
                    eventManagement: <ToggleMenu data={data[10]} name={name} />,
                    couponManagement: <ToggleMenu data={data[11]} name={name} />,
                    statistics: <ToggleMenu data={data[12]} name={name} />,
                    productStatistics: <ToggleMenu data={data[13]} name={name} />,
                    courierInterlocking: <ToggleMenu data={data[14]} name={name} />,
                    autoDepositConfirm: <ToggleMenu data={data[15]} name={name} />,

                }[name]
            }
        </div>
    )
}

export default ChoiceToggleMenu;