
import WishCard from "../wish/WishCard";
import CategoryProductCard from "./CategoryProductCard";
import NewProductCard from "./NewProductCard";
import NormalProductCard from "./NormalProductCard";
import style from "./ProductCard.module.css";
import SimpleProductCard from "./SimpleProductCard";
import SpecialPriceCard from "./SpecialPriceCard";
import SuperDealCard from "./SuperDealCard";
import TextProductCard from "./TextProductCard";

function ProductCard(props) {
    const { data, template, type, border, skeleton } = props;


    return (
        <div className={style.productCard}>
            {
                {
                    normal: <NormalProductCard data={data} type={type} skeleton={props.skeleton} rank={props.rank}/>,
                    simple: <SimpleProductCard data={data} type={type} skeleton={props.skeleton} />,
                    text: <TextProductCard data={data} />,
                    superDeal: <SuperDealCard data={data} border={border} />,
                    newProduct: <NewProductCard data={data} border={border} />,
                    topCategoryProduct: <CategoryProductCard data={data} />,
                    flag: <SpecialPriceCard data={data} />,
                    wish: <WishCard data={data} /> 
                }[template]

            }
        </div>
    )
}

export default ProductCard;