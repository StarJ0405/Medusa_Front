import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from "@coreui/react";
import { ManagerSidebarNav } from "components/manager/ManagerSidebarNav";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { VendorReducer } from "shared/redux/reducers/vendor/VendorReducer";
import $ from "jquery";
import CIcon from "@coreui/icons-react";
import { sygnet } from "components/manager/assets/brand/sygnet";
import SimpleBar from 'simplebar-react'
import VendorSideBarNav from "./VendorSideBarNav";


function VendorSideBar () {
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
                    <ManagerSidebarNav items={VendorSideBarNav} />
                </SimpleBar>
            </CSidebarNav>
            <CSidebarToggler className="d-none d-lg-flex" onClick={onSidebarTogglerClick} />
        </CSidebar>
    )
}

export default VendorSideBar;