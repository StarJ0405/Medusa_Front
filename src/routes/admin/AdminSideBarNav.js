import React from "react";
import CIcon from "@coreui/icons-react";
import {
  cilBell,
  cilCalculator,
  cilCalendar,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilLevelUp,
  cilList,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
  cilUser,
} from "@coreui/icons";
import { CNavGroup, CNavItem, CNavTitle } from "@coreui/react";

const AdminSideBarNav = [
  {
    component: CNavItem,
    name: "홈",
    to: "/admin",
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: "info",
      text: "NEW",
    },
  },
  // {
  //   component: CNavItem,
  //   name: '카테고리 관리',
  //   to: '/admin/productCategory',
  //   icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  // },
  // {
  //   component: CNavTitle,
  //   name: "주문관리",
  // },
  {
    component: CNavGroup,
    name: "주문 관리",
    to: "/admin/orderManagement",
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "주문 관리",
        to: "/admin/orderManagement",
      },
      {
        component: CNavItem,
        name: "전체주문 조회",
        to: "/admin/orderStatus/null",
      },
      {
        component: CNavItem,
        name: "입금전 관리",
        to: "/admin/orderStatus/WaitingForPayment",
      },
      {
        component: CNavItem,
        name: "배송준비중 관리",
        to: "/admin/orderStatus/PreparingShipment",
      },
      {
        component: CNavItem,
        name: "배송대기 관리",
        to: "/admin/orderStatus/ReadyForShipment",
      },
      {
        component: CNavItem,
        name: "배송중 관리",
        to: "/admin/orderStatus/Shipping",
      },
      {
        component: CNavItem,
        name: "배송완료 관리",
        to: "/admin/orderStatus/DeliveryCompleted",
      },
      {
        component: CNavItem,
        name: "택배연동",
        to: "/admin/courierInterlocking",
      },
      {
        component: CNavItem,
        name: "자동입금 확인",
        to: "/admin/autoDepositConfirm",
      },
    ],
  },
  // {
  //   component: CNavTitle,
  //   name: '상품관리',
  // },
  {
    component: CNavGroup,
    name: "상품관리",
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,

    items: [
      {
        component: CNavItem,
        name: "상품관리",
        to: "/admin/productManagement",
      },
      {
        component: CNavItem,
        name: "상품현황",
        to: "/admin/productStatus/:id",
      },
      // {
      //   component: CNavItem,
      //   name: '품절 임박 & 관리필요',
      //   to: '/admin/product/:id',
      // },
      {
        component: CNavItem,
        name: "상품등록",
        to: "/admin/productRegistration",
      },
      {
        component: CNavItem,
        name: "신상품",
        to: "/admin/newProduct",
      },
      {
        component: CNavItem,
        name: "재입고",
        to: "/admin/restockProduct",
      },
      {
        component: CNavItem,
        name: "베스트",
        to: "/admin/bestProduct",
      },
      // {
      //   component: CNavItem,
      //   name: '등록 상품 관리',
      //   to: '/admin/registeredProductManagement',
      // },
      // {
      //   component: CNavItem,
      //   name: '메인상품 관리',
      //   to: '/admin/mainProductManagement',
      // },
      // {
      //   component: CNavItem,
      //   name: '상품옵션 관리',
      //   to: '/admin/productOptionManagement',
      // },
      // {
      //   component: CNavItem,
      //   name: '재고관리',
      //   to: '/admin/stockManagement',
      // },
      // {
      //   component: CNavItem,
      //   name: '예약 등록 메뉴얼',
      //   to: '/admin/reservationRegistrationManual',
      // },
      // {
      //   component: CNavItem,
      //   name: '카테고리 관리',
      //   to: '/admin/productCategory',
      // },
      // {
      //   component: CNavItem,
      //   name: '브랜드 관리',
      //   to: '/admin/brand',
      // }
    ],
  },
  {
    component: CNavTitle,
    name: "회원관리",
  },
  {
    component: CNavItem,
    name: "회원관리",
    to: "/admin/userManagement",
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "회원그룹관리",
    to: "/admin/userGroupManagement",
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "회원정보관리",
    to: "/admin/userInfoManagement/:id",
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "회원활동관리",
    to: "/admin/userActivityManagement",
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: "입점관리",
  },
  {
    component: CNavItem,
    name: "입점사 등록",
    to: "/admin/vendorRegister",
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "입점사 현황",
    to: "/admin/vendorManagement",
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: "게시판",
  },
  {
    component: CNavItem,
    name: "게시판",
    to: "/admin/articleManagement",
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: "프로모션",
  },
  {
    component: CNavItem,
    name: "프로모션",
    to: "/admin/promotionManagement",
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "기획전",
    to: "/admin/exhibition",
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: "통계",
  },
  {
    component: CNavItem,
    name: "통계",
    to: "/admin/statisticsManagement",
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },
  // {
  //   component: CNavTitle,
  //   name: '파트너스',
  // },
  // {
  //   component: CNavItem,
  //   name: '파트너스 URL 생성',
  //   to: '/admin/createPartnersLink',
  //   icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
  // },
  // {
  //   component: CNavItem,
  //   name: '파트너스 HISTORY',
  //   to: '/admin/partnersLinkHistory',
  //   icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
  // },
  // {
  //   component: CNavItem,
  //   name: '나의 파트너스 회원',
  //   to: '/admin/myPartnersAccount',
  //   icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  // },
  // {
  //   component: CNavItem,
  //   name: '나의 파트너스 회원 통계',
  //   to: '/admin/myPartnersTotal',
  //   icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  // },
  // {
  //   component: CNavTitle,
  //   name: '매출통계',
  // },
  // {
  //   component: CNavItem,
  //   name: '기간별',
  //   to: '/admin/periodSales',
  //   icon: <CIcon icon={cilCalendar} customClassName="nav-icon" />,
  // },
  // {
  //   component: CNavItem,
  //   name: '카테고리별',
  //   to: '/admin/categorySales',
  //   icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  // },
  // {
  //   component: CNavItem,
  //   name: '회원별',
  //   to: '/admin/accountSales',
  //   icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  // },
  // {
  //   component: CNavTitle,
  //   name: '주문서 확인',
  // },
  // {
  //   component: CNavItem,
  //   name: '주문내역',
  //   to: '/admin/shippingInfo',
  //   icon: <CIcon icon={cilList} customClassName="nav-icon" />,
  // },
  // {
  //   component: CNavTitle,
  //   name: '장바구니',
  // },
  // {
  //   component: CNavItem,
  //   name: '회원 장바구니 내역',
  //   to: '/admin/allCarts',
  //   icon: <CIcon icon={cilList} customClassName="nav-icon" />,
  // }
];
export default AdminSideBarNav;
