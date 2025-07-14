import { useState } from "react";
import { Chatbot } from 'supersimpledev';
import LoadingSpinner from '../assets/loading-spinner.gif';

export function ChatInput({ chatMessages, setChatMessages }) {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  function handleKeydown(event) {
    if (event.key === 'Enter') {
      sendMessage();
    }

    if (event.key === "Escape") {
      setInputText('');
    }
  }

  function clearMessages () {
    setChatMessages([]);
    localStorage.setItem('messages', JSON.stringify(chatMessages));
  }

  async function sendMessage() {
    if (isLoading || inputText === '') {
      return;
    }

    setIsLoading(true);

    setInputText('');

    //sending user message
    const newChatMessages = [
      ...chatMessages,
      {
        message: inputText,
        sender: 'user',
        id: crypto.randomUUID()
      }
    ];

    setChatMessages(newChatMessages);

    //imitate loading
    setChatMessages([
      ...newChatMessages,
      {
        message: <img src={LoadingSpinner} className="loading-spinner" />,
        sender: 'robot',
        id: crypto.randomUUID()
      }
    ]);

    const response = await Chatbot.getResponseAsync(inputText);

    //displaying bot message
    setChatMessages([
      ...newChatMessages,
      {
        message: response,
        sender: 'robot',
        id: crypto.randomUUID()
      }
    ])

    setIsLoading(false);
  }

  return (
    <div className="chat-input-container">
      <input
        placeholder="Send a message to Chatbot"
        size="30"
        onChange={saveInputText}
        onKeyDown={handleKeydown}
        value={inputText}
        className="chat-input"
      />

      <button
        onClick={sendMessage}
        className="send-button"
      >Send</button>

      <button 
        className="send-button"
        onClick={clearMessages}
      >  
      Clear</button>
    </div>
  )
}