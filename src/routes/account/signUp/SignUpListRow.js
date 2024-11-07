import style from "./SignUpListRow.module.css"

function SignUpListRow (props){
    const {user} = props;
    
    return(<tr>
        <td>{user.id}</td>
        <td>{user.userName}</td>
        <td>{user.password}</td>
        <td>{user.mobileNo}</td>
        <td>{user.role}</td>
        <td>
          
          
        </td>
      </tr>);
}

export default SignUpListRow;