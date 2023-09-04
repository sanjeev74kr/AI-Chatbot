import React from "react";
import { useState } from "react";
import AIChatbotLeftSection from './LeftSection'
import AIChatbotMidSection from './MidSection';
import AIChatbotRightSection from './RightSection';
import { aiChatbotStyles } from './aiChatbot.css'
import { useDispatch } from "react-redux";
import { handleAns } from "../../services/CounterSlice";


function AIChatbot() {
    //variables
    const [isLeftSectionToggle, setIsLeftSectionToggle] = useState(true);
    const [userQuery, setUserQuery] = useState([]);
    const [isChatHistoryToggle, setIsChatHistoryToggle] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [updatedChatHistory, setUpdatedChatHistory] = useState({});
    const [answer, setAnswer] = useState();

    const dispatch = useDispatch();

    // open-close chatHistory section of right side
    const handleToggleChatHistoryButton = () => {
        setIsChatHistoryToggle(!isChatHistoryToggle);
    }


    //for new conversation on cllick of new chat button 
    const handleNewChatButton = () => {
        setUserQuery([]);
        dispatch(handleAns())
    }

    const chatHistory = () => {
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0];
        setUpdatedChatHistory((prevChatHistory) => {
            // Create a copy of the previous chat history
            const updatedHistory = { ...prevChatHistory };
            // Check if the current date exists in the chat history
            if (updatedHistory[formattedDate]) {
                // If the date exists, add the new message to its array
                updatedHistory[formattedDate].push(inputValue);
            } else {
                // If the date doesn't exist, create a new array with the new message
                updatedHistory[formattedDate] = [inputValue];
            }
            return updatedHistory;
        });
    };

    return (
        <main className="Chats-UI">
            <AIChatbotLeftSection isLeftSectionToggle={isLeftSectionToggle} setIsLeftSectionToggle={setIsLeftSectionToggle} />

            <AIChatbotMidSection isLeftSectionToggle={isLeftSectionToggle} userQuery={userQuery} setUserQuery={setUserQuery}
                chatHistory={chatHistory} isChatHistoryToggle={isChatHistoryToggle} handleNewChatButton={handleNewChatButton}
                handleToggleChatHistoryButton={handleToggleChatHistoryButton} inputValue={inputValue} setInputValue={setInputValue}
                answer={answer} setAnswer={setAnswer} dispatch={dispatch} />

            <AIChatbotRightSection isChatHistoryToggle={isChatHistoryToggle} handleNewChatButton={handleNewChatButton}
                handleToggleChatHistoryButton={handleToggleChatHistoryButton} updatedChatHistory={updatedChatHistory}
                setUpdatedChatHistory={setUpdatedChatHistory} userQuery={userQuery} setUserQuery={setUserQuery}
                answer={answer} setAnswer={setAnswer} dispatch={dispatch} />
        </main >
    )
}

export default AIChatbot;