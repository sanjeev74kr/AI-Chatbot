import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { LoadingAnimationSVG } from "../../assets/globalStyles";
import { aiChatbotMidSectionStyles } from './midSection.css'
import { brandLogo, emailIcon, likedIcon, speakerIcon, voiceIcon } from "../../assets/icons";
import { QueryAPIHandler } from "../../services";
import { Feedback } from "../../components/Feedback";
import VoiceSearch from "../../components/VoiceSearch/VoiceSearch";
import { copyIcon, likeIcon, dislikeIcon, dislikeRedIcon, downloadIcon, externalLinkIcon, chevronRightIcon } from "../../assets/icons";
import EmailShare from "../../components/Email/EmailShare";
import { healthcareInfo } from "../../sampleData/industryData";
import LoadingDots from "../../components/LoadingDots/LoadingDots";

function MidSection({ isLeftSectionToggle, userQuery, setUserQuery,
    chatHistory, isChatHistoryToggle, handleNewChatButton,
    handleToggleChatHistoryButton, inputValue, setInputValue,
    answer, setAnswer, dispatch, notify }) {

    const [query, setQuery] = useState('');
    const [isdislikeClicked, setIsDislikeClicked] = useState(false);
    const [isKeyDown, setIsKeyDown] = useState(false);
    const [isLiked, setIsLiked] = useState(Array(answer?.length).fill(false));
    const [isdislikeIconClicked, setIsDislikeIconClicked] = useState(Array(answer?.length).fill(false));
    const [isEmailClicked, setIsEmailClicked] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0); // useState for handling slider of healthcare
    const carouselInnerRef = useRef(null);
    const [timer,setTimer] = useState(true)

    const voiceSearch = VoiceSearch(inputValue,setInputValue, setIsKeyDown);
    const handleStartListening = voiceSearch.handleStartListening;
    const handleStopListening = voiceSearch.handleStopListening;

    const handleSpeak = (screenText) => {

        if ('speechSynthesis' in window) {
            const synth = window.speechSynthesis;

            const utterance = new SpeechSynthesisUtterance(screenText);

            // Optional settings for the speech
            utterance.lang = 'en-US'; // Language (e.g., US English)
            utterance.volume = 1; // Volume (0 to 1)
            utterance.rate = 1; // Rate of speech (0.1 to 10)
            utterance.pitch = 1; // Pitch (0 to 2)

            // Speak the text
            synth.speak(utterance);
        }
    }

    

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

    //function for showing feedback component
    const handleDislikeClick = () => {
        setIsDislikeClicked(!isdislikeClicked);
    }

    //function for changing dislike icon color
    const handleDislikeIconClicked = (index) => {
        const updatedIsDislikeIconClicked = [...isdislikeIconClicked];
        updatedIsDislikeIconClicked[index] = !updatedIsDislikeIconClicked[index];
        setIsDislikeIconClicked(updatedIsDislikeIconClicked);

        //if dislike clicked then disable like if already liked
        const updatedIsLiked = [...isLiked]
        if (updatedIsLiked[index] === true) {
            updatedIsLiked[index] = false;
            setIsLiked(updatedIsLiked);
        }
    }

    //Function for calling both feedback-loading function and icon color change function
    const handleDislikeButtonClick = (index) => {
        const updatedIsDislikeIconClicked = [...isdislikeIconClicked];
        //if not disliked earlier then open feedback component
        if (updatedIsDislikeIconClicked[index] === false)
            handleDislikeClick();

        handleDislikeIconClicked(index);
    }

    //Function for changing like icon color
    const handleLikeClick = (index) => {
        const updatedIsLiked = [...isLiked];
        updatedIsLiked[index] = !updatedIsLiked[index];
        setIsLiked(updatedIsLiked);

        //if like clicked then disable dislike if already disliked
        const updatedIsDislikeIconClicked = [...isdislikeIconClicked];
        if (updatedIsDislikeIconClicked[index] === true) {
            updatedIsDislikeIconClicked[index] = false;
            setIsDislikeIconClicked(updatedIsDislikeIconClicked);
        }
    }


    const handleEmailClick = (index) => {
        const updatedEmailClick = [...isEmailClicked];
        updatedEmailClick[index] = true;
        setIsEmailClicked(updatedEmailClick);
    }

    const handleScroll = (direction) => {
        const slideWidth = carouselInnerRef.current.offsetWidth / 3; // Width of one visible slide
        const maxIndex = Math.max(0, healthcareInfo.length - 3); // Maximum index to prevent scrolling too far
    
        // if (currentIndex < maxIndex) {
        if (direction === 'left' && currentIndex > 0) {
          setCurrentIndex(currentIndex - 1);
        }else if(direction === 'right' && currentIndex < maxIndex){
            setCurrentIndex(currentIndex + 1)
        }
      };

      //useEffet for loading SVG after 30 seconds...
    //   useEffect(()=>{
    //     setTimeout(()=>{setTimer(false)},30000)
    //   },[])

    console.log("userQuery---->", userQuery)

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
                       {isKeyDown && <LoadingDots />}
                  

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

                        <img id="voice-input-button" className={`clickable-icon ${isKeyDown ? 'voiceInputKeyDown' : ''}`} src={voiceIcon} alt="send-button"
                            onClick={handleStartListening} title="Click to speak" />

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
                                <img className="conversation-section-icon-top speaker-button" src="./speaker-icon.svg" alt="copy-button" onClick={() => handleSpeak(userMessage.que)} />
                                <img className="conversation-section-icon-top copy-button" src="./copy-button.svg" alt="copy-button" onClick={() => handleCopy(userMessage.que)} />
                            </div>

                            <div>
                                <div className="bot">
                                    <img src={brandLogo} alt="bot-icon" />
                                    <div className="answer">{timer ? answer[index]?.ans.response.output_text !== undefined
                                        ? answer[index]?.ans.response.output_text
                                        : <LoadingAnimationSVG /> : <p>something went wrong</p>


                                    }
                                    </div>

                                </div>
                                {/* Slider starts here */}
                                <div className="transforming-healthcare">
                                    {currentIndex > 0 && <img className="healthcare-carosel-left-arrow" src={chevronRightIcon} alt="chevron-right" onClick={()=>handleScroll("left")}/>}
                                    <div className="carousel">
                                        <div className="carousel-inner" style={{ transform: `translateX(-${currentIndex * 33.33}%)` }} ref={carouselInnerRef}>
                                            {answer[index]?.ans.source_info.map((hData, index)=>(
                                                <div className="carousel-item" key={index}>
                                                    <div className="transforming-healthcare-container">
                                                        <p className="healthcare-text">{hData.substring(1, 35)}...</p>
                                                        <img className="healthcare-externalink" src={externalLinkIcon} alt="external-link" />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <img className="healthcare-carosel-right-arrow" src={chevronRightIcon} alt="chevron-right" onClick={()=>handleScroll("right")}/>
                                </div>

                                {/* Slider Ends here */}

                                <div className="conversation-bottom-button-container">
                                    {/* <img className="conversation-section-icon" src={Speaker} alt="speaker-icon" /> */}
                                    <img className="conversation-section-icon" src={speakerIcon} alt="speaker-icon" onClick={() => handleSpeak(answer[index]?.ans.response.output_text)} />

                                    <img className="conversation-section-icon" src={copyIcon} alt="copy-button"
                                        onClick={() => handleCopy(answer[index]?.ans.response.output_text)} />

                                    <img className="conversation-section-icon" src={downloadIcon} alt="download"
                                        onClick={() => handleDownload(userMessage.que, answer[index]?.ans.response.output_text)} />

                                    <img className="conversation-section-icon" src={emailIcon} alt="email" onClick={() => handleEmailClick(index)} />
                                    {isEmailClicked[index] && <EmailShare userQuery={userMessage.que} answer={answer[index]?.ans.response.output_text} />}

                                    <img className="conversation-section-icon" src={isLiked[index] ? likedIcon : likeIcon} alt="like"
                                        onClick={() => handleLikeClick(index)} />

                                    <img className="conversation-section-icon" src={isdislikeIconClicked[index] ? dislikeRedIcon : dislikeIcon} alt="dislike"
                                        onClick={() => handleDislikeButtonClick(index)} />

                                </div>
                                {
                                    isdislikeClicked && <Feedback handleDislikeClick={handleDislikeClick} notify={notify} handleDislikeIconClicked={()=>handleDislikeIconClicked(index)}/>
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