import FlexChild from "layouts/flex/FlexChild";
import VerticalFlex from "layouts/flex/VerticalFlex";
import style from "./FooterColumn.module.css";
import PropTypes from "prop-types";
import FooterRow from "./FooterRow";

FooterColumn.propTypes = {
    title: PropTypes.string.isRequired,
    contents: PropTypes.arrayOf(PropTypes.object).isRequired
  };

function FooterColumn(props){
    return (
        <VerticalFlex alignItems={"baseline"}>
            <FlexChild height={50}>
                <p className={style.title} style={{
                    color: props.color ? props.color : null,
                    fontWeight: props.fontWeight ? props.fontWeight : null,
                }}>{props.title}</p>
            </FlexChild>
            <FlexChild>
                <VerticalFlex>
                    {props.contents.map((row) => 
                        <FooterRow key={row.name} name={row.name} value={row.value} color={props.color}/>
                    )}
                </VerticalFlex>
            </FlexChild>
        </VerticalFlex>
    )
}

export default FooterColumn;