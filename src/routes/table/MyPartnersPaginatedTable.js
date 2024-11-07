import { CButton, CTable } from "@coreui/react";
import { forwardRef, useContext, useImperativeHandle, useState } from "react";
import style from "./MyPartnersPaginatedTable.module.css"
import { BrowserDetectContext } from "providers/BrowserEventProvider";
import NiceModal from "@ebay/nice-modal-react";


const MyPartnersPaginatedTable = forwardRef((props, ref) => {
    const { isMobile } = useContext(BrowserDetectContext);
    const { columns,data, itemsPerPage = 10 } = props;
    const [currentPage, setCurrentPage] = useState(1);

    const totalItems = data.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const getPageData = () => {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        return data.slice(start, end).map((row, index) => ({
            ...row,
            productInfo: `${row.brandTitleKr} ${row.titleKr}`,
            rowNumber: index + 1 + (currentPage - 1) * itemsPerPage
        }));
    };

    const pageData = getPageData();

    const onMobileDetailClick = () => {
        // if(data){
        //     NiceModal.show("purchaseOrder", {data : data});
        // }
        
    }

    useImperativeHandle(ref, () => ({
        getCurrentPage: () => {
            return currentPage;
        },
        getTotalPages: () => {
            return totalPages;
        },
        handlePageChange: handlePageChange,
    }));

    if (totalItems === 0 || data[0] === null) {
        return <p>데이터가 없습니다.</p>;
    }

    if (pageData.length === 0) {
        return <p>No data available.</p>;
    }



    return (
        <>
            <CTable striped hover>
                <thead>
                    <tr>
                        {columns && columns.map((column, index) => (
                            <th key={index}>{column}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {
                        isMobile 
                        ?
                        pageData.map((row, index) => (
                            <tr key={index}>
                                
                                
                                <td>{row.productInfo}</td>
                                <td>{row.amount}</td>
                                
                                <td onClick={onMobileDetailClick}>상세보기</td>
                            </tr>
                        ))
                        :
                        pageData.map((row, index) => (
                            <tr key={index}>
                                <td>{row.rowNumber}</td>
                                <td><img src={row.image} alt={row.titleKr} width="100" /></td>
                                <td>{row.productInfo}</td>
                                <td>{row.price}</td>
                                <td>{row.quantity}</td>
                                <td>{row.amount}</td>
                                <td>{row.createDate}</td>
                                <td>{row.userName}</td>
                            </tr>
                        ))
                    }
                    {/* {pageData.map((row, index) => (
                        <tr key={index}>
                            <td>{row.rowNumber}</td>
                            <td><img src={row.image} alt={row.titleKr} width="100" /></td>
                            <td>{row.productInfo}</td>
                            <td>{row.price}</td>
                            <td>{row.quantity}</td>
                            <td>{row.amount}</td>
                            <td>{row.createDate}</td>
                            <td>{row.userName}</td>
                        </tr>
                    ))} */}
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
                    <strong className={style.pageCount}>{currentPage} / {totalPages} 페이지</strong>
            </div>
        </>
    );
});

export default MyPartnersPaginatedTable;