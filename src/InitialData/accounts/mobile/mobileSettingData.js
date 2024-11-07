import logo from "resources/img/main/footer/logo2.svg";



export const mobileAlarmListData = [
    {
      id: 1,
      data: [
        {
          id: 1,
          list: "주문",
          
        },
        {
          id: 2,
          list: "프로모션",
          
        },
        {
          id: 3,
          list: "기타",
          
          
        },
      ],
      content: "알림을 사용하지 않으려면 버튼을 끄십시오."
    },
    {
        id: 2,
        data: [
            {
                id: 1,
                list: "이메일 구독 관리",
            }
        ],
        content: "판매자 또는 사이트 관련 기타 서비스 등 AliExpress에서 받는 이메일을 선택할 수 있습니다"
    },
]

export const recentlyViewedListData = [
    {
        id: 1,
        data: [
            {
                id: 1,
                list: "본 상품"
            }
        ],
        content: "중요: 이 기능을 끄면 검색 기록이 삭제되고 최근 본 상품 목록을 더 이상 사용할 수 없게 됩니다."
    }
]

export const appVideoListData = [
    {
        id: 1,
        data: [
            {
                id: 1,
                list: "WiFi 환경에서 자동 재생"
            }
        ],
        content: "중요: 이 기능을 키면 와이파이 환경에서 자동재생 됩니다."
    }
]

export const appQualityListData = [
    {
        id:1,
        list: "스마트 품질 모드",
        name: "app",
        checked: true,
    },
    {
        id:2,
        list: "고품질 (Wi-Fi 환경에 적합)",
        name: "app",
        checked: "",
    },
    {
        id:3,
        list: "보통 품질 (3G 또는 2G 환경에 적합)",
        name: "app",
        checked: "",
    },
]

export const mobileProfileData = [
    {
      id: 1,
      data: [
        {
          id: 1,
          list: "사진",
          img: logo,
        },
      ],
      
    },
    {
        id: 2,
        data: [
            {
                id: 1,
                list: "성명",
                name: "아이 유",
            },
            {
                id: 2,
                list: "회원 센터",
                class: "실버 회원",
            },
            {
                id: 3,
                list: "계정",
                account: true,
            },
            {
                id: 4,
                list: "성별",
            },
            {
                id: 5,
                list: "출생 연도",
            },
        ],
        
    },
    {
        id: 3,
        data: [
          {
            id: 1,
            list: "배송 주소",
          },
        ],
        
      },
]
