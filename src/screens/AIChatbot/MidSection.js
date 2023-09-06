import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { LoadingAnimationSVG } from "../../assets/globalStyles";
import { aiChatbotMidSectionStyles } from './midSection.css'
import {  speakerIcon, voiceIcon } from "../../assets/icons";
import { QueryAPIHandler } from "../../services";
import { Feedback } from "../../components/Feedback";
import VoiceSearch  from "../../components/VoiceSearch/VoiceSearch";
import { copyIcon,likeIcon,dislikeIcon,downloadIcon } from "../../assets/icons";

function MidSection({ isLeftSectionToggle, userQuery, setUserQuery,
    chatHistory, isChatHistoryToggle, handleNewChatButton,
    handleToggleChatHistoryButton, inputValue, setInputValue,
    answer, setAnswer, dispatch }) {

    const [query, setQuery] = useState('');
    const [isdislikeClicked, setIsDislikeClicked] = useState(false);
    const [isKeyDown, setIsKeyDown]= useState(false);

   const voiceSearch=VoiceSearch(setInputValue,setIsKeyDown);
   const handleStartListening=voiceSearch.handleStartListening;
   const handleStopListening=voiceSearch.handleStopListening;
   
   
    const queandans = useSelector((state) => state.counter.query);

    useEffect(() => setAnswer(queandans), [queandans]);

    //Handle Search input box
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        setQuery(e.target.value);
    }

    //Handle user userQuery of chat conversation
    const handleSendQueryButton = async () => {
        if (inputValue.trim() === '') return;

        const newQuery = {
            que: inputValue,
            isUser: true,
        };


        setUserQuery([...userQuery, newQuery]);

        chatHistory();

        setInputValue('');

        QueryAPIHandler(query, inputValue, dispatch);

        setTimeout(() => {
            const conversationContainer = document.querySelector(".chats-conversation-container");
            conversationContainer.scrollBottom = conversationContainer.scrollHeight;
        }, 10);
    }


    //Handle when user press enter button while writing in  input box 
    const handleEnterPressed = (e) => {
        if (e.key === 'Enter')
            handleSendQueryButton();

    }


    //Handle copy button
    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
    }


    //Handle download button
    const handleDownload = (ques, ans) => {
        const content = `Query: ${ques}\nAnswer: ${ans}`;
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


    //Handle File Upload
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


    const handleDislikeClick = () => {
        setIsDislikeClicked(!isdislikeClicked);
    }




    return (
        <section className={`chat-component-main-section ${isChatHistoryToggle ? 'shrink-right-section' : ''} 
    ${isLeftSectionToggle ? 'shrink-left-section' : ''}
    ${isChatHistoryToggle && isLeftSectionToggle ? 'expanded-main-section' : ''}`}
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
                        <p className="search-box-vertical line vertical-line"></p>
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
                        <p className="search-box-vertical line vertical-line"></p>

                        <img id="voice-input-button" className={`clickable-icon ${isKeyDown?'voiceInputKeyDown':''}`} src={voiceIcon} alt="send-button" 
                        onClick={handleStartListening} title="Click to speak"/>

                    </div>

                    <div className="shrunked-right-section-button">
                        <img className="shrunked-new-chat-button" src="./plus-icon.svg" alt="new-chat-button" onClick={handleNewChatButton} />
                        <div className='history-vertical-line'></div>
                        <img className="toggle-button toggle-chat-history-button" src="./toggle-button-right-arrow.svg" alt="toggle-right-section-button" onClick={handleToggleChatHistoryButton} />
                    </div>
                </div>


                <div className="chats-conversation-container">

                    {/* dynamic data */}

                    {userQuery.map((userMessage, index) => (
                        <div className="chats-conversation" key={index}>
                            <div className="user">
                                <img src="./profile-icon.svg" alt="profile" className="user-icon" />
                                <p className="query">{userMessage.que}</p>
                                <img className="conversation-section-icon-top speaker-button" src="./speaker-icon.svg" alt="copy-button" onClick={() => handleCopy(userMessage.que)} />
                                <img className="conversation-section-icon-top copy-button" src="./copy-button.svg" alt="copy-button" onClick={() => handleCopy(userMessage.que)} />
                            </div>

                            <div>
                                <div className="bot">
                                    <img src="./brand-icon.svg" alt="bot-icon" />
                                    <div className="answer">{answer[index]?.ans.response.output_text !== undefined
                                        ? answer[index]?.ans.response.output_text
                                        : <LoadingAnimationSVG />

                                    }

                                    </div>

                                </div>

                                <div className="conversation-bottom-button-container">
                                    {/* <img className="conversation-section-icon" src={Speaker} alt="speaker-icon" /> */}
                                    <img className="conversation-section-icon" src={speakerIcon} alt="speaker-icon"/>
                                    
                                    <img className="conversation-section-icon" src={copyIcon} alt="copy-button" onClick={() => handleCopy(answer[index]?.ans.response.output_text)} />
                                    <img className="conversation-section-icon" src={downloadIcon} alt="download"  onClick={() => handleDownload(userMessage.que, answer[index]?.ans.response.output_text)}/>
                                    <img className="conversation-section-icon" src={likeIcon} alt="like" />
                                    <img className="conversation-section-icon" src={dislikeIcon} alt="dislike" onClick={handleDislikeClick} />
                                </div>
                             {
                                isdislikeClicked && <Feedback handleDislikeClick={handleDislikeClick}/>
                             }

                            </div>
                        </div>
                    )).reverse()}


                </div>
            </div>
        </section>

    )

}
export default MidSection;