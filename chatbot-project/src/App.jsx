import { useState } from 'react';
import { ChatInput } from './components/ChatInput';
import ChatMessages from './components/ChatMessages';
import { useEffect } from 'react';
import { Chatbot } from 'supersimpledev';
import './App.css';


function App() {
  const [chatMessages, setChatMessages] = useState(JSON.parse(localStorage.getItem('messages')) || [{
    message: 'hello chatbot',
    sender: 'user',
    id: 'id1'
  }]);
  
  useEffect(() => {
    Chatbot.addResponses({
      'goodbye': 'Goodbye, have a great day!',
      'give me a unique id': function() {
        return `Sure! Here's a unique ID: ${crypto.randomUUID()}`;
       }
    })

    localStorage.setItem('messages', JSON.stringify(chatMessages));
  }, [chatMessages])


  return (
    <div className="app-container">
      {chatMessages.length === 0 &&
        <p className="welcome-message">
          Welcome to my chat-bot project! Send a message by the textbox below!
        </p>
      }

      <ChatMessages chatMessages={chatMessages} />

      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
    </div>
  );
}

export default App
