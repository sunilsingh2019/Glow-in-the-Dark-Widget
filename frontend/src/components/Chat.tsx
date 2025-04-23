import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types/chat';
import { sendMessage } from '../services/chatService';

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: 'Hi! I can answer questions about the Glow-in-the-Dark Widget. What would you like to know?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const exampleQuestions = [
    "What color is it?",
    "Does it need batteries?",
    "Where can I get one?"
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Simple local response function that directly returns answers without typing effect
  const getWidgetResponse = (question: string): string => {
    const normalizedQuestion = question.toLowerCase().trim().replace(/[?.!,;:]$/, '');
    
    if (normalizedQuestion.includes("color") || normalizedQuestion.includes("look like")) {
      return "The Glow-in-the-Dark Widget comes in a phosphorescent green color when charged, but appears white in daylight.";
    }
    
    if (normalizedQuestion.includes("batteries") || normalizedQuestion.includes("power")) {
      return "No, the Glow-in-the-Dark Widget doesn't need batteries. It absorbs light energy during the day and glows for up to 8 hours at night.";
    }
    
    if (normalizedQuestion.includes("where") || normalizedQuestion.includes("get") || normalizedQuestion.includes("buy") || normalizedQuestion.includes("purchase")) {
      return "You can purchase the Glow-in-the-Dark Widget from our online store at www.glowwidget.com or from select retailers nationwide.";
    }
    
    return "I'm sorry, I don't have information about that aspect of the Glow-in-the-Dark Widget. Would you like to know about its color, battery requirements, or where to purchase it?";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: input
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setShowSuggestions(false);
    
    setTimeout(() => {
      // Get response locally to avoid backend issues
      const response = getWidgetResponse(userMessage.content);
      
      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: response
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000); // Simulate a delay for a more realistic experience
  };

  const handleExampleClick = (question: string) => {
    setInput(question);
    setShowSuggestions(false);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden bg-gray-900">
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto py-4 px-3 sm:px-4 md:px-6 flex flex-col">
        <div className="max-w-3xl w-full mx-auto flex-1 flex flex-col justify-end min-h-0">
          {messages.length === 1 && (
            <div className="mb-4 text-center">
              <h2 className="text-2xl font-semibold text-white mb-6">Ask me about the Glow-in-the-Dark Widget!</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {exampleQuestions.map((question, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleExampleClick(question)}
                    className="bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg p-4 text-gray-200 text-left transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          <div className="space-y-6 mb-4">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`flex items-start ${message.role === 'assistant' ? 'mr-12' : 'ml-12 justify-end'}`}
              >
                {message.role === 'assistant' && (
                  <div className="rounded-full bg-green-600 w-8 h-8 mt-1 mr-3 flex items-center justify-center flex-shrink-0">
                    <div className="w-4 h-4 bg-glow-green rounded-full"></div>
                  </div>
                )}
                
                <div 
                  className={`rounded-lg px-4 py-3 ${
                    message.role === 'user' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-800 text-gray-100'
                  }`}
                >
                  {message.content}
                </div>
                
                {message.role === 'user' && (
                  <div className="rounded-full bg-blue-800 w-8 h-8 mt-1 ml-3 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm">U</span>
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex mr-12 items-start">
                <div className="rounded-full bg-green-600 w-8 h-8 mt-1 mr-3 flex items-center justify-center flex-shrink-0">
                  <div className="w-4 h-4 bg-glow-green rounded-full"></div>
                </div>
                <div className="bg-gray-800 text-gray-100 px-4 py-3 rounded-lg flex items-center space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            )}
          </div>
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {/* Footer Input */}
      <div className="border-t border-gray-700 p-4 chat-container">
        <div className="max-w-3xl mx-auto">
          {showSuggestions && !isLoading && !input.trim() && messages.length > 1 && (
            <div className="mb-3 flex flex-wrap gap-2 justify-center">
              {exampleQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleExampleClick(question)}
                  className="bg-gray-800 hover:bg-gray-700 text-gray-200 text-sm px-3 py-1.5 rounded-full transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onClick={() => setShowSuggestions(true)}
              onFocus={() => setShowSuggestions(true)}
              placeholder="Ask about the Glow-in-the-Dark Widget..."
              className="w-full bg-gray-800 text-white rounded-lg pl-4 pr-12 py-3 border border-gray-700 focus:border-glow-green focus:outline-none"
              disabled={isLoading}
            />
            <button 
              type="submit" 
              className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-md ${
                isLoading || !input.trim()
                  ? 'text-gray-500 cursor-not-allowed'
                  : 'text-glow-green hover:bg-gray-700'
              }`}
              disabled={isLoading || !input.trim()}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </form>
          <p className="text-xs text-gray-500 mt-2 text-center">
            © 2023 Glow Widget Company. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Chat; 