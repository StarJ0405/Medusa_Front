import style from "./MobileProfileImage.module.css"
import logo from "resources/img/main/footer/logo2.svg";

function MobileProfileImage() {
    return (
        <div className={style.imgArea}>
            <img src={logo} />
        </div>
    );
}

export default MobileProfileImage;