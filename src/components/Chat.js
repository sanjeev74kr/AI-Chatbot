import React from "react";
import { useState,useEffect } from "react";
import '../styles/chat.css'
import industryData from '../data/industryData';
import { defaultMessages, defaultReply } from "../data/defaultMessages.js";
import chatHistory from "../data/chatHistory";

function Chat() {
    //variables
    const [isExpanded, setIsExpanded] = useState({}); // Plus button of left side
    const [inputValue, setInputValue] = useState('');
    const [isDefaultMessages, setIsDefaultMessages] = useState(defaultMessages);
    const [userQuery, setUserQuery] = useState([]);
    const [isChatHistoryToggle, setIsChatHistoryToggle] = useState(false);
    const [updatedChatHistory] = useState(chatHistory);
    const [isLeftSectionToggle, setIsLeftSectionToggle]= useState(true);


    //  Functions : 

    //1. Handle industry-data if it has nested items
    const handleExpandButton = (index) => {
        if (industryData[index])
            setIsExpanded((prevState) => ({
                ...prevState,
                [index]: !prevState[index]
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
    const handleNewChatButton = () => {
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


    //handle-left-section-toggle-button
    const handleLeftSectionToggleButton=()=>{
        if(window.innerWidth<=768)
        setIsLeftSectionToggle(true);
    else
     setIsLeftSectionToggle(!isLeftSectionToggle);
    
    }

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 768px)");

        // Initial call to handle left section toggle based on screen width
        handleLeftSectionToggleButton(mediaQuery.matches);

        // Add listener for screen width changes
        const handleMediaQueryChange = (e) => {
            handleLeftSectionToggleButton(e.matches);
        };

        mediaQuery.addListener(handleMediaQueryChange);

        // Clean up the listener when component unmounts
        return () => {
            mediaQuery.removeListener(handleMediaQueryChange);
        };
    }, []); // Empty dependency array to run this effect only once




    return (
        <main className="Chats-UI">

            {/* chat-component-left-section  */}
            {!isLeftSectionToggle &&
            <section className="chat-component-left-section">
                <div className="left-section-title-container">
                    <p className="left-section-title">Industries</p>
                    <img className="left-section-toggle-button toggle-button" src="./toggle-button-left-arrow.svg" alt="left-section-toogle-button" onClick={handleLeftSectionToggleButton}/>
                </div>
                <div className="industry-data-container">
                    {industryData.map((industry, index) => (
                        <div className="industry-data">
                            <div className='industry-title-container' key={index}>
                                <img id="industry-icon" src={industry.icon} alt="page-icon" />
                                <p className='industry-name'>{industry.name}</p>

                                <img id="expand-button" className="clickable-icon" src={isExpanded[index] ? "./up-arrow-icon.svg" : "./down-arrow-icon.svg"}
                                    alt="expand-button"
                                    onClick={() => handleExpandButton(index)} />
                            </div>

                            {isExpanded[index] && (
                                <div className="industry-nested-data-container">
                                    {industry.nestedData.length > 0 ?

                                        industry.nestedData.map((item, index) => (
                                            <div className="industry-nested-data">
                                                <img src="./bullet-point.svg" alt="bullet-point" id="bullet-point" />
                                                <p key={index} className="industry-nested-items">{item}</p>
                                            </div>
                                        ))

                                        :
                                        <p style={{ color: "#969696", marginLeft: "1rem" }}>No details</p>
                                    }
                                </div>

                            )
                            }
                            <div className="horizontal-line"></div>
                        </div>
                    ))}
                </div>
            </section>
}

            {isLeftSectionToggle &&
              <section className="shrunked-chat-component-left-section">
                <div className="shrunked-left-section-container">
                    <div>
                    <img className="toggle-button" src="./left-section-toggle-button.svg" alt="left-section-toggle-button" onClick={handleLeftSectionToggleButton}/>
                    <div className="shrunked-horizontal-line"></div>
                    </div>
                    {
                        industryData.map((industry,index)=>(
                            <div className="industry-icon-container" key={index}>
                                <img src={industry.icon} alt="industry-icons"/>
                                <div className="shrunked-horizontal-line"></div>
                            </div>
                        )
                        )
                    }
                </div>
              </section>
            }

            {/* chat-component-main-section */}
            <section className={`chat-component-main-section ${isChatHistoryToggle ? 'shrink-right-section' : ''} ${isLeftSectionToggle ? 'shrink-left-section' : ''}`}
>

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
                            <p className="vertical-line"></p>
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

                        <div className="shrunked-right-section-button">
                    <img className="shrunked-new-chat-button" src="./plus-icon.svg" alt="new-chat-button" onClick={handleNewChatButton}/>
                    <div className='vertical-line'></div>
                    <img className="toggle-button toggle-chat-history-button" src="./toggle-button-right-arrow.svg" alt="toggle-right-section-button" onClick={handleToggleChatHistoryButton}/>    
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
                                            <img className="clickable-icon download-button" src="./download-button.svg" alt="download-button" onClick={() => handleDownload(message.text, defaultReply)} />
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
                                        <img className="clickable-icon download-button" src="./download-button.svg" alt="download-button" onClick={() => handleDownload(message.text, defaultReply)} />
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>


            {/* chat-component right section */}
            
                <section className={`chats-right-section ${isChatHistoryToggle ? 'shrink-right-section' : ''}`}>
                    <div className="chat-history-top">
                        <div className="clickable-icon" id="new-chat-button" onClick={handleNewChatButton}>
                            <img src="./plus-icon.svg" alt="new-chat-icon" className="new-chat-icon" />
                            <p className="new-chat-text"> New Chat</p>
                        </div>
                        <p className="vertical-line history-vertical-line"> </p>
                        <img id="toggle-chat-history-button" className="toggle-button" src='./toggle-button-right-arrow.svg' alt="toggle-button" onClick={handleToggleChatHistoryButton} />
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
                                        <img className="clickable-icon edit-button"src="./edit-button.svg" alt="edit-button"/>
                                        <img className="clickable-icon delete-button"src="./delete-button.svg" alt="delete-button"/>
                                    </div>
                                ))}
                            </div>
                        ))}

                    </div>
                </section>
            
        </main >
    )
}

export default Chat;