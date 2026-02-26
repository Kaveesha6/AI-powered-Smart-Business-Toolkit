import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import ChatBot from './ChatBot';
import ChatBotButton from './ChatBotButton';
import { useAuth } from '../contexts/AuthContext';

const Layout: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const location = useLocation();
  const { isLoggedIn } = useAuth();

  // Hide chatbot on auth page OR if user is not logged in
  const hideChatbot = location.pathname === '/auth' || !isLoggedIn;

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      
      {/* Chatbot - Only visible when logged in and not on auth page */}
      {!hideChatbot && (
        <>
          <ChatBotButton onClick={() => setIsChatOpen(true)} />
          <ChatBot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
        </>
      )}
    </div>
  );
};

export default Layout;