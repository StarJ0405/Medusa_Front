import AccordionText from "components/accordion/AccordionText";
import AccordionWrapper from "components/accordion/AccordionWrapper";
import CheckCircle from "components/inputs/checkBox/CheckCircle";
import P from "components/P";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import VerticalFlex from "layouts/flex/VerticalFlex";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import PrivacyPolicy from "routes/front/footer/PrivacyPolicy";
import TermsOfUse from "routes/front/footer/TermsOfUse";


const Terms = forwardRef((props, ref) => {
    const { data, targetRef } = props;
    const [isChecked, setChecked] = useState(false);
    const [checkedData, setCheckedData] = useState();
    const input = useRef();

    const callback = (index, state) => {
        if (props.callback) {
            props.callback(index, state);
        }
    }
    useEffect(() => {
        if (props.data) {
            setCheckedData(props.data)
        }
        
    }, [props.data]);

    useEffect(() => {
        if (props.checkedIndex && props.checkedIndex.includes(props.index)) {
            input.current.setChecked(true);
        } else {
            input.current.setChecked(false);
        }
    }, [props.checkedIndex]);

    useImperativeHandle(ref, () => ({
        isChecked() {
            return isChecked;
        },
        setChecked(value) {
            input.current.setChecked(value);
        },
        isCheckedVaild() {
            return input.current.isChecked();
        },
        focus() {
            input.current.scrollTo(0, input.current.offsetTop);
            if (props.hidden) {
                targetRef.current.focus();
            } else {
                input.current.focus();
            }
        }

    }));
    const accordionStyle = {
        '--cui-accordion-bg': "var(--user-bg-color)",
        '--cui-accordion-active-color': "var(--font-color)",
        '--cui-accordion-border-color': "none",
        '--cui-accordion-color': "var(--font-color)",
        '--cui-accordion-active-bg': "var(--user-bg-color)",
        '--cui-accordion-btn-focus-border-color': "none",
        '--cui-accordion-btn-focus-box-shadow': "none",
    }
    return (
        <div>
            {
                props.orderSummary
                    ?
                    <HorizontalFlex padding={" 8px 15px"} >
                        <FlexChild width={"initial"}>
                            <CheckCircle ref={input} callback={callback} index={props.index} label={props.label} checkedData={checkedData} />
                        </FlexChild>
                        <FlexChild>
                            <P size={"var(--font-size)"}>{data.text}</P>
                        </FlexChild>
                    </HorizontalFlex>
                    :
                    <VerticalFlex padding={"10px 0 20px 0"}>
                        <FlexChild>
                            <AccordionWrapper style={accordionStyle}>
                                <AccordionText accent={data.accent && data.accent} choose={data.choose && data.choose} height={250} header={data.header} >
                                    {data.privacy ? <PrivacyPolicy narrow /> : <TermsOfUse narrow />}
                                </AccordionText>
                            </AccordionWrapper>
                        </FlexChild>
                        <FlexChild backgroundColor={"var(--user-bg-color)"}>
                            <HorizontalFlex padding={"15px"} >
                                <FlexChild width={"initial"}>
                                    <CheckCircle ref={input} callback={callback} index={props.index} label={props.label} checkedData={checkedData} />
                                </FlexChild>
                                <FlexChild>
                                    <P size={"var(--font-size)"}>{data.text}</P>
                                </FlexChild>
                            </HorizontalFlex>
                        </FlexChild>
                    </VerticalFlex>

            }
        </div>
    );
})


export default Terms;