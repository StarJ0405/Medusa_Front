import ProductCard from "components/card/product/ProductCard";

function RecommendProductCard(props) {
  return (
    <>
      <ProductCard template="white" data={props.data} />
    </>
  );
}

export default RecommendProductCard;
