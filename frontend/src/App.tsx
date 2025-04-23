import React, { useState } from 'react';
import Chat from './components/Chat';
import './App.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleNewChat = () => {
    // Simply refresh the page for a new chat
    window.location.reload();
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="h-screen w-full flex overflow-hidden bg-gray-900">
      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={toggleSidebar}
        ></div>
      )}
      
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:static z-20 h-full w-64 bg-gray-800 border-r border-gray-700 flex flex-col transition-transform duration-300 ease-in-out`}>
        <div className="p-4">
          <button 
            onClick={handleNewChat}
            className="w-full bg-glow-green hover:bg-green-400 text-dark-blue font-medium py-2 px-4 rounded-md flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 00-1 1v5H4a1 1 0 100 2h5v5a1 1 0 102 0v-5h5a1 1 0 100-2h-5V4a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            New Chat
          </button>
        </div>
        <div className="overflow-y-auto flex-1">
          <div className="px-4 py-3 cursor-pointer bg-gray-700 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
            </svg>
            <span className="text-gray-300 truncate">Current conversation</span>
          </div>
        </div>
        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center text-gray-400 text-sm">
            <div className="rounded-full bg-gray-700 w-8 h-8 flex items-center justify-center mr-2">
              <span>U</span>
            </div>
            <span>User</span>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-gray-800 border-b border-gray-700 py-2 px-4 flex justify-between items-center">
          <button 
            className="md:hidden text-gray-400 hover:text-white"
            onClick={toggleSidebar}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-xl font-bold text-glow-green">Glow-in-the-Dark Widget</h1>
          <div className="w-6"></div> {/* For centering the title */}
        </header>
        
        <div className="flex-1 overflow-hidden">
          <Chat />
        </div>
      </div>
    </div>
  );
}

export default App;
