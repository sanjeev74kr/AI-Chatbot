import '../css/App.css';
import Chats from './Chats'
import { useEffect, useState } from 'react';
import sampleData from '../utils/sampleData'

function App() {
  const [showChats, setShowChats] = useState(true);
  const [data, setData] = useState(sampleData);


  const handleChatClick = () => {
    setShowChats(true);
  }

  useEffect(() => {
    handleSampleData();
  }, []);

  const handleSampleData = async () => {
    setData(sampleData);
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
            <button className='chat-component-button'>AI Chatbot</button>
          </div>
          <img className="profile-button" src="./profile.svg" alt="profile-icon" />
        </header>
      </div>


        {/* sample data section  */}
        <div className='Sample-data-loading-section'>
          {data.map((curr, index) => (
            <div className='Sample-data'>
              <img className="page-icon" src="./page.svg" alt="page-icon"/>
              <p className='data'>{curr}</p>
              <img className="expand-button" src="./add-circle-button.svg" alt="expand-button"/>
            </div>
          ))}
          
        </div>


      <div className="Chat-component">
        {showChats && <Chats />}
      </div>
    </div>
  );
}

export default App;
