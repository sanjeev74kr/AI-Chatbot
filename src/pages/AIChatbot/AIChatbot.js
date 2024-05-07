import React from "react";
import { useState } from "react";
import { Industries } from "../../components/Industries";
import { Chat } from "../../components/Chat";
import { ChatHistory } from "../../components/ChatHistory";
import "./aiChatbot.css";
import { useDispatch } from "react-redux";
import { handleAns } from "../../services/CounterSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AIChatbot() {
  //variables
  const [isIndustriesToggle, setIsIndustriesToggle] = useState(true);
  const [userQuery, setUserQuery] = useState([]);
  const [isChatHistoryToggle, setIsChatHistoryToggle] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [updatedChatHistory, setUpdatedChatHistory] = useState({});
  const [answer, setAnswer] = useState();

  const dispatch = useDispatch();

  // open-close chatHistory section of right side
  const handleToggleChatHistoryButton = () => {
    setIsChatHistoryToggle(!isChatHistoryToggle);
  };

  //for new conversation on cllick of new chat button
  const handleNewChatButton = () => {
    setUserQuery([]);
    dispatch(handleAns());
  };

  const chatHistory = () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split("T")[0];
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

  const notify = (toastmsg) => {
    return toast(toastmsg, {
      position: "bottom-center",
    });
  };

  return (
    <main className="Chats-UI">
      <Industries
        isIndustriesToggle={isIndustriesToggle}
        setIsIndustriesToggle={setIsIndustriesToggle}
      />

      <Chat
        isIndustriesToggle={isIndustriesToggle}
        userQuery={userQuery}
        setUserQuery={setUserQuery}
        chatHistory={chatHistory}
        isChatHistoryToggle={isChatHistoryToggle}
        handleNewChatButton={handleNewChatButton}
        handleToggleChatHistoryButton={handleToggleChatHistoryButton}
        inputValue={inputValue}
        setInputValue={setInputValue}
        answer={answer}
        setAnswer={setAnswer}
        dispatch={dispatch}
        notify={notify}
      />

      <ChatHistory
        isChatHistoryToggle={isChatHistoryToggle}
        handleNewChatButton={handleNewChatButton}
        handleToggleChatHistoryButton={handleToggleChatHistoryButton}
        updatedChatHistory={updatedChatHistory}
        setUpdatedChatHistory={setUpdatedChatHistory}
        userQuery={userQuery}
        setUserQuery={setUserQuery}
        answer={answer}
        setAnswer={setAnswer}
        dispatch={dispatch}
      />
      <ToastContainer />
    </main>
  );
}

export default AIChatbot;
