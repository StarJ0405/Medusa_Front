import style from "./VendorList.module.css";
import VendorListRow from "./VendorListRow";
import { useState, useEffect } from "react";
import { requester } from "App";

function VendorList(props) {
  const [vendorList, setVendorList] = useState();

  useEffect(() => {
    requester.getAllVendors((result) => {
      
      if (result.code === 0) {
        setVendorList(result.data);
      }
    });
  }, []);

  return (
    <div>
      <div>
        <table className={style.table}>
          <thead>
            <tr>
              <th>Id</th>
              <th>UserName</th>
              <th>Password</th>
              <th>MobileNumber</th>
              <th>Role</th>
              <th>비고</th>
            </tr>
          </thead>
          <tbody>
            {vendorList
              ? vendorList.map((vendor, index) => (
                <VendorListRow key={index} vendor={vendor} />
              ))
              : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default VendorList;
