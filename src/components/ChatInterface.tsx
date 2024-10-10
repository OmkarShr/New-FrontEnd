import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatInterfaceProps {
  currentChat: string | null;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ currentChat }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages([...messages, userMessage]);
    setInput('');

    try {
      const response = await fetch('http://localhost:8080/ask_bot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: input,
          conversationsNew: messages,
        }),
      });

      if (!response.ok) throw new Error('Failed to get response');

      const data = await response.json();
      const assistantMessage: Message = { role: 'assistant', content: data.response };
      setMessages((prevMessages) => [...prevMessages, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-900">
      {currentChat ? (
        <>
          <div className="flex-grow overflow-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg ${
                  message.role === 'user' ? 'bg-blue-600 ml-auto' : 'bg-gray-700'
                } max-w-[70%]`}
              >
                {message.content}
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="p-4 border-t border-gray-700">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask your legal question..."
                className="flex-grow p-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Send size={24} />
              </button>
            </div>
          </form>
        </>
      ) : (
        <div className="flex-grow flex flex-col items-center justify-center p-4">
          <h2 className="text-4xl font-bold mb-8">Legal-Eaze</h2>
          <div className="grid grid-cols-3 gap-4 max-w-3xl w-full">
            <FeatureCard
              title="Examples"
              items={[
                '"Explain contract law in simple terms"',
                '"What are the key elements of a valid will?"',
                '"How do I file a small claims lawsuit?"',
              ]}
            />
            <FeatureCard
              title="Capabilities"
              items={[
                "Provides legal information and guidance",
                "Assists with legal research and case analysis",
                "Helps draft legal documents and contracts",
              ]}
            />
            <FeatureCard
              title="Limitations"
              items={[
                "May not have knowledge of recent legal changes",
                "Cannot provide personalized legal advice",
                "Should not replace consultation with a licensed attorney",
              ]}
            />
          </div>
        </div>
      )}
    </div>
  );
};

interface FeatureCardProps {
  title: string;
  items: string[];
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, items }) => (
  <div className="bg-gray-800 p-4 rounded-lg">
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li key={index} className="text-sm">{item}</li>
      ))}
    </ul>
  </div>
);

export default ChatInterface;