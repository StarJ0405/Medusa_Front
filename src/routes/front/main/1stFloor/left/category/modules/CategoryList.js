import style from "./CategoryList.module.css";

function CategoryList() {
  return (
    <>
      <span className={style.title}>핫 세일</span>
      <ul>
        <li className={style.list}>후드 {"&"} 스웨트셔츠</li>
        <li className={style.list}>티셔츠</li>
        <li className={style.list}>셔츠</li>
        <li className={style.list}>캐주얼 반바지</li>
        <li className={style.list}>남성 세트</li>
        <li className={style.list}>재킷</li>
      </ul>
    </>
  );
}

export default CategoryList;
