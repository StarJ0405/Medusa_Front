import HorizontalFlex from "./HorizontalFlex";
import VerticalFlex from "./VerticalFlex";

function Flex(props) {
    const { direction } = props;
  
    return (
        <>
            {
                direction === "vertical" ? <VerticalFlex {...props}>{props.children}</VerticalFlex> : <HorizontalFlex {...props}>{props.children}</HorizontalFlex>
            }
        </>
    );
}

export default Flex;