import React from "react";

function RadioGroup(props) {
    const { children, name, value, onChange } = props;
    return (
        <div style={{display: "flex", gap: "10px"}}>
            {React.Children.map(children, child => {
                return React.cloneElement(child, {
                    name,
                    isActive: child.props.value === value,
                    onClick: () => onChange(child.props.value)
                });
            })}
        </div>
    );
}

export default RadioGroup;