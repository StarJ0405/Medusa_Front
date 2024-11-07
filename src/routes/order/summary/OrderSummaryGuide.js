import { Link } from "react-router-dom";
import style from "./OrderSummaryGuide.module.css"

function OrderSummaryGuide() {
    return (
        <div className={style.container}>
            <p>
                '주문하기'를 클릭하여
                모든 <Link to="/"><span className={style.link}>약관과 정책</span></Link>을 읽고
                이에 동의하였음을 확인합니다.

            </p>
            <p><Link to="/"><span className={style.link}>개인정보 제3자 제공</span></Link></p>
        </div>
    );
}

export default OrderSummaryGuide;