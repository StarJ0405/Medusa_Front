import style from "./InputHashTagRow.module.css"

function InputHashTagRow(props) {
    const { data, onRemove, index } = props;

    
    return (
        <p className={style.tag} onClick={() =>onRemove(data)}>{data}</p>
        
    );
}

export default InputHashTagRow;