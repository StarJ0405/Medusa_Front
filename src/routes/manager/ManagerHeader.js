import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { CContainer, CHeader, CHeaderBrand, CHeaderDivider, CHeaderNav, CHeaderToggler, CNavLink, CNavItem, } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBell, cilEnvelopeOpen, cilList, cilMenu } from '@coreui/icons'


import { VendorHeaderDropdown } from 'components/manager/header/index'
import { logo } from 'components/manager/assets/brand/logo'
import VendorBreadcrumb from './ManagerBreadcrumb'
import { VendorReducer } from 'shared/redux/reducers/vendor/VendorReducer'
import DesktopLanguageSwitcher from 'components/countryFlag/DesktopLanguageSwitcher'
import MobileLanguageSwitcher from 'components/countryFlag/MobileLanguageSwitcher'
import { BrowserDetectContext } from "providers/BrowserEventProvider";

const ManagerHeader = () => {
  const { isMobile } = useContext(BrowserDetectContext);
  const dispatch = useDispatch();
  // const sidebarShow = useSelector((state) => state.sidebarShow)
  const { sidebarShow } = useSelector((state) => ({ sidebarShow: state.vendor.sidebarShow }));

  const onSidebarTogglerClick = () => {
    dispatch(VendorReducer.actions.toggleSideBar(!sidebarShow));
  }

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler className="ps-1" onClick={onSidebarTogglerClick} >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          로고자리
          {/* <CIcon icon={logo} height={48} alt="Logo" /> */}
        </CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            <CNavLink to="/vendor" component={NavLink}>
              대시보드
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">Users</CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">Settings</CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilBell} size="lg" />
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilList} size="lg" />
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilEnvelopeOpen} size="lg" />
            </CNavLink>
          </CNavItem>
          <CNavItem>
            {
              isMobile ? <MobileLanguageSwitcher /> : <DesktopLanguageSwitcher />
            }
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav className="ms-3">
          <VendorHeaderDropdown />
        </CHeaderNav>
      </CContainer>
      <CHeaderDivider />
      <CContainer fluid>
        <VendorBreadcrumb />
      </CContainer>
    </CHeader>
  )
}

export default ManagerHeader
