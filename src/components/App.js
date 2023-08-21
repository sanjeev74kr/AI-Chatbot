import '../css/App.css';
import Chats from './Chats';
import ProfileButtonOptions from './ProfileButtonOptions';
import { useState } from 'react';

function App() {
  const [showChatComponent, setShowChatComponent] = useState(true);
  const [isProfileOptionsVisible, setIsProfileOptionsVisible] = useState(false);


  const handleChatComponentButtonClick = () => {
    setShowChatComponent(true);
  }

  const toggleProfileOptions = () => {
    setIsProfileOptionsVisible(!isProfileOptionsVisible);
  }


  return (
    // main app entry 
    <div className="app">

      {/* heading part */}
      <div className='header-container'>
        <div className='brand-identity-container'>
          <p className='brand-text'>R</p>
          <img className='brand-icon' src='./brand-icon.svg' alt='brand-icon' />
          <p className='brand-text'>N!</p>
        </div>
        <div className='header-button-container'>
          <button className='selected' onClick={handleChatComponentButtonClick} >AI Chatbot</button>
          <button className='dashboard-component-button'>Dashboard</button>
        </div>
        <div className='profile-button-container'>
          <img className="profile-button" src="./profile-icon.svg" alt="profile-icon" onClick={toggleProfileOptions} />
        </div>
      </div>


      {/*load profile options component*/}
      <div className="profile-component">
        {isProfileOptionsVisible && <ProfileButtonOptions />}
      </div>


      {/* load chat-component */}
      <div className="chat-component">
        {showChatComponent && <Chats />}
      </div>

    </div>

  );
}

export default App;
