import { useParams } from "react-router-dom";
import style from "./ProductManagementDetail.module.css";
import { useEffect, useState } from "react";
import VerticalFlex from "layouts/flex/VerticalFlex";
import FlexChild from "layouts/flex/FlexChild";
import DateChoice from "components/inputs/datePicker/dateChoice/DateChoice";
import Center from "layouts/wrapper/Center";
import P from "components/P";
import { requester } from "App";


function ProductManagementDetail() {
    const { id } = useParams();
    const [mounted, setMounted] = useState(false);
    const [status, setStatus] = useState("");
    const [pageData, setPageData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState([]);
    const itemsPerPage = 5;

    useEffect(() => {
        setMounted(true);
        setProduct([]);
    },[])


    useEffect(() => {
        switch (id) {
            case "allProduct":
                setStatus("전체상품");
                break;
            case "productsOnSale":
                setStatus("판매중 상품");
                break;
            case "soldOutProduct":
                setStatus("품절 상품");
                break;
            case "productNotShown":
                setStatus("미진열 상품");
                break;
            case "mainItemsOnShow":
                setStatus("메인 진열 상품");
                break;
            default:
                setStatus("전체상품");
                break;
        }
        
    }, [id])

    useEffect(() => {
        if (mounted) {
            requester.getAllProduct(result => {
                setProducts(result.data[0].children);
            })
        }
    }, [status])

    useEffect(() => {
        products.map((row, index) => {
            row.children.map((item, index) => {
                setProduct(prevProducts => [...prevProducts, item]);
            })
        })


    }, [products])

    useEffect(() => {
        console.log(product);
    }, [product])

    const handleSelectChange = (e) => {
        setProduct([]);
        setStatus(e.target.value);
    }

    const handlePageChange = (change) => {
        
        const nextPage = currentPage + change;
        
        if (nextPage >= 0 && nextPage < Math.ceil(product.length / itemsPerPage)) {
            setCurrentPage(nextPage);
        }
    };

    return (
        <div className={style.container}>
            <VerticalFlex>
                <FlexChild>
                    <div style={{ display: "flex", width: "100%" }}>
                        <P size={17}>선택하세요 </P>
                        <select value={status} onChange={handleSelectChange}>
                            <option value="전체상품">전체상품</option>
                            <option value="판매중 상품">판매중 상품</option>
                            <option value="품절 상품">품절 상품</option>
                            <option value="미진열 상품">미진열 상품</option>
                            <option value="배송전 취소">배송전 취소</option>
                            <option value="메인 진열 상품">메인 진열 상품</option>
                        </select>
                    </div>
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
                                <th>image</th>
                                <th>product</th>
                                <th>price</th>
                                <th>quantity</th>
                                <th>Stauts</th>
                            </tr>
                        </thead>
                        <tbody>
                            {product && product.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage).map(row => {
                                return (
                                    <tr>
                                        <td><img width={"100px"} src={row.image} /></td>
                                        <td>{row.brandTitleKr + row.titleKr}</td>
                                        <td>{row.price}</td>
                                        <td>{row.quantity}</td>
                                        <td>{status === "전체상품" ? "" : status}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <div className={style.buttonContainer}>
                        <button className={style.button} onClick={() => handlePageChange(-1)} disabled={currentPage === 0}>Previous</button>
                        <Center width={"100px"}>
                            <P size={20} weight={"bold"}>{currentPage + 1} / {Math.ceil(product.length / itemsPerPage)}</P>
                        </Center>
                        <button className={style.button} onClick={() => handlePageChange(1)} disabled={currentPage >= Math.ceil(product.length / itemsPerPage) - 1}>Next</button>
                    </div>



                </FlexChild>
            </VerticalFlex>
        </div>
    );
}

export default ProductManagementDetail;