import React, { useState } from "react";
import { ProfileButtonOptions } from "../ProfileButtonOptions";
import { brandLogo } from "../../assets/icons";
import { profileIcon } from "../../assets/icons";

function Header({ setShowAIChatbotComponent }) {
  const [isProfileOptionsVisible, setIsProfileOptionsVisible] = useState(false);
  const [isAIChatbotClicked, setIsAIChatbotClicked] = useState(true);

  //Handle AI Chatbot button click
  const handleAIChatbotComponentButtonClick = () => {
    setIsAIChatbotClicked(true);
    setShowAIChatbotComponent(true);
  };

  //Handle profile options button click
  const toggleProfileOptions = () => {
    setIsProfileOptionsVisible(!isProfileOptionsVisible);
  };

  return (
    <div className="header-container">
      <div className="brand-identity-container">
        <p className="brand-text">R</p>
        <img className="brand-logo" src={brandLogo} alt="brand-icon" />
        <p className="brand-text">N!</p>
      </div>
      <div className="header-button-container">
        <p
          className={`ai-chatbot-component-button ${
            isAIChatbotClicked ? "selected" : ""
          }`}
          onClick={handleAIChatbotComponentButtonClick}
        >
          AI Chatbot
        </p>
      </div>
      <div className="profile-button-container">
        <img
          className="profile-button"
          src={profileIcon}
          alt="profile-icon"
          onClick={toggleProfileOptions}
        />
        <div className="profile-component">
        {isProfileOptionsVisible && <ProfileButtonOptions />}
      </div>
      </div>

      {/*Load profile options component*/}
      
    </div>
  );
}

export default Header;
