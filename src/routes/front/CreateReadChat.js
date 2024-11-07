import React, { useContext, useEffect, useRef, useState } from 'react'
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import style from "./Chat.module.css";
import clsx from 'clsx';
import qr from "./qr.png";
import $ from "jquery";
import VerticalFlex from 'layouts/flex/VerticalFlex';
import FlexChild from 'layouts/flex/FlexChild';
import { AuthContext } from 'providers/AuthProvider';

var stompClient = null;
const CreateReadChat = () => {
    const [privateChats, setPrivateChats] = useState(new Map());
    const [publicChats, setPublicChats] = useState([]);
    const [tab, setTab] = useState("CHATROOM");
    const messageBoxRef = useRef();
    const { userName } = useContext(AuthContext);
    const [userData, setUserData] = useState({
        username: userName,
        receivername: '',
        connected: false,
        message: ''
    });
    useEffect(() => {
        console.log("userData", userData);
    }, [userData]);

    const connect = () => {
        let Sock = new SockJS("http://localhost:8080"+'/api/ws');
        stompClient = over(Sock);
        stompClient.connect({}, onConnected, onError);
    }

    const onConnected = () => {
        setUserData({ ...userData, "connected": true });
        stompClient.subscribe('/chatroom/public', onMessageReceived);
        stompClient.subscribe('/user/' + userData.username + '/private', onPrivateMessage);
        userJoin();
    }

    const userJoin = () => {
        var chatMessage = {
            senderName: userData.username,
            status: "JOIN"
        };
        stompClient.send("/app/message", {}, JSON.stringify(chatMessage));

        if (userData.username !== "fjdgj123@naver.com") {
            sendWelcome(userData.username)
        }

    }

    const onMessageReceived = (payload) => {
        var payloadData = JSON.parse(payload.body);
        switch (payloadData.status) {
            case "JOIN":
                if (!privateChats.get(payloadData.senderName)) {
                    privateChats.set(payloadData.senderName, []);
                    setPrivateChats(new Map(privateChats));
                }
                break;
            case "MESSAGE":
                publicChats.push(payloadData);
                setPublicChats([...publicChats]);
                break;
            default:
                scrollToBottom();
        }


    }

    const onPrivateMessage = (payload) => {
        console.log(payload);
        var payloadData = JSON.parse(payload.body);
        if (privateChats.get(payloadData.senderName)) {
            privateChats.get(payloadData.senderName).push(payloadData);
            setPrivateChats(new Map(privateChats));
        } else {
            let list = [];
            list.push(payloadData);
            privateChats.set(payloadData.senderName, list);
            setPrivateChats(new Map(privateChats));
        }
        scrollToBottom();
    }

    const onError = (err) => {
        console.log(err);

    }

    const handleMessage = (event) => {
        const { value } = event.target;
        setUserData({ ...userData, "message": value });
    }
    const sendValue = () => {
        if (stompClient) {
            var chatMessage = {
                senderName: userData.username,
                message: userData.message,
                status: "MESSAGE"
            };
            console.log(chatMessage);
            stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
            setUserData({ ...userData, "message": "" });
            scrollToBottom();
        }

    }

    const sendWelcome = (receiverName) => {
        if (stompClient) {
            var chatMessage = {
                senderName: "fjdgj123@naver.com",
                receiverName: receiverName,
                message: "안녕하세요",
                status: "MESSAGE"
            };
            stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));

        }
    }

    const sendPrivateValue = () => {
        if (stompClient) {
            var chatMessage = {
                senderName: userData.username,
                receiverName: tab,
                message: userData.message,
                status: "MESSAGE"
            };

            if (userData.username !== tab) {
                privateChats.get(tab).push(chatMessage);
                setPrivateChats(new Map(privateChats));
            }
            stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
            setUserData({ ...userData, "message": "" });
            scrollToBottom();
        }
    }

    const sendQR = () => {
        if (stompClient) {
            var chatMessage = {
                senderName: userData.username,
                message: "sendQR",
                status: "MESSAGE"
            };
            console.log(chatMessage);
            stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
            setUserData({ ...userData, "message": "" });
            scrollToBottom();
        }
    }

    const sendPrivateQR = () => {
        if (stompClient) {
            var chatMessage = {
                senderName: userData.username,
                receiverName: tab,
                message: "sendQR",
                status: "MESSAGE"
            };

            if (userData.username !== tab) {
                privateChats.get(tab).push(chatMessage);
                setPrivateChats(new Map(privateChats));
            }
            stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
            setUserData({ ...userData, "message": "" });
            scrollToBottom();
        }
    }

    const scrollToBottom = () => {
        // $(`.${style.chatMessages}`).scrollTop = $(`.${style.chatMessages}`).scrollHeight
        $('.Chat_chatMessages__i7TIN').scrollTop = $('.Chat_chatMessages__i7TIN').scrollHeight
    }

    const handleUsername = (event) => {
        const { value } = event.target;
        setUserData({ ...userData, "username": value });
    }

    const registerUser = () => {
        connect();
    }

    useEffect(() => {
        scrollToBottom();
    }, [privateChats, publicChats]);

    useEffect(() => {
        console.log(userData);
        // setUserData({ ...userData, "username": userName });
    }, []);

    useEffect(() => {
        setUserData({ ...userData, "username": userName });
    }, [userName]);

    useEffect(() => {
        console.log("userData.username", userData.username);
        if (userData.username.length > 0) {
            connect();
        }

    }, [userData.username]);

    return (
        <div className={style.container}>
            {userData.connected ?
                <div className={style.chatBox}>
                    <VerticalFlex>
                        <FlexChild height={"initial"}>
                            <div className={style.memberList}>
                                <ul>
                                    {/* <li onClick={() => { setTab("CHATROOM") }} className={clsx(style.member, { [style.active]: tab === "CHATROOM" })}>Chatroom</li> */}
                                    {[...privateChats.keys()].map((name, index) => (
                                        name !== userData.username &&
                                            userData.username === "fjdgj123@naver.com" ?
                                            <li onClick={() => { setTab(name) }} className={clsx(style.member, { [style.active]: tab === name })} key={index}>{name}</li>
                                            : name === "fjdgj123@naver.com" &&
                                            <li onClick={() => { setTab(name) }} className={clsx(style.member, { [style.active]: tab === name })} key={index}>{name}</li>
                                    ))}
                                </ul>
                            </div>
                        </FlexChild>
                        <FlexChild>
                            {tab === "CHATROOM" && <div className={style.chatContent}>
                                <ul className={style.chatMessages} ref={messageBoxRef}>
                                    {publicChats.map((chat, index) => (
                                        <li className={clsx(style.message, { [style.self]: chat.senderName === userData.username })} key={index}>
                                            <VerticalFlex>
                                                <FlexChild>
                                                    {chat.senderName !== userData.username && <div className={style.avatar}>{chat.senderName}</div>}
                                                    {chat.senderName === userData.username && <div className={clsx(style.avatar, style.self)}>{chat.senderName}</div>}
                                                </FlexChild>
                                                <FlexChild>
                                                    {
                                                        chat.message === "sendQR" ?
                                                            <img src={qr} />
                                                            :
                                                            <div className={clsx(style.messageData, { [style.self]: chat.senderName === userData.username })}>{chat.message}</div>
                                                    }
                                                </FlexChild>
                                            </VerticalFlex>
                                        </li>
                                    ))}
                                </ul>

                                <div className={style.sendMessage}>
                                    <input type="text" className={style.inputMessage} placeholder="enter the message" value={userData.message} onChange={handleMessage} />
                                    <button type="button" className={style.sendButton} onClick={sendValue}>send</button>
                                    {
                                        userData.username === "fjdgj123@naver.com" && <button type="button" className={style.sendButton} onClick={sendPrivateQR}>qr</button>
                                    }
                                </div>
                            </div>}
                            {tab !== "CHATROOM" && <div className={style.chatContent}>
                                <ul className={style.chatMessages} ref={messageBoxRef}>
                                    {[...privateChats.get(tab)].map((chat, index) => (

                                        <li className={clsx(style.message, { [style.self]: chat.senderName === userData.username })} key={index}>
                                            <VerticalFlex>
                                                <FlexChild alignItems={chat.senderName === userData.username?"flex-end":"flex-start"}>
                                                    {chat.senderName !== userData.username && <div className={style.avatar}>{chat.senderName}</div>}
                                                    {chat.senderName === userData.username && <div className={clsx(style.avatar, style.self)}>{chat.senderName}</div>}
                                                </FlexChild>
                                                <FlexChild alignItems={chat.senderName === userData.username?"flex-end":"flex-start"}>
                                                    {
                                                        chat.message === "sendQR" ?
                                                            <img src={qr} />
                                                            :
                                                            <div className={clsx(style.messageData, { [style.self]: chat.senderName === userData.username })}>{chat.message}</div>
                                                    }
                                                </FlexChild>
                                            </VerticalFlex>

                                        </li>
                                    ))}
                                </ul>

                                <div className={style.sendMessage}>
                                    <input type="text" className={style.inputMessage} placeholder="enter the message" value={userData.message} onChange={handleMessage} />
                                    <button type="button" className={style.sendButton} onClick={sendPrivateValue}>send</button>
                                    {
                                        userData.username === "fjdgj123@naver.com" && <button type="button" className={style.sendButton} onClick={sendPrivateQR}>qr</button>
                                    }
                                </div>
                            </div>}
                        </FlexChild>
                    </VerticalFlex>
                </div>
                :
                <div className={style.register}>
                    {/* <VerticalFlex>
                        <FlexChild>
                            <input
                                id="user-name"
                                placeholder="Enter your name"
                                name="userName"
                                value={userData.username}
                                onChange={handleUsername}
                                margin="normal"
                            />
                        </FlexChild>
                        <FlexChild>
                            <button type="button" onClick={registerUser}>
                                connect
                            </button>
                        </FlexChild>
                    </VerticalFlex> */}


                </div>}
        </div>
    )
}

export default CreateReadChat;