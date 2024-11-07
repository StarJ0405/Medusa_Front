import { useParams } from "react-router-dom";
import style from "./ProductStatusDetail.module.css";
import { useEffect, useState } from "react";
import VerticalFlex from "layouts/flex/VerticalFlex";
import FlexChild from "layouts/flex/FlexChild";
import DateChoice from "components/inputs/datePicker/dateChoice/DateChoice";
import Center from "layouts/wrapper/Center";
import P from "components/P";
import { requester } from "App";

function ProductStatusDetail() {
    const { id } = useParams();
    const [status, setStatus] = useState("");
    const [pageData, setPageData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [product, setProduct] = useState("");
    const [mounted, setMounted] = useState(false);





    useEffect(() => {
        setMounted(true);
    }, [])

    useEffect(() => {
        let data = { id: "56269b29-da55-4c40-a0e7-8f06d3e360ad" }
        requester.getProductForAdmin(data, (result) => {

            setProduct(result.data);
        })

    }, [mounted])


    useEffect(() => {
        switch (id) {
            case "outOfStock":
                setStatus("품절임박");
                break;
            case "needToManagement":
                setStatus("관리필요");

                break;

            default:
                setStatus("품절임박");
                break;
        }


    }, [id])

    return (
        <div className={style.container}>
            <VerticalFlex>
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
                                <th>IMage</th>
                                <th>Content</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Stauts</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                product &&
                                <>
                                    <tr >
                                        <td><img src={product.image} /></td>
                                        <td>{product.brandTitleKr + product.titleKr}</td>
                                        <td>{product.price}</td>
                                        <td>{product.quantity}</td>
                                        <td>{status}</td>
                                    </tr>
                                    <tr >
                                        <td><img src={product.image} /></td>
                                        <td>{product.brandTitleKr + product.titleKr}</td>
                                        <td>{product.price}</td>
                                        <td>{product.quantity}</td>
                                        <td>{status}</td>

                                    </tr>
                                    <tr >
                                        <td><img src={product.image} /></td>
                                        <td>{product.brandTitleKr + product.titleKr}</td>
                                        <td>{product.price}</td>
                                        <td>{product.quantity}</td>
                                        <td>{status}</td>

                                    </tr>
                                </>

                            }
                        </tbody>
                    </table>
                </FlexChild>
            </VerticalFlex>
        </div>
    );
}

export default ProductStatusDetail;