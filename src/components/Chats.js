import React from "react";
import { useEffect, useState } from "react";
import '../css/Chats.css'
import chatHistory from "../utils/chatHistory";
import sampleData from '../utils/industryData'

function Chats() {
    const [inputValue, setInputValue] = useState('');
    //const [messages, setMessages] = useState([]);
    const [data, setData] = useState(sampleData);
    const [isToggle, setIsToggle] = useState(false);


    const handleToggleButton = () => {
        setIsToggle(!isToggle);
    }

    useEffect(() => {
        handleSampleData();
    }, []);

    const handleSampleData = async () => {
        setData(sampleData);
    }


    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    }

    // const handleSendMessage = () => {
    //     if (inputValue.trim() === '') return;

    //     const newMessage = {
    //         text: inputValue,
    //         isUser: true,
    //     };

    //     setMessages([...messages, newMessage]);
    //     setInputValue('');


    //     setTimeout(() => {
    //         const conversationContainer = document.querySelector(".chatbot-conversation");
    //         conversationContainer.scrollTop = conversationContainer.scrollHeight;
    //     }, 10);

    // }


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
                    //yha pe
                ))}

            </section>

            <section className={`Chats-main-section ${isToggle ? 'shrink-right-section' : ''}`}>

                <div className="chats-conversation-container">
                    {/* Input box */}
                    <div className="search-box">
                        <img className="search-icon" src="./search.svg" alt="search-icon"></img>
                        <input type="text" className="input-box" placeholder="search"
                            value={inputValue}
                            onChange={handleInputChange} />
                        <img className="send-button" src="./send.svg" alt="send-button" />
                        <img className="uploadFileButton" src="./upload-file.svg" alt="üpload-file-button" />

                        {/* <button className="send-button" onClick={handleSendMessage}>
                        <img src="send.svg" alt="Send Icon" />
                       </button> */}
                    </div>
                    <div className="Chats-conversation">
                        {/* static data */}
                        <div className="user">
                            <img src="./user-icon.svg" alt="user-icon" />
                            <p className="question">Summarize embracing over cloud for IIM Nagpur</p>
                            <img src="./copy-icon.svg" alt="copy-icon" />
                            <img src="./edit-icon.svg" alt="edit-icon" />
                        </div>
                        <div className="bot">
                            <img src="./bot-icon.svg" alt="bot-icon" />
                            <p className="answer">The client is an Indian institution of management, one of twenty such
                                institutions. Currently located within the VNIT Nagpur campus, they will
                                eventually move to their own 135-acre campus at MIHAN, Nagpur. The
                                institute's curriculum, designed by management education experts,
                                emphasizes entrepreneurial exploration and ofers support to students in
                                pursuing their ambitions.
                                The objective is to create a new, user-friendly website and an integrated
                                intranet portal for improved collaboration and communication among
                                stakeholders. </p>
                            <img src="./copy-icon.svg" alt="copy-icon" />
                            <img src="./download-icon.svg" alt="download-icon" />
                        </div>
                  </div>   

                        {/* <div className="message bot">Hi! I am Ron  😄</div>
                    <div className="message bot">Tell me, How can I help You</div>

                    {messages.map((message, index) => (
                        <div key={index} className={`message ${message.isUser ? 'user' : 'bot'}`}>
                           <img src="" alt="user-icon"/> 
                           <p> {message.text}</p>
                        </div>
                    ))} */}
                    
                </div>
                {isToggle &&
                <button className="open-chat-history-button" onClick={handleToggleButton}>Chat History</button>
               }
            </section>

          
           {/* chat-component right section */}
           {!isToggle &&
            <section className={`Chats-right-section ${isToggle ? 'shrink-right-section' : ''}`}>

                    <div className="Chat-history-top">
                        <img className="close-chat-history-button" src='./hamburger-icon.svg' alt="notification" onClick={handleToggleButton} />
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
                }
        </main >
    )
}

export default Chats;