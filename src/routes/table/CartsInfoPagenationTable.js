import { forwardRef, useContext, useEffect, useImperativeHandle, useState } from "react";
import style from "./CartsInfoPagenationTable.module.css"
import { CButton, CTable } from "@coreui/react";
import Center from "layouts/wrapper/Center";
import P from "components/P";
import { getCurrentLanguageCode } from "shared/utils/Utils";
import { BrowserDetectContext } from "providers/BrowserEventProvider";
import { useNavigate } from "react-router-dom";
import NiceModal from "@ebay/nice-modal-react";


const CartsInfoPagenationTable = forwardRef((props, ref) => {
    const { columns, data, itemsPerPage = 10 } = props;
    const [currentPage, setCurrentPage] = useState(1);
    const { isMobile } = useContext(BrowserDetectContext);
    const navigate = useNavigate();


    const totalItems = data.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const getPageData = () => {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        return data.slice(start, end);
    };

    const pageData = getPageData();

    useImperativeHandle(ref, () => ({
        getCurrentPage: () => currentPage,
        getTotalPages: () => totalPages,
        handlePageChange: handlePageChange,
    }));

    if (totalItems === 0 || data[0] === null) {
        return <p>데이터가 없습니다.</p>;
    }

    if (pageData.length === 0) {
        return <p>No data available.</p>;
    }

    const onCartsDetailClick = (carts, date, total) => {
        
        NiceModal.show("allCartsInfoDetail", {carts: carts, date: date, total: total});
    }

    // 나머지 코드

    return (
        <>
            <CTable striped hover>
                <thead>
                    <tr>
                        {columns.map((column, index) => (
                            <th key={index}>{column}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {
                        isMobile
                            ?
                                pageData &&
                                pageData.map((row, index) => {
                                    const dataIndex = (currentPage - 1) * itemsPerPage + index;
                                const date = new Date(row.createDateTime);

                                const year = date.getFullYear();
                                const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1을 해줌
                                const day = String(date.getDate()).padStart(2, "0");
                                const formattedDateTime = `${year}/${month}/${day}`;
                                
                                return (
                                    <tr key={index}>
                                        <td>{dataIndex + 1}</td>
                                        <td>{row.userName}</td>
                                        <td>
                                            <CButton onClick={() => onCartsDetailClick(row.list, formattedDateTime, row.total)}>보기</CButton>
                                        </td>

                                    </tr>
                                );

                                })
                            :
                            pageData &&
                            pageData.map((row, index) => {
                                const dataIndex = (currentPage - 1) * itemsPerPage + index;
                                const date = new Date(row.createDateTime);

                                const year = date.getFullYear();
                                const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1을 해줌
                                const day = String(date.getDate()).padStart(2, "0");
                                const formattedDateTime = `${year}/${month}/${day}`;
                                


                                return (
                                    <tr key={index}>
                                        <td>{dataIndex + 1}</td>
                                        <td>{row.userName}</td>
                                        <td>{formattedDateTime}</td>
                                        <td>
                                            <tr>
                                                <th>상품명</th>
                                                <th>수량</th>
                                            </tr>
                                            {row.list.map((data, index) => {
                                                console.log(data);
                                                return (
                                                    <tr>
                                                        <td>
                                                            <Center width={"250px"} textAlign={"left"}>
                                                                <P ellipsis>{data.productName}</P>
                                                            </Center>
                                                        </td>
                                                        <td>
                                                            <Center>
                                                                <P>{data.quantity}</P>
                                                            </Center>
                                                        </td>
                                                    </tr>

                                                );
                                            })}
                                        </td>
                                        <td>
                                            {row.total}
                                        </td>
                                    </tr>
                                );
                            })
                    }
                </tbody>
            </CTable>
            <div className="d-flex justify-content-end mt-3">
                {totalPages > 1 &&
                    Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                        <CButton
                            key={page}
                            color={page === currentPage ? 'primary' : 'secondary'}
                            className="me-2"
                            onClick={() => handlePageChange(page)}
                        >
                            {page}
                        </CButton>
                    ))}
            </div>
        </>
    );
});

export default CartsInfoPagenationTable;