import style from "./DirectDeposit.module.css";
import FlexChild from "layouts/flex/FlexChild";
import CustomIcon from "components/icons/CustomIcon";
import Center from "layouts/wrapper/Center";
import P from "components/P";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import { useParams } from "react-router-dom";
import VerticalFlex from "layouts/flex/VerticalFlex";
import DateChoice from "components/inputs/datePicker/dateChoice/DateChoice";
import { useEffect, useState } from "react";

function DirectDeposit() {
    const { id } = useParams();
    const [status, setStatus] = useState("자동입금확인");
    const [pageData, setPageData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);


    const dataPerPage = 10;
    const allData = Array.from({ length: 100 }, (_, i) => ({
        id: i + 1,
        date: "2023-07-30",
        content: i % 2 === 0 ? `과일먹구싶오 외 7` : `얼려먹구싶오 외 4`,
        amount: i % 2 === 0 ? 720 : 600, // 짝수 인덱스는 720, 홀수 인덱스는 600
        user: i % 2 === 0 ? "홍길동" : "임꺽정", // 짝수 인덱스는 720, 홀수 인덱스는 600
        check: i % 2 === 0 ? 'Y' : 'N'
    }));

    useEffect(() => {
        setPageData(allData.slice(currentPage * 10, (currentPage + 1) * 10));
    }, [id])


    useEffect(() => {
        // calculate the start and end index
        const start = currentPage * dataPerPage;
        const end = start + dataPerPage;
        // slice the data array
        const slicedData = allData.slice(start, end);
        setPageData(slicedData);
    }, [currentPage]);

    const handlePageChange = (change) => {
        // calculate the next page number
        const nextPage = currentPage + change;
        // check if next page is valid
        if (nextPage >= 0 && nextPage < Math.ceil(allData.length / dataPerPage)) {
            setCurrentPage(nextPage);
        }
    };

    return (
        <VerticalFlex>
            <FlexChild>
                <DateChoice />
            </FlexChild>
            <FlexChild>
                <div className={style.label}>
                    <Center width={"100%"} textAlign={"left"}>
                        <P>{status}</P>
                    </Center>
                </div>
            </FlexChild>
            <FlexChild>
                <table className={style.table}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Date</th>
                            <th>Content</th>
                            <th>Amount</th>
                            <th>User</th>
                            <th>Check</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pageData && pageData.map(item => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.date}</td>
                                <td>{item.content}</td>
                                <td>{item.amount}</td>
                                <td>{item.user}</td>
                                <td>{item.check}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className={style.buttonContainer}>
                    <button className={style.button} onClick={() => handlePageChange(-1)} disabled={currentPage === 0}>이전</button>
                    <Center width={"100px"}>
                        <P size={20} weight={"bold"}>{currentPage + 1} / {Math.ceil(allData.length / dataPerPage)}</P>
                    </Center>
                    <button className={style.button} onClick={() => handlePageChange(1)} disabled={currentPage >= Math.ceil(allData.length / dataPerPage) - 1}>다음</button>
                </div>
            </FlexChild>
        </VerticalFlex>
    );
}

export default DirectDeposit;