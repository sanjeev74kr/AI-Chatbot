import './css/App.css';
import Chats from './components/Chats'
import { useState } from 'react';

function App() {
  const [showChats, setShowChats] = useState(true);
  const [showSearch, setShowSearch] = useState(false);
  const [showSubscription, setShowSubscription] = useState(false);
  const [showFaq, setShowFaq] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const handleChatClick = () => {
    setShowChats(true);
  }

  return (
    <div className="App">
      <div className='Heading-part'>
        <span className='DI-icon'>
          <img src='./brain.svg' alt='DI-icon' />
        </span>
        <span className='DI-text'>
          <h1> D I</h1>
        </span>
      </div>
    //  <div className='Vertical-line'></div>
      <div className='Main-page-side-section'>
        <div className='Menu'>
          <div className={`Menu-item ${showChats ? 'selected' : ''}`} id="Menu-chats" onClick={handleChatClick}>
            <span className="icon"><img src='./chat.svg' alt='brain-wave-icon' /></span>
            <span className="text">Chats</span>
          </div>
          <div className={`Menu-item ${showSearch ? 'selected' : ''}`} id="Menu-search">
            <span className="icon"><img src='./search.svg' alt='brain-wave-icon' /></span>
            <span className="text">Search</span>
          </div>
          <div className={`Menu-item ${showSubscription ? 'selected' : ''}`} id="Menu-subscription">
            <span className="icon"><img src='./subscription.svg' alt='brain-wave-icon' /></span>
            <span className="text">Manage Subscription</span>
          </div>
          <div className={`Menu-item ${showFaq ? 'selected' : ''}`} id="Menu-update">
            <span className="icon"><img src='./faq.svg' alt='brain-wave-icon' /></span>
            <span className="text">Update & FAQ</span>
          </div>
          <div className={`Menu-item ${showSettings ? 'selected' : ''}`} id="Menu-setting">
            <span className="icon"><img src='./settings.svg' alt='brain-wave-icon' /></span>
            <span className="text">Settings</span>
          </div>
        </div>
      //<div className='Horizontal-line'></div>
      </div>

      <div className="Chat-component">
    {showChats && <Chats />}
  </div>
    

    </div>
  );
}

export default App;
