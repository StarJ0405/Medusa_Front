import { useEffect, useRef, useState } from "react";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import VerticalFlex from "layouts/flex/VerticalFlex";
import FlexChild from "layouts/flex/FlexChild";
import style from "./VendorList.module.css";
import { requester } from "App";

function VendorListRow(props) {
  const { vendor } = props;
  const [confirmed, setConfirmed] = useState();

  const onConfirmClick = (e) => {
    let data = { id: vendor.id, userName: vendor.userName, confirmYn: true };
    requester.confirmVendor(data, (result) => {
      
      setConfirmed(true);
    });
  };

  return (
    <tr>
      <td>{vendor.id}</td>
      <td>{vendor.userName}</td>
      <td>{vendor.password}</td>
      <td>{vendor.mobileNo}</td>
      <td>{vendor.role}</td>
      <td>
        {
          vendor.confirmYn ?
            <p>승인완료</p>
            : <a className={style.buttonEclipse} onClick={onConfirmClick}>
              승인{confirmed}
            </a>
        }

      </td>
    </tr>
  );
}

export default VendorListRow;
