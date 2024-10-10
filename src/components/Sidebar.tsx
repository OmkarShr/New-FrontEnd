import React from 'react';
import { PlusCircle, MessageSquare, Scale, BookOpen, LogOut } from 'lucide-react';
import Logo from './Logo';

interface SidebarProps {
  currentChat: string | null;
  setCurrentChat: (chat: string | null) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentChat, setCurrentChat }) => {
  const chatHistory = [
    'Contract Review',
    'Legal Research',
    'Case Analysis',
  ];

  return (
    <aside className="w-64 bg-gray-800 flex flex-col">
      <div className="p-4 flex items-center space-x-2">
        <Logo size={32} />
        <h1 className="text-xl font-bold">Legal-Eaze</h1>
      </div>
      <button
        onClick={() => setCurrentChat(null)}
        className="m-4 p-3 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors flex items-center space-x-2"
      >
        <PlusCircle size={20} />
        <span>New chat</span>
      </button>
      <div className="flex-grow overflow-y-auto">
        {chatHistory.map((chat, index) => (
          <button
            key={index}
            onClick={() => setCurrentChat(chat)}
            className={`w-full p-3 text-left hover:bg-gray-700 transition-colors flex items-center space-x-2 ${
              currentChat === chat ? 'bg-gray-700' : ''
            }`}
          >
            <MessageSquare size={20} />
            <span>{chat}</span>
          </button>
        ))}
      </div>
      <div className="p-4 border-t border-gray-700 space-y-2">
        <button className="w-full p-2 hover:bg-gray-700 transition-colors rounded-md flex items-center space-x-2">
          <Scale size={20} />
          <span>Legal Resources</span>
        </button>
        <button className="w-full p-2 hover:bg-gray-700 transition-colors rounded-md flex items-center space-x-2">
          <BookOpen size={20} />
          <span>Learn More</span>
        </button>
        <button className="w-full p-2 hover:bg-gray-700 transition-colors rounded-md flex items-center space-x-2">
          <LogOut size={20} />
          <span>Log out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;