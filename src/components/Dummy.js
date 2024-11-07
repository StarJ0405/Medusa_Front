function Dummy(props){
    return (
        <div style={
            {
                width:(props.width?props.width:null), 
                height:(props.height?props.height:null),
                // backgroundColor: "var(--user-bg-color)"
                pointerEvents: (props.event ? "none": null)
            }
        }></div>
    )
}

export default Dummy;