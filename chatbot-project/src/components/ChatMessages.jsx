import {useRef, useEffect} from "react";
import ChatMessage from './ChatMessage'

function useAutoScroll(dependencies) {
  const containerRef = useRef(null);

  useEffect(() => {
    const containerElem = containerRef.current;
    if (containerElem) {
      containerElem.scrollTop = containerElem.scrollHeight;
    }
  }, dependencies)

  return containerRef;
}

export default function ChatMessages({ chatMessages }) {
  const chatMessagesRef = useAutoScroll([chatMessages])

  return (
    <div className="chat-messages-container" ref={chatMessagesRef}>
      {chatMessages.map((message) => {
        return (
          <ChatMessage
            message={message.message}
            sender={message.sender}
            key={message.id}
          />
        )
      })}
    </div>
  )
}
