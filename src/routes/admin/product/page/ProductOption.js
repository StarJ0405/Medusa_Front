import { useNavigate, useParams } from "react-router-dom";
import style from "./ProductOption.module.css";
import { useEffect, useState } from "react";
import { requester } from "App";
import VerticalFlex from "layouts/flex/VerticalFlex";
import FlexChild from "layouts/flex/FlexChild";
import Center from "layouts/wrapper/Center";
import P from "components/P";
import CustomIcon from "components/icons/CustomIcon";

function ProductOption() {
    const { id } = useParams();
    const navigate = useNavigate();
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
    }, [])


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

    const onSettingClick = (id) => {
        navigate(`/admin/productOption/${id}`)
    }

    return (
        <div className={style.container}>
            <VerticalFlex>
                <FlexChild>
                    <div className={style.label}>
                        <Center width={"100%"} textAlign={"left"}>
                            <P>메인 상품 관리</P>
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
                                        <td>
                                            <div style={{
                                                display: "flex",
                                                gap: "10px",
                                                justifyContent: "center"
                                            }}>
                                                <div className={style.deleteIconArea}>
                                                    <CustomIcon icon name={"delete"} width={15} />
                                                </div>
                                                <div className={style.managementArea} onClick={() => onSettingClick(row.id)}>
                                                    <CustomIcon icon name={"management"} width={15} />
                                                </div>
                                            </div>
                                        </td>
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

export default ProductOption;