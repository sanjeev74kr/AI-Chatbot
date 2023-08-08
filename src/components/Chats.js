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
        <div className="Chats-UI">
            <div className="Chats-section">
                <div className="Chats-heading">
                    <div className="Chats-heading1">
                        <h1 >Unlock the Power of AI</h1>
                    </div>
                    <div className="Chats-heading2">
                        <h5>Chat with the smartest AI - Experience the power of AI with us</h5>
                    </div>
                </div>
                <div className="Chats-conversation">
                    <div className="message bot">Hi! I am Documnets Intelligence 😄</div>
                    <div className="message bot">Tell me, How can I help You</div>

                    {messages.map((message, index) => (
                        <div key={index} className={`message ${message.isUser ? 'user' : 'bot'}`}>
                            {message.text}
                        </div>
                    ))};
                </div>

            </div>
            <div className="Chats-input-box">
                <input type="text" className="input-box" placeholder="Ask Documnets Intelligence anything..."
                    value={inputValue}
                    onChange={handleInputChange} />

                <button className="send-button" onClick={handleSendMessage}>
                    <img src="send.svg" alt="Send Icon" />
                </button>

            </div>
        
             {/* <div className="Chats-history-section">
                <div className="Chat-history-top">
                    <span className="Notifcation"></span>
                    <span className="Profile"></span>
                    <span className="Share"></span>
                </div>
                <div className="Chat-history"><h3>Search History</h3></div>
                <div className="New-chat">
                    <button className="New-chat-button">New Chat</button>
                </div>
            </div> */}
        </div >
    )
}

export default Chats;