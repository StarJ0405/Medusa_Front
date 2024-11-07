import style from "./InputImage.module.scss";

function Loader() {
    return (
        <div className={style.loader}>
            <span className={style.loaderItem} />
            <span className={style.loaderItem} />
            <span className={style.loaderItem} />
        </div>
    );
}

export default Loader;