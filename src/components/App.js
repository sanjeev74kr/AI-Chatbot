import '../css/App.css';
import Chats from './Chats'
import { useEffect, useState } from 'react';
import sampleData from '../utils/sampleData'

function App() {
  const [showChats, setShowChats] = useState(true);
  const [data,setData]=useState(sampleData);
  // const [showSearch, setShowSearch] = useState(false);
  // const [showSubscription, setShowSubscription] = useState(false);
  // const [showFaq, setShowFaq] = useState(false);
  // const [showSettings, setShowSettings] = useState(false);

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
    <div className="App">
      <div className='Heading-part'>
        <span className='DI-icon'>
          <img src='./brain.svg' alt='DI-icon' />
        </span>
        <span className='DI-text'>
          <h1> RON </h1>
        </span>
      </div>
      {/* <div className='Vertical-line'></div> */}
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
