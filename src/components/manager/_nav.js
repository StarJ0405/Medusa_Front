import React from 'react'
import CIcon from '@coreui/icons-react'
import {cilBell,cilCalculator,cilChartPie,cilCursor,cilDescription,cilDrop,cilNotes,cilPencil,cilPuzzle,cilSpeedometer,cilStar,} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: '대시보드',
    to: '/vendor',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavTitle,
    name: 'Theme',
  },
  {
    component: CNavItem,
    name: 'Colors',
    to: '/vendor/theme/colors',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Typography',
    to: '/vendor/theme/typography',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Components',
  },
  {
    component: CNavGroup,
    name: 'Base',
    to: '/vendor/base',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Accordion',
        to: '/vendor/base/accordion',
      },
      {
        component: CNavItem,
        name: 'Breadcrumb',
        to: '/vendor/base/breadcrumbs',
      },
      {
        component: CNavItem,
        name: 'Cards',
        to: '/vendor/base/cards',
      },
      {
        component: CNavItem,
        name: 'Carousel',
        to: '/vendor/base/carousels',
      },
      {
        component: CNavItem,
        name: 'Collapse',
        to: '/vendor/base/collapses',
      },
      {
        component: CNavItem,
        name: 'List group',
        to: '/vendor/base/list-groups',
      },
      {
        component: CNavItem,
        name: 'Navs & Tabs',
        to: '/vendor/base/navs',
      },
      {
        component: CNavItem,
        name: 'Pagination',
        to: '/vendor/base/paginations',
      },
      {
        component: CNavItem,
        name: 'Placeholders',
        to: '/vendor/base/placeholders',
      },
      {
        component: CNavItem,
        name: 'Popovers',
        to: '/vendor/base/popovers',
      },
      {
        component: CNavItem,
        name: 'Progress',
        to: '/vendor/base/progress',
      },
      {
        component: CNavItem,
        name: 'Spinners',
        to: '/vendor/base/spinners',
      },
      {
        component: CNavItem,
        name: 'Tables',
        to: '/vendor/base/tables',
      },
      {
        component: CNavItem,
        name: 'Tooltips',
        to: '/vendor/base/tooltips',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Buttons',
    to: '/vendor/buttons',
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Buttons',
        to: '/vendor/buttons/buttons',
      },
      {
        component: CNavItem,
        name: 'Buttons groups',
        to: '/vendor/buttons/button-groups',
      },
      {
        component: CNavItem,
        name: 'Dropdowns',
        to: '/vendor/buttons/dropdowns',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Forms',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Form Control',
        to: '/vendor/forms/form-control',
      },
      {
        component: CNavItem,
        name: 'Select',
        to: '/vendor/forms/select',
      },
      {
        component: CNavItem,
        name: 'Checks & Radios',
        to: '/vendor/forms/checks-radios',
      },
      {
        component: CNavItem,
        name: 'Range',
        to: '/vendor/forms/range',
      },
      {
        component: CNavItem,
        name: 'Input Group',
        to: '/vendor/forms/input-group',
      },
      {
        component: CNavItem,
        name: 'Floating Labels',
        to: '/vendor/forms/floating-labels',
      },
      {
        component: CNavItem,
        name: 'Layout',
        to: '/vendor/forms/layout',
      },
      {
        component: CNavItem,
        name: 'Validation',
        to: '/vendor/forms/validation',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Charts',
    to: '/vendor/charts',
    icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Icons',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'CoreUI Free',
        to: '/vendor/icons/coreui-icons',
        badge: {
          color: 'success',
          text: 'NEW',
        },
      },
      {
        component: CNavItem,
        name: 'CoreUI Flags',
        to: '/vendor/icons/flags',
      },
      {
        component: CNavItem,
        name: 'CoreUI Brands',
        to: '/vendor/icons/brands',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Notifications',
    icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Alerts',
        to: '/vendor/notifications/alerts',
      },
      {
        component: CNavItem,
        name: 'Badges',
        to: '/vendor/notifications/badges',
      },
      {
        component: CNavItem,
        name: 'Modal',
        to: '/vendor/notifications/modals',
      },
      {
        component: CNavItem,
        name: 'Toasts',
        to: '/vendor/notifications/toasts',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Widgets',
    to: '/vendor/widgets',
    icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavTitle,
    name: 'Extras',
  },
  {
    component: CNavGroup,
    name: 'Pages',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Login',
        to: '/vendor/login',
      },
      {
        component: CNavItem,
        name: 'Register',
        to: '/vendor/register',
      },
      {
        component: CNavItem,
        name: 'Error 404',
        to: '/vendor/404',
      },
      {
        component: CNavItem,
        name: 'Error 500',
        to: '/vendor/500',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Docs',
    href: 'https://coreui.io/react/docs/templates/installation/',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },
]

export default _nav
