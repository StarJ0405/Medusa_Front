import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import style from "./RecommendProduct.module.css";
import RecommendProductCard from "./RecommendProductCard";
import { items } from "InitialData/Items";
function RecommendProduct() {
  return (
    <div className={style.recommendProductContainer}>
      <p className={style.title}>추천 제품</p>
      <div className={style.productList}>
        <HorizontalFlex>
          <FlexChild>
            <p>{"<"}</p>
            <RecommendProductCard data={items[0]} />
            <RecommendProductCard data={items[1]} />
            <RecommendProductCard data={items[2]} />
            <RecommendProductCard data={items[3]} />
          </FlexChild>
        </HorizontalFlex>
      </div>
    </div>
  );
}

export default RecommendProduct;