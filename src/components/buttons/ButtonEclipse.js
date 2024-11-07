import style from "./ButtonEclipse.module.css";
import { Link } from "react-router-dom";
import Center from "layouts/wrapper/Center";
import P from "components/P";
import Inline from "layouts/container/Inline";


function ButtonEclipse(props) {
    return (
        <div className={style.wrap} onClick={props.onClick} style={
            {
                justifyContent: (props.justifyContent ? props.justifyContent : "center"),
                paddingRight: (props.paddingRight ? props.paddingRight + "px" : "auto"),
                borderRadius: (props.borderRadius ? props.borderRadius : null),
                border: (props.border ? props.border : null),
                backgroundColor: (props.backgroundColor ? props.backgroundColor : null),
            }
        }>
            <div className={style.button} style={
                {
                    width: (props.width ? props.width : "initial"),
                    height: (props.height ? props.height : "initial"),
                    backgroundImage: (props.backgroundImage ? props.backgroundImage : null),
                    color: (props.color ? props.color : null),
                    fontWeight: (props.fontWeight ? props.fontWeight : null),
                    lineHeight: (props.lineHeight ? props.lineHeight : null),
                    // fontSize: (props.fontSize ? props.fontSize : null)
                }}
            >
                {
                    props.linkTo ?
                        <Link to={props.linkTo}>
                            <Center>
                                <P>
                                    {props.text}
                                </P>
                            </Center>
                        </Link> :
                        <Center>
                            <Inline>
                                {
                                    props.currencySymbol && 
                                    <P size={props.fontSize}>&#8361;</P>
                                }
                                <P size={props.fontSize}>
                                    {props.text}
                                </P>
                            </Inline>

                        </Center>
                }
            </div>
        </div>
    );
}

export default ButtonEclipse;