import style from "./UserInfoManagement.module.css";
import { useEffect, useState } from "react";
import { requester } from "App";
import VerticalFlex from "layouts/flex/VerticalFlex";
import FlexChild from "layouts/flex/FlexChild";
import Center from "layouts/wrapper/Center";
import P from "components/P";
import CustomIcon from "components/icons/CustomIcon";
import { useParams } from "react-router-dom";

function UserInfoManagement(props) {
    const { id } = useParams();
    const [mounted, setMounted] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [status, setStatus] = useState("");
    const [product, setProduct] = useState([]);
    const [userList, setUserList] = useState();
    const itemsPerPage = 10;


    useEffect(() => {
        switch (id) {
            case "waitingForPayment":
                setStatus("일일 방문");
                break;
            case "preparingProduct":
                setStatus("당일 신규가입");
                break;
            case "waitingForDelivery":
                setStatus("당월 신규가입");
                break;
            case "shipping":
                setStatus("당일 탈퇴회원");
                break;
            default:
                setStatus("일일 방문");
                break;
        }
        console.log(id);
    }, [id])


    useEffect(() => {
        setMounted(true);

    }, []);

    useEffect(() => {
        requester.getAllUsers((result => {
            setUserList(result.data);
        }))
    }, [mounted])


    const handlePageChange = (change) => {

        const nextPage = currentPage + change;

        if (nextPage >= 0 && nextPage < Math.ceil(userList.length / itemsPerPage)) {
            setCurrentPage(nextPage);
        }
    };

    return (
        <div className={style.container}>
            <VerticalFlex>
                <FlexChild>
                    <div className={style.label}>
                        <Center width={"100%"} textAlign={"left"}>
                            <P>회원 관리</P>
                        </Center>
                    </div>
                </FlexChild>
                <FlexChild>

                </FlexChild>
                <FlexChild>
                    <table className={style.table}>
                        <thead>
                            <tr>
                                <th>index</th>
                                <th>user_name</th>
                                <th>signUpDate</th>
                                <th>mobile_no</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userList && userList.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage).map((row, index) => {
                                return (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{row.userName}</td>
                                        <td>{row.createDateTime.slice(0, 10)}</td>
                                        <td>{row.mobileNo}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <div className={style.buttonContainer}>
                        <button className={style.button} onClick={() => handlePageChange(-1)} disabled={currentPage === 0}>Previous</button>
                        <Center width={"100px"}>
                            <P size={20} weight={"bold"}>{currentPage + 1}</P>
                        </Center>
                        <button className={style.button} onClick={() => handlePageChange(1)} disabled={userList && currentPage >= Math.ceil(userList.length / itemsPerPage) - 1}>Next</button>
                    </div>
                </FlexChild>
            </VerticalFlex>
        </div>
    );
}

export default UserInfoManagement;