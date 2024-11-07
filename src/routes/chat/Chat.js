import { faUps } from "@fortawesome/free-brands-svg-icons";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { requester } from "App";
import InputText from "components/inputs/InputText";
import FlexChild from "layouts/flex/FlexChild";
import VerticalFlex from "layouts/flex/VerticalFlex";
import logo from "resources/img/main/footer/logo2.svg";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import useAltEffect from "shared/hooks/useAltEffect";
import style from "./Chat.module.css"
import ChatRow from "./ChatRow";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import { useTranslation } from "react-i18next";

function Chat(props) {
    const {t} = useTranslation();
    const adminChatData = [
        t("hi"),
        t("canIHelpYou"),
        t("hello")
    ]

    const { userId } = useSelector((state) => ({ userId: state.auth.userName }));
    const [content, setContent] = useState([]);
    const [save, setSave] = useState();
    const [loadData, setLoadData] = useState("");
    const [value, setValue] = useState("");
    const [isLogin, setLogin] = useState(false);

    const inputRef = useRef();
    const scrollRef = useRef();

    const scrollToBottom = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }

    const onClick = (e) => {
        if (inputRef.current.getValue() === "") {
            return;
        } else {
            setLoadData([...loadData, inputRef.current.getValue()]);
        }



        saveData();

    }
    const saveData = () => {
        let saveValue = inputRef.current.getValue();
        setSave(saveValue);
        let data = { content: saveValue };
        requester.saveChat(data, (result) => {
            
        })

    }
 
    useEffect(() => {
        requester.loadChat((result) => {
            setLoadData(result.data);
        })
        if (userId) {
            setLogin(true);
        }

    }, [])




    useEffect(() => {
        
        scrollToBottom();

    }, [loadData])


    const onKeyUp = (e) => {
        if (e.key == 'Enter') {

            onClick();
        }
    }

    return (
        <VerticalFlex height={"initial"}>
            {isLogin ?
                <>
                    <FlexChild>
                        <div className={style.mainTitleWrap}>
                            <p>1 : 1 {t("inquiry")}</p>
                        </div>

                    </FlexChild>
                    <FlexChild>
                        <div className={style.chatBox} ref={scrollRef}>


                            <FlexChild>
                                {adminChatData ? adminChatData.map((data) => (
                                    <>
                                        <HorizontalFlex>
                                            <FlexChild width={"max-content"}>
                                                <div className={style.imgWrap}>
                                                    <div className={style.imgArea}>
                                                        <img src={logo} />
                                                    </div>
                                                </div>
                                            </FlexChild>
                                            <FlexChild>
                                                <p className={style.adminContent}>{data}</p>
                                            </FlexChild>
                                        </HorizontalFlex>
                                    </>
                                )) : ""}
                            </FlexChild>

                            <FlexChild>
                                <VerticalFlex>

                                    {loadData ?
                                        loadData.map((data) => (
                                            <FlexChild>
                                                <div className={style.chat}>
                                                    <ChatRow data={data} />
                                                </div>
                                            </FlexChild>
                                        ))
                                        : null}
                                </VerticalFlex>

                            </FlexChild>

                        </div>
                    </FlexChild>
                    
                    <FlexChild>
                        <div className={style.footerChatArea}>
                            <HorizontalFlex>
                                <FlexChild>
                                    <InputText placeHolder={"chat"} ref={inputRef} onKeyUp={onKeyUp} />
                                </FlexChild>
                                <FlexChild width={"max-content"}>
                                    <div className={style.buttonArea}>
                                        <span onClick={onClick}><FontAwesomeIcon icon={faArrowUp} />{t("send")}</span>
                                    </div>
                                </FlexChild>
                                
                            </HorizontalFlex>
                            
                        </div>
                    </FlexChild>

                </>
                : null}

        </VerticalFlex>
    );
}

export default Chat;