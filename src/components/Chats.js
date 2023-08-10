import React from "react";
import '../css/Chats.css'
import { useState } from "react";

function Chats() {
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState([]);

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
                <span className="toggle-button"><img src='./hamburger-icon.svg' alt="notification" /></span>
                    <div className="New-chat-button">
                        <img src='plus-sign.svg' alt="plus-sign" />
                        <p className="New-chat-text"> New Chat </p>
                    </div>   
                </div>

                <div className="Chat-history">
                    
                    <div className="chat-history-data">
                    <p className="day">Today</p>
                    <p className="history">smart-tracking</p>
                    <p className="history">smart-tracking</p>
                    <p className="history">smart-tracking</p>
               <p className="day">Yesterday</p>
               <p className="history">quantum-computing</p>
               <p className="history">smart</p>
               <p className="history">Maths</p>
                </div>
                </div>
        

                
            </section>
        </main >
    )
}

export default Chats;