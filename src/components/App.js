import '../css/App.css';
import Chats from './Chats';
import ProfileButtonAction from './ProfileButtonAction';
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
      <div className='heading-part'>
          <div className='brand-identity'>
            <img className='brand-icon' src='./brand-icon.svg' alt='DI-icon' />
            <p className='brand-text'> RON! </p>
          </div>
          <div className='heading-buttons'>
            <button className='dashboard-component-button'>Dashboard</button>
            <button className='selected' onClick={handleChatComponentButtonClick} >AI Chatbot</button>
          </div>
          <div className='profile-button-container'>
          <img className="profile-button" src="./profile.svg" alt="profile-icon"  onClick={toggleProfileOptions} />
          </div>
      </div>


      {/*load profile options component*/}
      <div className="profile-component">
        {isProfileOptionsVisible && <ProfileButtonAction />}
      </div>

      {/* load chat-component */}
      <div className="Chat-component">
        {showChatComponent && <Chats />}
      </div>

    </div>

  );
}

export default App;
