import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'
import CIcon from '@coreui/icons-react'


import { logoNegative } from '../../components/manager/assets/brand/logo-negative'
import { sygnet } from '../../components/manager/assets/brand/sygnet'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

// sidebar nav config
import navigation from './_nav'
import { ManagerSidebarNav } from './ManagerSidebarNav'
import { VendorReducer } from 'shared/redux/reducers/vendor/VendorReducer'
import $ from "jquery";

function ManagerSidebar() {
  const sidebar = useRef();
  const dispatch = useDispatch();
  const { sidebarShow, sidebarUnfoldable } = useSelector((state) => ({ sidebarShow: state.vendor.sidebarShow, sidebarUnfoldable: state.vendor.sidebarUnfoldable }));
  const [isVisible, setVisible] = useState(true);

  useEffect(() => {
    sidebar.current?.addEventListener('transitionend', onSidebarTransitionEnd);

    return () => {
      sidebar.current.removeEventListener('transitionend', onSidebarTransitionEnd);
    }
  }, []);

  const onSidebarTransitionEnd = () => {
    let margin = $('.sidebar').outerWidth(true) - $('.sidebar').outerWidth();
    if (margin === 0) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }

  const onSidebarTogglerClick = () => {
    dispatch(VendorReducer.actions.toggleSidebarUnfoldable(!sidebarUnfoldable));
  }


  useEffect(() => {
    setVisible(sidebarShow);
  }, [sidebarShow]);

  useEffect(() => {
    if (isVisible === undefined) {

    } else {
      dispatch(VendorReducer.actions.toggleSideBar(isVisible));
    }
  }, [isVisible]);

  return (
    <CSidebar ref={sidebar} position="fixed" unfoldable={sidebarUnfoldable} visible={sidebarShow}>
      <CSidebarBrand className="d-none d-md-flex" to="/">
        로고자리
        {/* <CIcon className="sidebar-brand-full" icon={logoNegative} height={35} /> */}
        <CIcon className="sidebar-brand-narrow" icon={sygnet} height={35} />
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <ManagerSidebarNav items={navigation} />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler className="d-none d-lg-flex" onClick={onSidebarTogglerClick} />
    </CSidebar>
  )
}

// export default React.memo(VendorSidebar);
export default ManagerSidebar;