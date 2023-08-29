import React from "react";
import { useState, useEffect, useRef} from "react";
import '../styles/chat.css'
import industryData from '../data/industryData';
import { useDispatch } from "react-redux";
import queryAction from "../redux/queryAction";
import { useSelector } from 'react-redux'
import { handleAns, handleQandA, handleDeleteQandA } from "../redux/CounterSlice";
import formatDate from "../utils/formatDate";
import LoadingAnimationSVG from "./LoadingAnimationSVG.js";




function Chat() {
    //variables
    const [isExpanded, setIsExpanded] = useState({}); // Plus button of left side
    const [inputValue, setInputValue] = useState('');
    const [userQuery, setUserQuery] = useState([]);
    const [isChatHistoryToggle, setIsChatHistoryToggle] = useState(false);
    const [updatedChatHistory, setUpdatedChatHistory] = useState({});
    const [isLeftSectionToggle, setIsLeftSectionToggle] = useState(true);
    const [editingIndices, setEditingIndices] = useState({});
    const [query, setQuery] = useState('');
    const [showEditDelete, setShowEditDelete] = useState(false);
    const editDeleteContainerRef = useRef(null);


    const dispatch = useDispatch();
    const queandans = useSelector((state) => state.counter.query);
    const [answer,setAnswer]=useState();

    useEffect(()=>setAnswer(queandans),[queandans]);


    const chatHistory = () => {
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0];
        console.log("Chat-history called");
        setUpdatedChatHistory((prevChatHistory) => {
            // Create a copy of the previous chat history
            const updatedHistory = { ...prevChatHistory };
            console.log("updatedHistory:", updatedHistory);
            // Check if the current date exists in the chat history
            if (updatedHistory[formattedDate]) {
                // If the date exists, add the new message to its array
                updatedHistory[formattedDate].push(inputValue);
                console.log("updatedHistory in if:", updatedHistory);
            } else {
                // If the date doesn't exist, create a new array with the new message
                updatedHistory[formattedDate] = [inputValue];
                console.log("updatedHistory in else:", updatedHistory);
            }
            return updatedHistory;
        });
    };



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



        try {

            const response = await fetch(`http://14.140.154.131:8000/Ron`, {

                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'cors',
                body: JSON.stringify({ 'query': query }),

            }).then(async (result) => {
                if (result.status === 200) {
                    const answer = await result.json();
                    console.log("answer", answer);

                    dispatch(handleQandA({ que: inputValue, ans: answer }))
                }

            }).catch(e => {
                console.log("Error:", e);

            })

        } catch (error) {

            console.error("Error fetching answer:", error);



        }


        setQuery(newQuery.text);

        dispatch(queryAction(newQuery.text));


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


    //toogle edit-delete component
    const toggleEditDelete = (date, index) => {
        console.log("toggledit called",showEditDelete);
        setShowEditDelete((prevVisibility) => ({
            ...prevVisibility,
            [`${date}-${index}`]: !prevVisibility[`${date}-${index}`],
        }));
        console.log("toggledit below called",showEditDelete);
    };


    const handleHamburgerClick = (event, date, index) => {
        console.log("handlehamburger called",showEditDelete);
        event.stopPropagation(); // Prevent the click from propagating to the document
        toggleEditDelete(date, index);
    };


    useEffect(() => {
        function handleClickOutside(event) {
            console.log("outside called",showEditDelete);
            if (editDeleteContainerRef.current && !editDeleteContainerRef.current.contains(event.target)) {
                // Click occurred outside the edit-delete-container, so hide it
                setShowEditDelete(false);
            }
        }
    
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);



    //Handle industry-data if it has nested items
    const handleExpandButton = (index) => {
        if (industryData[index])
            setIsExpanded((prevState) => ({
                ...prevState,
                [index]: !prevState[index]
            }));
    };



    // open-close chatHistory section of right side
    const handleToggleChatHistoryButton = () => {
        setIsChatHistoryToggle(!isChatHistoryToggle);
    }


    //for new conversation on cllick of new chat button 
    const handleNewChatButton = () => {
        setUserQuery([]);
        dispatch(handleAns())
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


    //handle-left-section-toggle-button
    const handleLeftSectionToggleButton = () => {
        if (window.innerWidth <= 768)
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



    //handle delete button
    const handleDelete = (date, index) => {
        const updateChatHistory = { ...updatedChatHistory };
        updateChatHistory[date].splice(index, 1);
        setUpdatedChatHistory(updateChatHistory);
        
        const updatedUserQuery = [...userQuery];
        const deletedQuery = updatedUserQuery.splice(index, 1)[0];
        setUserQuery(updatedUserQuery);
    
        const updatedQueAndAns = [...answer];
        updatedQueAndAns.splice(index, 1);
        
        setAnswer(updatedQueAndAns); 

        dispatch(handleDeleteQandA(deletedQuery));
    }


    //Update the editing index for a specific date
    const handleEdit = (date, index) => {
        setEditingIndices((prevEditingIndices) => ({
            ...prevEditingIndices,
            [date]: index,
        }));
    };




    return (
        <main className="Chats-UI">

            {/* chat-component-left-section  */}
            {!isLeftSectionToggle &&
                <section className="chat-component-left-section">
                    <div className="left-section-title-container">
                        <p className="left-section-title">Industries</p>
                        <img className="left-section-toggle-button toggle-button" src="./toggle-button-left-arrow.svg" alt="left-section-toogle-button" onClick={handleLeftSectionToggleButton} />
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
                                {/* <div className="horizontal-line"></div> */}
                            </div>
                        ))}
                    </div>
                </section>
            }

            {isLeftSectionToggle &&
                <section className="shrunked-chat-component-left-section">
                    <div className="shrunked-left-section-container">
                        <div>
                            <img className="toggle-button" src="./left-section-toggle-button.svg" alt="left-section-toggle-button" onClick={handleLeftSectionToggleButton} />
                            <div className="shrunked-horizontal-line"></div>
                        </div>
                        {
                            industryData.map((industry, index) => (
                                <div className="industry-icon-container" key={index}>
                                    <img src={industry.icon} alt="industry-icons" />
                                    <div className="shrunked-horizontal-line"></div>
                                </div>
                            )
                            )
                        }
                    </div>
                </section>
            }

            {/* chat-component-main-section */}
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
                            <img className="shrunked-new-chat-button" src="./plus-icon.svg" alt="new-chat-button" onClick={handleNewChatButton} />
                            <div className='vertical-line'></div>
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
                                            :<LoadingAnimationSVG/>
                                            
                                            // : <div className="loading-animation">
                                            //     <div className="line line1"></div>
                                            //     <div className="line line2"></div>
                                            //     <div className="line line3"></div>
                                            // </div>
                                        }

                                        </div>
                                        {/* <img className="clickable-icon" src="./copy-button.svg" alt="copy-button" onClick={() => handleCopy(answer[index]?.ans.response.output_text)} /> */}
                                    </div>
                                    
                                        <div className="conversation-bottom-button-container">
                                            <img className="conversation-section-icon" src="./speaker-icon.svg" alt="speaker-icon" />
                                            <img className="conversation-section-icon" src="./copy-button.svg" alt="copy-button" onClick={() => handleCopy(answer[index]?.ans.response.output_text)} />
                                            <img className="conversation-section-icon" src="./download-button.svg" alt="save-icon" onClick={()=>handleDownload(userMessage.que, answer[index]?.ans.response.output_text)} />
                                            <img className="conversation-section-icon" src="./like-icon.svg" alt="like-icon" />
                                            <img className="conversation-section-icon" src="./dislike-icon.svg" alt="dislike-icon" />
                                            {/* <img src="./share-button.svg" alt="share-button" className="clickable-icon" />*/}
                                        </div>
                                        {/* <div className="conversation-section-icon download-button-container" onClick={() => handleDownload(userMessage.que, answer[index]?.ans.response.output_text)} >
                                            <img className="download-button-img" src="./download-button.svg" alt="download-button" />
                                            <p className="download-button-text">Download</p>
                                        </div> */}
                                    
                                </div>
                            </div>
                        )).reverse()}


                    </div>
                </div>
            </section>


            {/* chat-component right section */}

            <section className={`chat-component-right-section ${isChatHistoryToggle ? 'shrink-right-section' : ''}`}>
                <div className="chat-history-top">
                    <div className="clickable-icon" id="new-chat-button" onClick={handleNewChatButton}>
                        <img src="./plus-icon.svg" alt="new-chat-icon" className="new-chat-icon" />
                        <p className="new-chat-text"> New Chat</p>
                    </div>
                    <p className="vertical-line history-vertical-line"> </p>
                    <img id="toggle-chat-history-button" className="toggle-button" src='./toggle-button-right-arrow.svg' alt="toggle-button" onClick={handleToggleChatHistoryButton} />
                </div>


                {/* chat-history-section  */}
                <div className="chat-history-data-section-container">
                    {Object.keys(updatedChatHistory).map((date) => (
                        <div className="chat-history-data-section" key={date}>
                            {updatedChatHistory[date].length > 0 && <p className="date">{formatDate(date)}</p>}

                            {updatedChatHistory[date].map((topic, index) => (

                                <div className="history-container" key={index}>
                                    {editingIndices[date] === index ? (
                                        <div className="edit-section">
                                            <input className="editable-text"
                                                type="text"
                                                value={topic}
                                                onChange={(e) => {
                                                    const updatedHistory = { ...updatedChatHistory };
                                                    updatedHistory[date][index] = e.target.value;
                                                    setUpdatedChatHistory(updatedHistory);
                                                }}
                                            />
                                            <button className="save-button"
                                                onClick={() => {
                                                    setEditingIndices((prevEditingIndices) => ({
                                                        ...prevEditingIndices,
                                                        [date]: null,
                                                    }));
                                                }}
                                            >
                                                <img src="./save-button.svg" alt="save-button"></img>
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <img
                                                id="chat-history-icon"
                                                src="./clock-icon.svg"
                                                alt="chat-history-icon"
                                            />
                                            <p className="history">{topic}</p>
                                            <img className="clickable-icon hamburger-icon" src="./hamburger-icon.svg" alt="hamburger-icon" onClick={(event) => handleHamburgerClick(event, date, index)} />

                                            {showEditDelete[`${date}-${index}`] &&
                                                <div ref={editDeleteContainerRef} className="edit-delete-container">
                                                    <div className="clickable-icon edit-container" onClick={() => handleEdit(date, index)}>
                                                        <img
                                                            className="clickable-icon edit-button"
                                                            src="./edit-button.svg"
                                                            alt="edit-button"

                                                        />
                                                        <p className="edit-delete-text">Edit Title</p>
                                                    </div>
                                                    <div className="clickable-icon delete-container" onClick={() => handleDelete(date, index)}>
                                                        <img
                                                            className="clickable-icon delete-button"
                                                            src="./delete-button.svg"
                                                            alt="delete-button"

                                                        />
                                                        <p className="edit-delete-text">Delete</p>
                                                    </div>

                                                </div>
                                            }


                                        </>

                                    )}
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