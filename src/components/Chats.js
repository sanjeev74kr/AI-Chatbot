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

            {/* Chat component left section  */}
            <section className="Chats-left-section">
                <div className="Chats-heading">
                    <div className="Chats-heading1">
                        <h1 >Unlock the Power of AI</h1>
                    </div>
                    <div className="Chats-heading2">
                        <h4>Chat with the smartest AI - Experience the power of AI with us</h4>
                    </div>
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
               
               {/* Input box */}
                <div className="Chats-input-box">
                    <img src="./add-circle-button.svg" />
                    <input type="text" className="input-box" placeholder="Ask Ron anything..."
                        value={inputValue}
                        onChange={handleInputChange} />
                    <img src="./voice-icon.svg"></img>
                    {/* <button className="send-button" onClick={handleSendMessage}>
                        <img src="send.svg" alt="Send Icon" />
                    </button> */}
                </div>
            </section>


            {/* chat-component right section */}
            <section className="Chats-right-section">
                <div className="Chat-history-top">
                    <span className="Notifcation"><img src='./notification.svg' alt="notification" /></span>
                    <span className="Profile"><img src='./profile.svg' alt="profile-pic" /></span>
                    <span className="Share-button"><p>Share</p></span>
                </div>
                <div className="Horizontal-line"></div>

                <div className="Chat-history"><p>Search History</p>
                    <div className="Horizontal-line"></div>
                </div>
                <div className="Horizontal-line"></div>

                <div className="New-chat-button">
                    <img src='plus-sign.svg' alt="plus-sign" />
                    <p className="New-chat-text"> New Chat </p>
                </div>
            </section>
        </main >
    )
}

export default Chats;