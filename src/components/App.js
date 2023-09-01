import '../styles/app.css';
import { useState } from 'react';
import { Header } from './Header';
import Chat from './Chat';

function App() {
  const [showAIChatbotComponent, setShowAIChatbotComponent] = useState(true);

  return (
    <div className="app">
      {/*Load Header */}
      <Header setShowAIChatbotComponent={setShowAIChatbotComponent} />

      {/* Load chat-component */}
      <div className="chat-component">
        {showAIChatbotComponent && <Chat />}
      </div>

    </div>

  );
}

export default App;
