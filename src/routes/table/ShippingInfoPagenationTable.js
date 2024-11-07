
import { forwardRef, useContext, useEffect, useImperativeHandle, useState } from 'react';
import { CTable, CButton } from '@coreui/react';
import P from 'components/P';
import { BrowserDetectContext } from 'providers/BrowserEventProvider';
import { getCurrentLanguageCode } from 'shared/utils/Utils';
import HorizontalFlex from 'layouts/flex/HorizontalFlex';
import FlexChild from 'layouts/flex/FlexChild';
import Center from 'layouts/wrapper/Center';
import { useNavigate } from 'react-router-dom';
import NiceModal from "@ebay/nice-modal-react";

const ShippingInfoPagenationTable = forwardRef((props, ref) => {
    const navigate = useNavigate();
    const { isMobile } = useContext(BrowserDetectContext);
    const { columns, data, itemsPerPage = 10 } = props;
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        console.log(pageData);
    }, [currentPage])


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

    if (totalItems === 0 || data[0] === null) {
        return <p>데이터가 없습니다.</p>;
    }

    if (pageData.length === 0) {
        return <p>No data available.</p>;
    }

    const onProductDetailClick = (data, status, amount) => {
        console.log(data);
        NiceModal.show("shippingInfoDetail", { shippingInfo: data, status: status, amount: amount });
    }
    const onOrderProductUpdateClick = (data) => {
        console.log(data);
        NiceModal.show("shippingInfoUpdate", {data: data});
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
                        isMobile ? (
                            pageData.map((row, index) => {
                                const dataIndex = (currentPage - 1) * itemsPerPage + index;
                                const date = new Date(row.createDateTime);
                                const year = date.getFullYear();
                                const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1을 해줌
                                const day = String(date.getDate()).padStart(2, "0");
                                const formattedDateTime = `${year}/${month}/${day}`;

                                console.log(formattedDateTime);
                                return (
                                    <tr key={index}>
                                        <td>{dataIndex + 1}</td>
                                        <td>{formattedDateTime}</td>
                                        <td>
                                            <CButton onClick={() => onProductDetailClick(row.orderProducts, row.status, row.amount)}>보기</CButton>
                                        </td>
                                        <td>
                                            <CButton onClick={() => onOrderProductUpdateClick(row)}>수정</CButton>
                                        </td>

                                    </tr>
                                );
                            })
                        ) : (
                            pageData.map((row, index) => {
                                const dataIndex = (currentPage - 1) * itemsPerPage + index;
                                const date = new Date(row.createDateTime);
                                const year = date.getFullYear();
                                const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1을 해줌
                                const day = String(date.getDate()).padStart(2, "0");
                                const formattedDateTime = `${year}/${month}/${day}`;

                                console.log(formattedDateTime);
                                return (
                                    <tr key={index}>
                                        <td>{dataIndex + 1}</td>
                                        <td>{formattedDateTime}</td>
                                        <td>
                                            <tr>
                                                <th>상품명</th>
                                                <th>수량</th>
                                            </tr>
                                            {row.orderProducts.map((data, index) => {
                                                console.log(data);
                                                return (
                                                    <tr>
                                                        <td>
                                                            <Center width={"250px"} textAlign={"left"}>
                                                                <P ellipsis>{data.product.brandTitle} {data.product.title}</P>
                                                            </Center>
                                                        </td>
                                                        <td>
                                                            <Center>
                                                                <P>{data.product.quantity}</P>
                                                            </Center>
                                                        </td>
                                                    </tr>

                                                );
                                            })}
                                        </td>
                                        <td>
                                            {row.status}
                                        </td>
                                        <td>
                                            {row.amount}
                                        </td>
                                        <td>
                                            <CButton onClick={() => onOrderProductUpdateClick(row)}>수정</CButton>
                                        </td>
                                    </tr>
                                );
                            })
                        )
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

export default ShippingInfoPagenationTable;