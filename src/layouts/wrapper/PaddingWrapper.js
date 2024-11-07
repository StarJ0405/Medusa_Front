function PaddingWrapper(props){
    return (
        <div style={
            {
                padding:(props.padding?props.padding:null),
                backgroundColor:(props.backgroundColor?props.backgroundColor:null),
                borderRadius: (props.borderRadius?props.borderRadius:null),
                borderTopLeftRadius: (props.borderTopLeftRadius ? props.borderTopLeftRadius :null),
                borderTopRightRadius: (props.borderTopRightRadius ? props.borderTopRightRadius : null),
                borderBottomLeftRadius: (props.borderBottomLeftRadius?props.borderBottomLeftRadius:null),
                borderBottomRightRadius: (props.borderBottomRightRadius?props.borderBottomRightRadius:null),
                border:(props.border ? props.border : null),
                margin: (props.margin?props.margin:null),
                width:"100%",
                height:"100%"
            }
        }>
            {props.children}
        </div>
    )
}

export default PaddingWrapper;