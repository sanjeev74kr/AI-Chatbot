import '../css/App.css';
import Chats from './Chats';
import ProfileButtonAction from './ProfileButtonAction';
import { useState } from 'react';


function App() {
  const [showChats, setShowChats] = useState(true);
  const [isProfileOptionsVisible, setIsProfileOptionsVisible] = useState(false);

  const handleChatClick = () => {
    setShowChats(true);
  }

  const toggleProfileOptions = () => {
    setIsProfileOptionsVisible(!isProfileOptionsVisible);
  }

  return (
    // main app entry 
    <div className="app">

      {/* heading part */}
      <div className='heading-part'>
        <header>
          <span className='brand-identity'>
            <img className='brand-icon' src='./brand-icon.svg' alt='DI-icon' />
            <p className='brand-text'> RON </p>
          </span>
          <div className='heading-button'>
            <button className='dashboard-component-button'>Dashboard</button>
            <button className='selected' onClick={handleChatClick} >AI Chatbot</button>
          </div>
          <img className="profile-button" src="./profile.svg" alt="profile-icon" onClick={toggleProfileOptions} />
        </header>
      </div>

      {/*load profile option component*/}
      <div className="profile-component">
      {isProfileOptionsVisible && <ProfileButtonAction />}
      </div>

      {/* load chat-component */}
      <div className="Chat-component">
        {showChats && <Chats />}
      </div>

      
    </div>

  );
}

export default App;
