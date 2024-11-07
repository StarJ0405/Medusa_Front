import ThemeItem from "./ThemeItem";
import style from "./ThemeItemWrap.module.css";

function ThemeItemWrap() {
  return (
    <>
      <div className={style.themeWrap}>
        <ThemeItem />
        <ThemeItem />
      </div>
    </>
  );
}

export default ThemeItemWrap;
