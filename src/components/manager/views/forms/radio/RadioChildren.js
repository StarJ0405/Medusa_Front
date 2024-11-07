function RadioChildren(props) {
    const { children, value, isActive, onClick } = props;
    return (
        <label style={props.style ? props.style : {flex: 1, display: "flex", gap: "10px"}}>
            <input
                type="radio"
                value={value}
                checked={isActive}
                onChange={onClick}
            />
            {children}
        </label>
    );
}

export default RadioChildren;