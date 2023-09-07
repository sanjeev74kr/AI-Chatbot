import React, { useState } from 'react';
import { ProfileButtonOptions } from '../ProfileButtonOptions';
import {brandLogo} from '../../assets/icons'

function Header({ setShowAIChatbotComponent }) {

    const [isProfileOptionsVisible, setIsProfileOptionsVisible] = useState(false);
    const [isAIChatbotClicked, setIsAIChatbotClicked] = useState(true);
    const [isDashboardClicked, setISDashboardClicked] = useState(false);

    //Handle AI Chatbot button click
    const handleAIChatbotComponentButtonClick = () => {
        setIsAIChatbotClicked(true);
        setShowAIChatbotComponent(true);
        setISDashboardClicked(false);
    }

    //Handle Dashboard click
    const handleDashboardClick = () => {
        setISDashboardClicked(true);
        setIsAIChatbotClicked(false);
        setShowAIChatbotComponent(false);
    }

    //Handle profile options button click
    const toggleProfileOptions = () => {
        setIsProfileOptionsVisible(!isProfileOptionsVisible);
    }

    return (
        <div className='header-container'>
            <div className='brand-identity-container'>
                <p className='brand-text'>R</p>
                <img className='brand-logo' src={brandLogo} alt='brand-icon' />
                <p className='brand-text'>N!</p>
            </div>
            <div className='header-button-container'>
                <button className={`ai-chatbot-component-button ${isAIChatbotClicked ? 'selected' : ''}`} onClick={handleAIChatbotComponentButtonClick} >AI Chatbot</button>
                <button className={`dashboard-component-button ${isDashboardClicked ? 'selected' : ''}`} onClick={handleDashboardClick}>Dashboard</button>
            </div>
            <div className='profile-button-container'>
                <img className="profile-button" src="./profile-icon.svg" alt="profile-icon" onClick={toggleProfileOptions} />
            </div>

            {/*Load profile options component*/}
            <div className="profile-component">
                {isProfileOptionsVisible && <ProfileButtonOptions />}
            </div>
        </div>
    )
}

export default Header;