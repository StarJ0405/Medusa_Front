import Center from "layouts/wrapper/Center";


function Seperator(props) {
    const { width, height, color, padding } = props;
    return (
        <Center width={"100%"}>
            <div style={{
                width: width ? width : "100%",
                height: height ? height : null,
                backgroundColor: color ? color : null
            }}></div>
        </Center>
    );
}

export default Seperator;