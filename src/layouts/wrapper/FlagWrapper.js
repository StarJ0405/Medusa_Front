import FlexChild from "layouts/flex/FlexChild";
import VerticalFlex from "layouts/flex/VerticalFlex";
import style from "./FlagWrapper.module.css";
import clsx from "classnames";
import Center from "./Center";
import P from "components/P";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import Inline from "layouts/container/Inline";

function FlagWrapper(props) {
    const { flagColor, flagWidth, flagTopHeight, flagLeft, flagShadowColor, flag, flagTextColor, flagTextSize, title, titleTextSize, titleTextColor, subtitle, subtitleTextSize, subtitleTextColor, backgroundColor } = props;
    const flagBodyWidth = flagWidth * 0.9;
    const flagBodyLeft = flagLeft + flagWidth * 0.05;
    const titleWidth = `calc(100% - ${flagWidth * 1.1 + flagLeft}px)`;
    const titleLeft = `${flagWidth * 1.1 + flagLeft}`;
    return (
        <VerticalFlex>
            <FlexChild height={flagTopHeight || 30}>
                <div className={style.topArea}>
                    <div className={style.flagTop} style={{ width: flagWidth, left: flagLeft, backgroundColor: flagColor }}>
                        <div className={clsx(style.shadow, style.left)} style={{ backgroundColor: flagShadowColor }}></div>
                        <div className={clsx(style.shadow, style.right)} style={{ backgroundColor: flagShadowColor }}></div>
                    </div>
                </div>
            </FlexChild>
            <FlexChild height={flagWidth}>
                <div className={style.flagArea} style={{ backgroundColor: backgroundColor ? backgroundColor : "transparent" }}>
                    <div className={style.flagBody} style={{ left: flagBodyLeft, width: flagBodyWidth, backgroundColor: flagColor }}>
                        <Center height={"100%"}>
                            <Center>
                                <P size={flagTextSize} color={flagTextColor} weight={500}>{flag}</P>
                            </Center>
                        </Center>
                    </div>

                    <div className={style.flagTail} style={{ left: flagBodyLeft, width: flagBodyWidth, borderTop: `${flagBodyWidth * 0.3}px solid ${flagColor}`, borderRight: `${flagBodyWidth / 2}px solid transparent`, borderLeft: `${flagBodyWidth / 2}px solid transparent` }}> </div>

                    <div className={style.titleArea} style={{ width: titleWidth, transform: `translateX(${titleLeft}px)` }}>
                        <Center width={"100%"} textAlign={"left"}>
                            <Inline>
                                <P size={titleTextSize} color={titleTextColor} weight={1000}>
                                    {title}
                                </P>
                                <P size={subtitleTextSize} color={subtitleTextColor}>
                                    {subtitle}
                                </P>
                            </Inline>
                        </Center>
                    </div>
                </div>
            </FlexChild>
            <FlexChild>
                <div style={{ backgroundColor: backgroundColor }}>
                    {props.children}
                </div>
            </FlexChild>
        </VerticalFlex>

    );
}

export default FlagWrapper;