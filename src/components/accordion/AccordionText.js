import { CAccordion, CAccordionBody, CAccordionHeader, CAccordionItem } from "@coreui/react";
import { useEffect } from "react";
import style from "./Accordion.module.css"
import clsx from "classnames"
import P from "components/P";
import { useTranslation } from "react-i18next";

function AccordionText(props) {
    const {t} = useTranslation();
    const { index, header, normal,  } = props;

    return (
        <CAccordionItem itemKey={index ? index + 1 : 1}>
            <CAccordionHeader>{header}{props.choose && <P>{"("}{t("choose")}{")"}</P>}{props.accent && <P color={"var(--main-color)"}>{"("}{t("required")}{")"}</P>}</CAccordionHeader>
            <CAccordionBody style={props.style}>
                <div className={clsx(style.fixedScroll)} style={{ height: props.height ? props.height : null, overflowY: props.overflowY ? props.overflowY : "scroll" }}>
                    {props.children}
                </div>
            </CAccordionBody>
        </CAccordionItem>
    );
}

export default AccordionText;