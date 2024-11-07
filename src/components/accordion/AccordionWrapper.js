
import { CAccordion } from "@coreui/react";
import style from "./Accordion.module.css"

function AccordionWrapper(props) {
    const { active, alwaysOpen } = props;
    const accordionStyle = {
        '--cui-accordion-bg': "white",
        '--cui-accordion-active-color': "var(--main-color)",
        '--cui-accordion-border-color': "gray",
        '--cui-accordion-color': "var(--font-color)",
        '--cui-accordion-active-bg': "white",
        '--cui-accordion-btn-focus-border-color': "none",
        '--cui-accordion-btn-focus-box-shadow': "none",
    }

    return (
        <CAccordion style={props.style ? props.style : accordionStyle} alwaysOpen={alwaysOpen} flush={props.flush} activeItemKey={active}>
            {props.children}
        </CAccordion>
    );
}

export default AccordionWrapper;