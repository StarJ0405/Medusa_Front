import style from "./Complain.module.css"
import VerticalFlex from "layouts/flex/VerticalFlex";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import Container from "layouts/container/Container";
import ButtonEclipse from "components/buttons/ButtonEclipse";


function Complain() {
    return (
        <Container width={1820} backgroundColor={"white"} padding={30}>
            <FlexChild>
                <HorizontalFlex>
                    <FlexChild width={850} >
                        <div className={style.textWrap}>
                            <p className={style.text}>If you encounter any issues, we encourage you to contact the seller first.
                                If you can't reach an agreement,
                                you can apply for a refund by opening a dispute.</p>
                                <ButtonEclipse text={("Open Dispute")} width={150} borderRadius={5} linkTo={"/user/refund"} />

                        </div>
                        
                    </FlexChild>
                    <FlexChild width={850}>
                        <div  className={style.textWrap}>
                            <p className={style.text}>If you think that a seller (or a buyer) has violated AliExpress trading rules,
                                you have the ability to send report to our team for review.
                                This will help us to make sure we provide you a safety shopping experience.
                            </p>
                            <ButtonEclipse text={("Submit a Report")} width={150} borderRadius={5} linkTo={"/user/report/submit"} />
                        </div>
                    </FlexChild>

                </HorizontalFlex>
            </FlexChild>
        </Container>
    );
}

export default Complain;