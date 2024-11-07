import AdminDateChoice from "routes/admin/datePicker/AdminDateChoice";
import style from "./TableSearchCard.module.css";
import InventoryManagementSearch from "./card/InventoryManagementSearch";
import ProductInquirySearch from "./card/ProductInquirySearch";
import OrderInquirySearch from "./card/OrderInquirySearch";
import OutOfStockManagementSearch from "./card/OutOfStockManagementSearch";

function TableSearchCard (props) {
    const { index, data, callback } = props;
    console.log(props.index);
    return (
        <div className={style.card}>
           
            {
                {
                    0: <InventoryManagementSearch callback={callback} dateTitle={"상품 등록일"} />,
                    1: <ProductInquirySearch callback={callback} />,
                    2: <OrderInquirySearch callback={callback} />,
                    3: <OutOfStockManagementSearch callback={callback} />
                }[index]
            }
        </div>
    )
}

export default TableSearchCard;