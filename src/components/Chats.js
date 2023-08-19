import React from "react";
import { useState } from "react";
import '../css/Chats.css'
import industryData from '../utils/industryData';
import { defaultMessages, defaultReply } from "../utils/defaultMessages.js";
import chatHistory from "../utils/chatHistory";

function Chats() {
    //variables
    const [isExpanded, setIsExpanded] = useState({}); // Plus button of left side
    const [inputValue, setInputValue] = useState('');
    const [isDefaultMessages, setIsDefaultMessages] = useState(defaultMessages);
    const [userQuery, setUserQuery] = useState([]);
    const [isChatHistoryToggle, setIsChatHistoryToggle] = useState(false);
    const [updatedChatHistory] = useState(chatHistory);


    //  Functions : 

    //1. Handle industry-data if it has nested items
    const handleExpandButton = (industryName) => {
        if (industryData[industryName])
            setIsExpanded((prevState) => ({
                ...prevState,
                [industryName]: !prevState[industryName]
            }));
    };


    //2. Handle Search input box
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    }


    //3. Handle user userQuery of chat conversation
    const handleSendQueryButton = () => {
        if (inputValue.trim() === '') return;

        const newQuery = {
            text: inputValue,
            isUser: true,
        };

        setIsDefaultMessages([]);

        setUserQuery([...userQuery, newQuery]);
        setInputValue('');

        setTimeout(() => {
            const conversationContainer = document.querySelector(".chats-conversation-container");
            conversationContainer.scrollTop = conversationContainer.scrollHeight;
        }, 10);
    }


    //4. Handle when user press enter button while writing in  input box 
    const handleEnterPressed = (e) => {
        if (e.key === 'Enter')
            handleSendQueryButton();

    }


    //5.  open-close chatHistory section of right side
    const handleToggleChatHistoryButton = () => {
        setIsChatHistoryToggle(!isChatHistoryToggle);
    }


    //6. for new conversation on cllick of new chat button 
    const startNewConversation = () => {
        setUserQuery([]);
        setIsDefaultMessages([]);
    }


    //7.Handle copy button
    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
    }

    //8.Hanlde download button
    const handleDownload = (ques, ans) => {
        const content = `Question: ${ques}\nAnswer: ${ans}`;
        const blob = new Blob([content], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'RON-Reply.txt';
        document.body.appendChild(a);

        a.click();

        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    };



    //10. Handle File Upload
    const handleFileUpload = (e) => {
        const selectedFile = e.target.files[0];

        if (selectedFile) {
            const reader = new FileReader();

            reader.onload = (event) => {
                const fileContent = event.target.result;
                setInputValue(fileContent);
            };

            reader.readAsText(selectedFile, 'UTF-8');
        }

    }



    return (
        <main className="Chats-UI">

            {/* chat-component-left-section  */}
            <section className='chat-component-left-section'>
                <div className="left-section-title-container">
                    <p className="left-section-title">Categories</p>
                </div>
                <div className="industry-data-container">
                    {Object.keys(industryData).map((industryName) => (
                        <div className="industry-data">
                            <div className='industry-name-container' key={industryName}>
                                <img id="page-icon" src="./page.svg" alt="page-icon" />
                                <p className='data'>{industryName}</p>

                                <img id="expand-button" className="clickable-icon" src={isExpanded[industryName] ? "./minus-icon.svg" : "./add-circle-button.svg"}
                                    alt="expand-button"
                                    onClick={() => handleExpandButton(industryName)} />
                            </div>
                            {isExpanded[industryName] && (
                                <div className="industry-nested-data">
                                    {industryData[industryName].length > 0 ?

                                        industryData[industryName].map((item, index) => (
                                            <div className="industry-details-conatiner">
                                                <img src="./bullet-point.svg" alt="bullet-point" id="bullet-point" />
                                                <p key={index} className="industry-details">{item}</p>
                                            </div>
                                        ))

                                        :
                                        <p>No details</p>
                                    }
                                </div>
                            )
                            }
                        </div>
                    ))}
                </div>
            </section>


            {/* chat-component-main-section */}
            <section className={`chat-component-main-section ${isChatHistoryToggle ? 'shrink-right-section' : ''}`}>

                <div className="chat-component-main-container">

                    {/* search-box */}
                    <div className="search-box-container">
                        <div className="search-box">
                            <img className="search-icon" src="./search.svg" alt="search-icon"></img>
                            <input type="text" className="input-box" placeholder="Search"
                                value={inputValue}
                                onChange={handleInputChange}
                                onKeyDown={(e) => handleEnterPressed(e)}

                            />
                            <img id="send-button" className="clickable-icon" src="./send-button.svg" alt="send-button" onClick={handleSendQueryButton} />
                            <p className="search-vertical-line"></p>
                            <label htmlFor="uploadFileInput">
                                <img
                                    id="uploadFileButton"
                                    className="clickable-icon"
                                    src="./upload-file-button.svg"
                                    alt="upload-file-button"
                                />
                            </label>
                            <input
                                type="file"
                                id="uploadFileInput"
                                accept=".doc, .docx, .txt"
                                style={{ display: 'none' }}
                                onChange={handleFileUpload}
                            />
                        </div>

                    </div>


                    <div className="chats-conversation-container">
                        <div >

                            {/* default messages */}
                            {isDefaultMessages.map((message, index) => {
                                return (
                                    <div className="chats-conversation" key={index}>
                                        <div className="user">
                                            <img src="./profile-icon.svg" alt="profile" className="user-icon" />
                                            <p className="question">{message.ques}</p>
                                            <img className="clickable-icon" src="./copy-button.svg" alt="copy-button" onClick={() => handleCopy(message.ques)} />
                                        </div>
                                        <div className="bot">
                                            <img src="./brand-icon.svg" alt="bot-icon" />
                                            <p className="answer">{message.ans}
                                            </p>
                                            <img className="clickable-icon" src="./copy-button.svg" alt="copy-button" onClick={() => handleCopy(message.ans)} />

                                        </div>
                                        <div className="share-download-button-container">
                                            <img src="./share-button.svg" alt="share-button" className="clickable-icon" />
                                            <img className="clickable-icon" id="download-button" src="./download-button.svg" alt="download-button" onClick={() => handleDownload(message.text, defaultReply)} />
                                        </div>
                                    </div>
                                )
                            })}


                            {/* dynamic data */}
                            {userQuery.map((message, index) => (
                                <div className="chats-conversation">
                                    <div className="user" key={index}>
                                        <img src="./profile-icon.svg" alt="profile" className="user-icon" />
                                        <p className="question">{message.text}</p>
                                        <img className="clickable-icon" src="./copy-button.svg" alt="copy-button" onClick={() => handleCopy(message.text)} />
                                    </div>

                                    <div className="bot">
                                        <img src="./brand-icon.svg" alt="bot-icon" />
                                        <p className="answer">{defaultReply}</p>
                                        <img className="clickable-icon" src="./copy-button.svg" alt="copy-button" onClick={() => handleCopy(defaultReply)} />
                                    </div >

                                    <div className="share-download-button-container">
                                        <img src="./share-button.svg" alt="share-button" className="clickable-icon" />
                                        <img className="clickable-icon" id="download-button" src="./download-button.svg" alt="download-button" onClick={() => handleDownload(message.text, defaultReply)} />
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>


            {/* chat-component right section */}
            {!isChatHistoryToggle &&
                <section className={`Chats-right-section ${isChatHistoryToggle ? 'shrink-right-section' : ''}`}>
                    <div className="Chat-history-top">
                        <div className="clickable-icon" id="new-chat-button" onClick={startNewConversation}>
                            <img src="./plus-icon.svg" alt="new-chat-icon" className="new-chat-icon" />
                            <p className="new-chat-text"> New Chat</p>
                        </div>
                        <p className="history-vertical-line"> </p>
                        <img id="toggle-chat-history-button" className="clickable-icon" src='./toggle-button-right-arrow.svg' alt="toggle-button" onClick={handleToggleChatHistoryButton} />
                    </div>


                    {/* chat-history-section  */}
                    <div className="chat-history-data-section-container" >
                        {Object.keys(updatedChatHistory).map(date => (
                            <div className="chat-history-data-section" key={date}>
                                {updatedChatHistory[date].length > 0 &&
                                    <p className="date">{date}</p>}
                                {updatedChatHistory[date].map((topic, index) => (
                                    <div className="history-container" key={index}>
                                        <img id="chat-history-icon" src="./clock-icon.svg" alt="chat-history-icon" />
                                        <p className="history">{topic}</p>

                                    </div>
                                ))}
                            </div>
                        ))}

                    </div>
                </section>
            }
        </main >
    )
}

export default Chats;