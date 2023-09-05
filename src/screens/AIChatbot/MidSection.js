import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { LoadingAnimationSVG } from "../../assets/globalStyles";
import { aiChatbotMidSectionStyles } from './midSection.css'
import { QueryAPIHandler } from "../../services";
import { voiceIcon } from "../../assets/icons";


function MidSection({ isLeftSectionToggle, userQuery, setUserQuery,
    chatHistory, isChatHistoryToggle, handleNewChatButton,
    handleToggleChatHistoryButton, inputValue, setInputValue,
    answer, setAnswer, dispatch }) {

    const [query, setQuery] = useState('');
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
                        
                        <img id="voice-input-button" className="clickable-icon" src={voiceIcon} alt="send-button" onClick={handleSendQueryButton} />
                        
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
                                <img className="conversation-section-icon speaker-button" src="./speaker-icon.svg" alt="copy-button" onClick={() => handleCopy(userMessage.que)} />
                                <img className="conversation-section-icon copy-button" src="./copy-button.svg" alt="copy-button" onClick={() => handleCopy(userMessage.que)} />
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
                                    <img className="conversation-section-icon" src="./speaker-icon.svg" alt="speaker-icon" />
                                    <img className="conversation-section-icon" src="./copy-button.svg" alt="copy-button" onClick={() => handleCopy(answer[index]?.ans.response.output_text)} />
                                    <img className="conversation-section-icon" src="./download-button.svg" alt="save-icon" onClick={() => handleDownload(userMessage.que, answer[index]?.ans.response.output_text)} />
                                    <img className="conversation-section-icon" src="./like-icon.svg" alt="like-icon" />
                                    <img className="conversation-section-icon" src="./dislike-icon.svg" alt="dislike-icon" />

                                </div>


                            </div>
                        </div>
                    )).reverse()}


                </div>
            </div>
        </section>

    )

}
export default MidSection;