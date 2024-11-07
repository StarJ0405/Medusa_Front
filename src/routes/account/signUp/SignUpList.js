import { useEffect, useState } from "react";
import style from "./SignUpList.module.css"
import SignUpListRow from "./SignUpListRow";
import { requester } from "App";
import Table from "components/table/Table";

function SignUpList(props) {

  const [signUpList, setSignUpList] = useState();

  useEffect(() => {
    requester.getAllUsers((result) => {
      
      if (result.code === 0) {

        setSignUpList(result.data);
        
      }
    });
  }, []);

  return (<>
    <Table data={signUpList} />
  </>);
}

export default SignUpList;
