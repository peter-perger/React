import RobotProfileImage from '../assets/robot-image.png';
import UserProfileImage from '../assets/cat.jpeg';
import dayjs from 'dayjs';

import '../App.css';

export default function ChatMessage({ message, sender }) {
  console.log(UserProfileImage);

  const time = dayjs().valueOf();
  const messageTime = dayjs(time).format('h:mma');

  return (
    <div className={
      sender === "user"
        ? "chat-message-user"
        : "chat-message-robot"
    }>
      {sender === 'robot' && <img src={RobotProfileImage} className="chat-message-profile" />}
      <div className="chat-message-text">
        {message}
        <p className='message-time'>{messageTime}</p>
      </div>
      {sender === 'user' && <img src={UserProfileImage} className="chat-message-profile" />}
    </div>
  );
}