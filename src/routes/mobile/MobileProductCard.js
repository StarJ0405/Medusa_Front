import style from "./MobileProductCard.module.css"
import ProductCard from "components/card/product/ProductCard";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function MobileProductCard (props) {
    const {data} = props;
    const id = data.id;
    const navigate = useNavigate();


    const onClick = () => {
        navigate("/product/detail/" + id);
        
    }

    return (
        <div onClick={onClick} className={style.wrap}>
        <ProductCard data={data} template={"simple"} />
        </div>
    );

}

export default MobileProductCard;