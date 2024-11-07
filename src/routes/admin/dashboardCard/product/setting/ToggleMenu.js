import HorizontalFlex from "layouts/flex/HorizontalFlex";
import style from "./ToggleMenu.module.css";
import FlexChild from "layouts/flex/FlexChild";
import Center from "layouts/wrapper/Center";
import P from "components/P";
import Dummy from "components/Dummy";
import { useNavigate } from "react-router-dom";

function ToggleMenu(props) {
    const { data, name } = props;
    const navigate = useNavigate();

    const onGoToLink = (value) => [
        // navigate(`/admin/${name}`)
    ]
    return (
        <div className={style.wrap} onClick={() => onGoToLink(name)}>
            <HorizontalFlex>
                <FlexChild width={"max-content"}>
                    <div className={style.iconArea}>
                        {data.icon}
                    </div>
                </FlexChild>
                <FlexChild>
                    <Center width={"100%"} textAlign={"left"}>
                        <P weight={"bold"} size={18}>{data.title}</P>
                        <Dummy height={10} />
                        <P>{data.content}</P>
                    </Center>
                </FlexChild>
            </HorizontalFlex>
        </div>
    );
}

export default ToggleMenu;