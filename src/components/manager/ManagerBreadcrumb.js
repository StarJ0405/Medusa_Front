import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom'

import routes from './routes'

import { CBreadcrumb, CBreadcrumbItem } from '@coreui/react'
import { isMobile } from 'react-device-detect'
import VerticalFlex from 'layouts/flex/VerticalFlex'
import FlexChild from 'layouts/flex/FlexChild'
import Center from 'layouts/wrapper/Center'
import Inline from 'layouts/container/Inline'
import P from 'components/P'
import CustomButton from 'components/buttons/CustomButton'
import { BrowserDetectContext } from 'providers/BrowserEventProvider'
import CIcon from '@coreui/icons-react'
import { cilBell, cilClone } from '@coreui/icons'
import { AuthContext } from 'providers/AuthProvider'

const ManagerBreadcrumb = () => {
  const { isMobile } = useContext(BrowserDetectContext);
  const { userName } = useContext(AuthContext);
  const currentLocation = useLocation().pathname
  // console.log("currentLocation", currentLocation);
  const getRouteName = (pathname, routes) => {
    const currentRoute = routes.find((route) => route.path === pathname)
    return currentRoute ? currentRoute.name : false
  }

  const getBreadcrumbs = (location) => {
    const breadcrumbs = []
    location.split('/').reduce((prev, curr, index, array) => {
      const currentPathname = `${prev}/${curr}`
      // console.log("currentPathname", currentPathname);
      const routeName = getRouteName(currentPathname, routes)
      // console.log("routes", routes);
      routeName &&
        breadcrumbs.push({
          pathname: currentPathname,
          name: routeName,
          active: index + 1 === array.length ? true : false,
        })
      return currentPathname
    })
    return breadcrumbs
  }

  const breadcrumbs = getBreadcrumbs(currentLocation);
  // console.log("breadcrumbs", breadcrumbs);

  return (
    <CBreadcrumb className="m-0 ms-2">

      {/* <CBreadcrumbItem href="/">Home</CBreadcrumbItem> */}


      {breadcrumbs.map((breadcrumb, index) => {
        // console.log("breadcrumb", index, breadcrumb);
        return (
          <CBreadcrumbItem
            {...(breadcrumb.active ? { active: true } : { href: breadcrumb.pathname })}
            key={index}
          >
            {breadcrumb.name}
          </CBreadcrumbItem>
        )
      })}
    </CBreadcrumb>
  )
}

export default React.memo(ManagerBreadcrumb);
