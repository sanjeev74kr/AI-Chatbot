import './App.css';
import { useState } from 'react';
import { Header } from './components/Header';
import AIChatbot from './screens/AIChatbot/AIChatbot';

function App() {
  const [showAIChatbotComponent, setShowAIChatbotComponent] = useState(true);

  return (
    <div className="app">
      {/*Load Header */}
      <Header setShowAIChatbotComponent={setShowAIChatbotComponent} />

      {/* Load chat-component */}
      <div className="chat-component">
        {showAIChatbotComponent && <AIChatbot />}
      </div>

    </div>

  );
}

export default App;
