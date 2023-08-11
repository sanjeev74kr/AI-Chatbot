import React from "react";
import { useEffect, useState } from "react";
import '../css/Chats.css'
import chatHistory from "../utils/chatHistory";
import sampleData from '../utils/industryData'

function Chats() {
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState([]);
    const [data, setData] = useState(sampleData);


    useEffect(() => {
        handleSampleData();
    }, []);

    const handleSampleData = async () => {
        setData(sampleData);
    }


    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    }

    const handleSendMessage = () => {
        if (inputValue.trim() === '') return;

        const newMessage = {
            text: inputValue,
            isUser: true,
        };

        setMessages([...messages, newMessage]);
        setInputValue('');


        setTimeout(() => {
            const conversationContainer = document.querySelector(".chatbot-conversation");
            conversationContainer.scrollTop = conversationContainer.scrollHeight;
        }, 10);

    }

    return (
        <main className="Chats-UI">

            {/* sample data section  */}
            <section className='chat-component-left-section'>
                {data.map((curr, index) => (
                    <div className='Sample-data'>
                        <img className="page-icon" src="./page.svg" alt="page-icon" />
                        <p className='data'>{curr}</p>
                        <img className="expand-button" src="./add-circle-button.svg" alt="expand-button" />
                    </div>
                ))}

            </section>

            <section className="Chats-main-section">
                {/* Input box */}
                <div className="search-box">
                    <img className="search-icon" src="./search.svg" alt="search-icon"></img>
                    <input type="text" className="input-box" placeholder="search"
                        value={inputValue}
                        onChange={handleInputChange} />
                    <img className="send-button" src="./send.svg" alt="send-button" />
                    <img className="uploadFileButton" src="./upload-file.svg" />

                    {/* <button className="send-button" onClick={handleSendMessage}>
                        <img src="send.svg" alt="Send Icon" />
                    </button> */}
                </div>
                <div className="Chats-conversation">
                    <div className="message bot">Hi! I am Ron  😄</div>
                    <div className="message bot">Tell me, How can I help You</div>

                    {messages.map((message, index) => (
                        <div key={index} className={`message ${message.isUser ? 'user' : 'bot'}`}>
                            {message.text}
                        </div>
                    ))}
                </div>

            </section>


            {/* chat-component right section */}
            <section className="Chats-right-section">
                <div className="Chat-history-top">
                    <img className="toggle-button" src='./hamburger-icon.svg' alt="notification" />
                    <div className="New-chat-button">
                        <img src='plus-sign.svg' alt="plus-sign" />
                        <p className="New-chat-text"> New Chat </p>
                    </div>
                </div>


                {/* chat-history-section                */}
                {Object.keys(chatHistory).map(date => (
                    <div className="chat-history-data-section" key={date}>
                        <p className="date">{date}</p>
                        {chatHistory[date].map((topic, index) => (
                            <div className="bookmark-plus-history-container">
                                <img className="bookmark-button" src="./bookmark-icon.svg" alt="bookmark-icon" />
                                <p className="history" key={index}>{topic}</p>
                            </div>
                        ))}
                    </div>
                ))}


            </section>
        </main >
    )
}

export default Chats;