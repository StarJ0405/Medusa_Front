import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilBell, cilCalculator, cilCalendar, cilChartPie, cilCursor, cilDescription, cilDrop, cilLevelUp, cilNotes, cilPencil, cilPuzzle, cilSpeedometer, cilStar, cilUser, } from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const VendorSideBarNav = [
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
        name: '매출통계',
    },
    {
        component: CNavItem,
        name: '기간별',
        href: '/vendor/periodSales',
        icon: <CIcon icon={cilCalendar} customClassName="nav-icon" />,
    },
    {
        component: CNavItem,
        name: '카테고리별',
        href: '/vendor/categorySales',
        icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    },
    {
        component: CNavItem,
        name: '회원별',
        href: '/vendor/accountSales',
        icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    }

]

export default VendorSideBarNav;
