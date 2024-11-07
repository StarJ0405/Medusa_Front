import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import VerticalFlex from "layouts/flex/VerticalFlex";
import logo from "resources/img/main/footer/logo2.svg";
import style from "./MobileFeedViewRow.module.css"

function MobileFeedViewRow(props) {
    const { data } = props;

    return (
        <div className={style.container}>
            <HorizontalFlex >
                <FlexChild>
                    <div className={style.wrap}>
                        <img src={data.image} className={style.img} />
                    </div>
                </FlexChild>
                <FlexChild>
                    <div className={style.rowWrap}>
                        <VerticalFlex>
                            <FlexChild>
                                <div className={style.titleWrap}>
                                    <p>WOW, SO BEAUTIFUL </p>
                                </div>
                            </FlexChild>
                            <FlexChild>
                                <HorizontalFlex>
                                    <FlexChild>
                                        <div className={style.subImg1Wrap}>
                                            <img src={data.subImg1} className={style.img} />
                                        </div>
                                    </FlexChild>
                                    <FlexChild>
                                        <div className={style.subImg2Wrap}>
                                            <img src={data.subImg2} className={style.img} />
                                        </div>
                                    </FlexChild>
                                </HorizontalFlex>
                            </FlexChild>
                            <FlexChild>
                                <div className={style.logoWrap}>
                                    <div className={style.imgArea}>
                                        <img src={logo} />
                                    </div>
                                    <div className={style.companyWrap}>
                                        <p>{data.company}</p>
                                        <p className={style.nation}>{data.nation}</p>
                                    </div>
                                </div>
                            </FlexChild>
                        </VerticalFlex>
                    </div>
                </FlexChild>
            </HorizontalFlex>

        </div>
    );
}

export default MobileFeedViewRow;