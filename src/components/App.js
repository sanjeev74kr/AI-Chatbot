import '../css/App.css';
import '../themes/lightTheme';
import Chats from './Chats'
import { useEffect, useState } from 'react';
import sampleData from '../utils/sampleData'

function App() {
  const [showChats, setShowChats] = useState(true);
  const [data,setData]=useState(sampleData);


  const handleChatClick = () => {
    setShowChats(true);
  }
  
  useEffect(()=>{
    handleSampleData();
  },[]);

  const handleSampleData=async()=>{
     setData(sampleData);
  }

  return (
    <div className="app">
      <div className='heading-part'>
      <header>
        <span className='brand-identity'>
          <img className='brand-icon' src='./brain.svg' alt='DI-icon'/>
          <p className='brand-text'> RON </p>
        </span>
        <div className='heading-button'>
        <button className='dashboard-component-button'>Dashboard</button>
        <button className='chat-component-button'>Chat</button>
        </div>
        <img className="profile-button" src="./profile.svg" alt="profile-icon" /> 
        </header>
      </div>
     
      <div className='Main-page-side-section'>
        <div className='Menu'>
          <div className={`Menu-item ${showChats ? 'selected' : ''}`} id="Menu-chats" onClick={handleChatClick}>
            <span className="icon"><img src='./search.svg' alt='brain-wave-icon' /></span>
            <span className="text">search here..</span>
          </div>


      {/* sample data section  */}
       <div className='Sample-data-loading-section'>
          {data.map((curr,index) => (
          <div className='Sample-data'>
          <p key={index}>{index+1}.</p>
          <p>{curr}</p>
          </div>

          ))}
       </div>
       

          {/* <div className={`Menu-item ${showSearch ? 'selected' : ''}`} id="Menu-search">
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
          </div> */}
        </div>
        {/* <div className='Horizontal-line'></div> */}
        
      </div>

      <div className="Chat-component">
        {showChats && <Chats />}
      </div>
    </div>
  );
}

export default App;
