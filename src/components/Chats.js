import React from "react";
import { useState } from "react";
import '../css/Chats.css'
import chatHistory from "../utils/chatHistory";
import industryData from '../utils/industryData';

function Chats() {
    const [isExpanded, setIsExpanded] = useState({});
    const [inputValue, setInputValue] = useState('');
    const [query, setquery] = useState([]);
    const [isChatHistoryToggle, setIsChatHistoryToggle] = useState(false);


    //Handle industry-data if it has nested items
    const handleExpandButton = (industryName) => {
        if (industryData[industryName])
            setIsExpanded((prevState) => ({
                ...prevState,
                [industryName]: !prevState[industryName]
            }));
    };


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


    //handle enter button press 
    const handleEnterPressed = (e) => {
        if (e.key === 'Enter')
            handleSendQueryButton();
    }

    // open-close chatHistory function
    const handleToggleChatHistoryButton = () => {
        setIsChatHistoryToggle(!isChatHistoryToggle);
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
                                <img className="page-icon" src="./page.svg" alt="page-icon" />
                                <p className='data'>{industryName}</p>

                                <img className="expand-button" src={isExpanded[industryName] ? "./minus-icon.svg" : "./add-circle-button.svg"}
                                    alt="expand-button"
                                    onClick={() => handleExpandButton(industryName)} />
                            </div>
                            {isExpanded[industryName] && (
                                <div className="industry-nested-data">
                                    {industryData[industryName].length > 0 ?

                                        industryData[industryName].map((item, index) => (
                                            <p key={index} className="industry-details">{`${index+1}.${item}`}</p>
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
                            <input type="text" className="input-box" placeholder="search"
                                value={inputValue}
                                onChange={handleInputChange}
                                onKeyDown={(e) => handleEnterPressed(e)}

                            />
                            <img className="send-button" src="./send.svg" alt="send-button" onClick={handleSendQueryButton} />
                            <img className="uploadFileButton" src="./upload-file.svg" alt="üpload-file-button" />
                        </div>
                    </div>

                    {/* static data */}
                    <div className="chats-conversation-container">
                        <div className="Chats-conversation">

                            {/* default question-1 */}
                            <div className="user">
                                <img src="./user-icon.svg" alt="user-icon" />
                                <p className="question">Summarize Transforming healthcare project for me.</p>
                                <img src="./copy-icon.svg" alt="copy-icon" />
                                <img src="./edit-icon.svg" alt="edit-icon" />
                            </div>
                            <div className="bot">
                                <img src="./bot-icon.svg" alt="bot-icon" />
                                <p className="answer">The transforming healthcare project is a mobile application that helps users access detailed
                                    information about the specialists and their availability at a hospital, as well as digitally book appointments,
                                    find information about healthcare facilities provided by the hospital, and more. It was developed using .Net, iOS,
                                    and Android technologies for the USA health and fitness sector.
                                </p>
                                <img src="./copy-icon.svg" alt="copy-icon" />
                                <img src="./download-icon.svg" alt="download-icon" />
                            </div>

                            {/* default question-2 */}
                            <div className="user">
                                <img src="./user-icon.svg" alt="user-icon" />
                                <p className="question">What are the business benefits realized in Smart pregnancy app</p>
                                <img src="./copy-icon.svg" alt="copy-icon" />
                                <img src="./edit-icon.svg" alt="edit-icon" />
                            </div>
                            <div className="bot">
                                <img src="./bot-icon.svg" alt="bot-icon" />
                                <p className="answer">The app helps in
                                    1. Improved Patient Engagement & Education
                                    2. Better Health Outcomes for Mom and Baby
                                    3. Enhanced Physician-Patient Communication
                                    4. Reduction of Health Disparities
                                    5. Increased Patient Satisfaction and Loyalty </p>
                                <img src="./copy-icon.svg" alt="copy-icon" />
                                <img src="./download-icon.svg" alt="download-icon" />
                            </div>

                            {/* default question-3 */}
                            <div className="user">
                                <img src="./user-icon.svg" alt="user-icon" />
                                <p className="question">What was the overall sentiment of the project execution – customer perspective and
                                    team perspective in Tech transformation project?</p>
                                <img src="./copy-icon.svg" alt="copy-icon" />
                                <img src="./edit-icon.svg" alt="edit-icon" />
                            </div>
                            <div className="bot">
                                <img src="./bot-icon.svg" alt="bot-icon" />
                                <p className="answer">Please note that I'm just an AI and do not have personal opinions or emotions,
                                    but based on the given context, I can provide a neutral analysis.

                                    The project was aimed at building a platform to bridge the gap between small-scale businesses and customers,
                                    but the client had limited resources to execute their ideas. The KCS team conducted extensive research and dedicated
                                    prolonged hours to understand the client's requirements. From both customer and team perspectives,
                                    the overall sentiment of the project execution was likely positive.
                                    The customer perspective:

                                    The client was facing operational complexity in the entire process, but with the help of KCS, they were able to eliminate that gap.
                                    The KCS team took the time to understand their requirements and provided fit-to-purpose solutions for a better experience and interactivity.
                                    This suggests that the customer was satisfied with the outcome of the project.


                                    The team perspective:

                                    The KCS team left no stones unturned in the quest to build a precise solution that met the client's needs.
                                    They dedicated prolonged hours to understand the requirements and conducted extensive research to deliver a comprehensive tech transformation
                                    project. This suggests that the team was
                                </p>
                                <img src="./copy-icon.svg" alt="copy-icon" />
                                <img src="./download-icon.svg" alt="download-icon" />
                            </div>

                            {/* default question-4 */}
                            <div className="user">
                                <img src="./user-icon.svg" alt="user-icon" />
                                <p className="question">What technologies are utilized in Smart vehicle tracking system?</p>
                                <img src="./copy-icon.svg" alt="copy-icon" />
                                <img src="./edit-icon.svg" alt="edit-icon" />
                            </div>
                            <div className="bot">
                                <img src="./bot-icon.svg" alt="bot-icon" />
                                <p className="answer">Based on the given context, the following technologies are utilized in the Smart vehicle tracking system:
                                    1. Asp.Net MVC
                                    2. Web API
                                    3. MS SQL
                                    4. AWS Cloud </p>
                                <img src="./copy-icon.svg" alt="copy-icon" />
                                <img src="./download-icon.svg" alt="download-icon" />
                            </div>


                            {/* dynamic data */}
                            {query.map((message, index) => (
                                <div className="chats-conversation">
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
                    </div>
                    <div className="open-chat-history-button-container">
                        {isChatHistoryToggle &&
                            <button className="open-chat-history-button" onClick={handleToggleChatHistoryButton}>Chat History</button>
                        }
                    </div>
                </div>
            </section>


            {/* chat-component right section */}
            {!isChatHistoryToggle &&
                <section className={`Chats-right-section ${isChatHistoryToggle ? 'shrink-right-section' : ''}`}>
                    <div className="Chat-history-top">
                        <img className="close-chat-history-button" src='./hamburger-icon.svg' alt="notification" onClick={handleToggleChatHistoryButton} />
                        <p className="New-chat-button">+ New Chat </p>
                    </div>


                    {/* chat-history-section  */}
                    <div className="chat-history-data-section-container">
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

                    </div>
                </section>
            }
        </main >
    )
}

export default Chats;