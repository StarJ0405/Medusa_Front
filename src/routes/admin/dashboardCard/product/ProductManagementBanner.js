import FlexChild from "layouts/flex/FlexChild";
import style from "./ProductManagementBanner.module.css";
import banner from "resources/img/icons/admin/png/product/하단배너.png"
import { useNavigate } from "react-router-dom";

function ProductManagementBanner(props) {
    const navigate = useNavigate();
    
    const onClick = () => {
        navigate("/admin/reservationRegistrationManual")
    }
    return (
        <FlexChild>
            <div className={style.wrap} onClick={onClick}>
                <img src={banner} className={style.img} />
            </div>
        </FlexChild>
    );
}

export default ProductManagementBanner;