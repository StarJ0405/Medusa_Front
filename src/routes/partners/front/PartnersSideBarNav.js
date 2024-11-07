import React from 'react'
import CIcon from '@coreui/icons-react'
import {cilBell,cilCalculator,cilCalendar,cilChartPie,cilCursor,cilDescription,cilDrop,cilLevelUp,cilNotes,cilPencil,cilPuzzle,cilSpeedometer,cilStar, cilUser,} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const PartnersSideBarNav = [
  {
    component: CNavItem,
    name: '대시보드',
    to: '/partners',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavTitle,
    name: '파트너스',
  },
  {
    component: CNavItem,
    name: '파트너스 URL 생성',
    href: '/partners/createPartnersLink',
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: '파트너스 HISTORY',
    href: '/partners/partnersLinkHistory',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: '나의 파트너스 회원',
    href: '/partners/myPartnersAccount',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: '나의 파트너스 회원 통계',
    href: '/partners/myPartnersTotal',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  }
]

export default PartnersSideBarNav;
