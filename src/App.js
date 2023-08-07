import './css/App.css';
import chats from './components/Chats'
import { useState } from 'react';

function App() {
  const[showChats,setShowChats]=useState(false);

 const handleChatClick=()=>{
    setShowChats(true);
  }

  return (
    <div className="App">
      {showChats && <chats />}
      <div className='Heading-part'>
        <span className='brain-wave-icon'>
          <img src='./brain.svg' alt='brain-wave-icon' />
        </span>
        <span className='brainwave-text'>
          <h1>Brainwave</h1>
        </span>
      </div>
      <div className='Main-page-side-section'>
        <div className='Menu'>
          <div className='Menu-item' id="Menu-chats" onClick={handleChatClick}>
            <span className="icon"><img src='./chat.svg' alt='brain-wave-icon' /></span>
            <span className="text">Chats</span>
          </div>
          <div className='Menu-item' id="Menu-search">
            <span className="icon"><img src='./search.svg' alt='brain-wave-icon' /></span>
            <span className="text">Search</span>
          </div>
          <div   className='Menu-item' id="Menu-subscription">
            <span className="icon"><img src='./subscription.svg' alt='brain-wave-icon' /></span>
            <span className="text">Manage Subscription</span>
          </div>
          <div className='Menu-item' id="Menu-update">
            <span className="icon"><img src='./faq.svg' alt='brain-wave-icon' /></span>
            <span className="text">Update & FAQ</span>
          </div>
          <div className='Menu-item' id="Menu-setting">
            <span className="icon"><img src='./settings.svg' alt='brain-wave-icon' /></span>
            <span className="text">Settings</span>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default App;
