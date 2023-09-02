import formatDate from "../../utils/formatDate";
import { useState, useEffect, useRef } from "react";
import { aiChatbotRightSectionStyles } from './rightSection.css'
import { handleDeleteQandA } from "../../services/CounterSlice";


function RightSection({ isChatHistoryToggle, handleNewChatButton, handleToggleChatHistoryButton,
    updatedChatHistory, setUpdatedChatHistory, userQuery, setUserQuery, answer, setAnswer, dispatch }) {

    const [editingIndices, setEditingIndices] = useState({});
    const [showEditDelete, setShowEditDelete] = useState({});
    const editDeleteContainerRef = useRef(null);


    //toogle edit-delete component
    const toggleEditDelete = (date, index) => {
        setShowEditDelete((prevVisibility) => ({
            ...prevVisibility,
            [`${date}-${index}`]: !prevVisibility[`${date}-${index}`],
        }));
    };


    const handleHamburgerClick = (event, date, index) => {
        console.log("handlehamburger called", showEditDelete);
        event.stopPropagation();
        toggleEditDelete(date, index);
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (editDeleteContainerRef.current && !editDeleteContainerRef.current.contains(event.target)) {
                // Click occurred outside the edit-delete-container, so hide it
                setShowEditDelete({});
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);




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


    )
}
export default RightSection;