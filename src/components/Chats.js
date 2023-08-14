import React from "react";
import { useState } from "react";
import '../css/Chats.css'
import chatHistory from "../utils/chatHistory";
import industryData from '../utils/industryData'

function Chats() {
    const [isExpanded, setIsExpanded] = useState({});
    const [inputValue, setInputValue] = useState('');
    const [query, setquery] = useState([]);
    const [isChatHistoryToggle, setIsChatHistoryToggle] = useState(false);


    //Handle industry-data if it has nested items
    const handleExpandButton = (industryName) => {
        if (industryData[industryName].length > 0)
            setIsExpanded((prevState) => ({
                ...prevState,
                [industryName]: !prevState[industryName]
            }));
    };


    // open-close chatHistory function
    const handleToggleChatHistoryButton = () => {
        setIsChatHistoryToggle(!isChatHistoryToggle);
    }

    //Handle chat conversation
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    }

    const handleSendQueryButton = () => {
        if (inputValue.trim() === '') return;

        const newQuery = {
            text: inputValue,
            isUser: true,
        };

        setquery([...query, newQuery]);
        setInputValue('');


        setTimeout(() => {
            const conversationContainer = document.querySelector(".Chats-conversation");
            conversationContainer.scrollTop = conversationContainer.scrollHeight;
        }, 10);

    }


    return (
        <main className="Chats-UI">
            {/* Industry data section  */}
            <section className='chat-component-left-section'>
                {Object.keys(industryData).map((industryName) => (
                    <div className={`industry-data ${isExpanded[industryName] ? 'expanded' : ''}`}>
                        <div className='industry-name' key={industryName}>
                            <img className="page-icon" src="./page.svg" alt="page-icon" />
                            <p className='data'>{industryName}</p>

                            <img className="expand-button" src={isExpanded[industryName] ? "./minus-icon.svg" : "./add-circle-button.svg"}
                                alt="expand-button"
                                onClick={() => handleExpandButton(industryName)} />
                        </div>
                        {isExpanded[industryName] && (
                            <div className="industry-nested-data">
                                {industryData[industryName].map((item, index) => (
                                    <p key={index} className="industry-details">{item}</p>
                                ))}
                            </div>
                        )
                        }
                    </div>
                ))}
            </section>

            <section className={`Chats-main-section ${isChatHistoryToggle ? 'shrink-right-section' : ''}`}>
                <div className="chats-conversation-container">
                    {/* Input box */}
                    <div className="search-box">
                        <img className="search-icon" src="./search.svg" alt="search-icon"></img>
                        <input type="text" className="input-box" placeholder="search"
                            value={inputValue}
                            onChange={handleInputChange} />

                        <img className="send-button" src="./send.svg" alt="send-button" onClick={handleSendQueryButton} />
                        <img className="uploadFileButton" src="./upload-file.svg" alt="üpload-file-button" />

                        {/* <button className="send-button" onClick={handleSendMessage}>
                        <img src="send.svg" alt="Send Icon" />
                       </button> */}
                    </div>

                    
                        {/* static data */}
                        <div className="Chats-conversation">
                        {query.map((message, index) => (
                       <div className="queries-reply">
                       <div className="user" key={index}>
                                <img src="./user-icon.svg" alt="user-icon" />
                                <p className="question">{message.text}</p>
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
                     ))}
                     </div>

                    {/* <div className="message bot">Hi! I am Ron  😄</div>
                    <div className="message bot">Tell me, How can I help You</div>

                    {query.map((message, index) => (
                        <div key={index} className={`message ${message.isUser ? 'user' : 'bot'}`}>
                           <img src="" alt="user-icon"/> 
                           <p> {message.text}</p>
                        </div>
                    ))} */}

                </div>

                {isChatHistoryToggle &&
                    <button className="open-chat-history-button" onClick={handleToggleChatHistoryButton}>Chat History</button>
                }
            </section>


            {/* chat-component right section */}
            {!isChatHistoryToggle &&
                <section className={`Chats-right-section ${isChatHistoryToggle ? 'shrink-right-section' : ''}`}>
                    <div className="Chat-history-top">
                        <img className="close-chat-history-button" src='./hamburger-icon.svg' alt="notification" onClick={handleToggleChatHistoryButton} />
                        <div className="New-chat-button">
                            <img src='plus-sign.svg' alt="plus-sign" />
                            <p className="New-chat-text"> NewChat </p>
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