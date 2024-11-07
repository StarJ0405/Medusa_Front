import style from "./TopBanner.module.css";
import background from 'resources/img/img.webp';
import Container from "layouts/container/Container";

function TopBanner() {
    return (
        <Container width={1920} height={80}>
            <a className={style.banner} href="/">
                <img src={background} />
            </a>
        </Container>
    );
}



export default TopBanner;


