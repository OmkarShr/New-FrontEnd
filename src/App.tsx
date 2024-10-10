import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ChatInterface from './components/ChatInterface';

function App() {
  const [currentChat, setCurrentChat] = useState<string | null>(null);

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Sidebar currentChat={currentChat} setCurrentChat={setCurrentChat} />
      <ChatInterface currentChat={currentChat} />
    </div>
  );
}

export default App;