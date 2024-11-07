import style from "./FooterRow.module.css"

function FooterRow(props){
    return (
        <p style={{
            color: props.color ? props.color : null,
        }}>{props.name} {props.value}</p>
    )
}

export default FooterRow;