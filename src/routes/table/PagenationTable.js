
import { forwardRef, useContext, useImperativeHandle, useState } from 'react';
import { CTable, CButton } from '@coreui/react';
import P from 'components/P';
import { BrowserDetectContext } from 'providers/BrowserEventProvider';

const PaginatedTable = forwardRef((props, ref) => {
    const { isMobile } = useContext(BrowserDetectContext);
    const { columns, data, itemsPerPage = 10 } = props;
    const [currentPage, setCurrentPage] = useState(1);

    

    const totalItems = data.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const getPageData = () => {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        console.log(data.slice(start, end))
        return data.slice(start, end);
    };
    
    const pageData = getPageData();

    useImperativeHandle(ref, () => ({
        getCurrentPage: () => {
            return currentPage;
        },
        getTotalPages: () => {
            return totalPages;
        },
        handlePageChange: handlePageChange,
    }));

    if(totalItems === 0 || data[0] === null){
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
                        {columns.map((column, index) => (
                            <th key={index}>{column}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {
                        isMobile ?
                        pageData.map((row, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{row.userName}</td>
                                <td>{row.price}</td>
                            </tr>
                        ))
                        :
                        pageData.map((row, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                {Object.values(row).map((value, columnIndex) => (
                                    <td key={columnIndex + 1}>{value}</td>
                                ))}
                            </tr>
                        ))
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

export default PaginatedTable;