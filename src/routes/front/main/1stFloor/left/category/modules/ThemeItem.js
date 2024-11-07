import style from "./ThemeItem.module.css";
import theme from "resources/img/theme.png";

function ThemeItem() {
  return (
    <div className={style.themeArea}>
      <p className={style.name}>액션토이 {"&"} 피겨</p>
      <div className={style.imgArea}>
        <img src={theme} className={style.img} />
      </div>
    </div>
  );
}

export default ThemeItem;
