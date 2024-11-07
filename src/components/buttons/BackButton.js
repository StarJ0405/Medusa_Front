import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Center from "layouts/wrapper/Center";

function BackButton(props) {
    const onBackClick = () => {
        window.history.back();
    }

    return (
        <div onClick={onBackClick} style={{cursor: "pointer"}}>
            <Center>
                <FontAwesomeIcon icon={fas["faAngleLeft"]} color={props.color || "black"}/>
            </Center>
        </div>
    );
}

export default BackButton;