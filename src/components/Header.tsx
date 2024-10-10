import React from 'react';
import { Mail } from 'lucide-react';
import Logo from './Logo';

interface HeaderProps {
  onEmailClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onEmailClick }) => {
  return (
    <header className="bg-gray-800 text-white p-4 border-b border-gray-700">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Logo size={48} />
          <h1 className="text-2xl font-bold">Legal-Eaze</h1>
        </div>
        <button
          onClick={onEmailClick}
          className="bg-primary-500 text-white px-4 py-2 rounded-full flex items-center space-x-2 hover:bg-primary-600 transition-colors"
        >
          <Mail size={20} />
          <span>Email Summary</span>
        </button>
      </div>
    </header>
  );
};

export default Header;