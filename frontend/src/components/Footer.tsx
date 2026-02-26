import React from 'react';
import { Facebook, Linkedin, Twitter, Mail, Bot } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-red-600 rounded-xl">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold">BBB (BizBuddyBot)</h2>
                <p className="text-sm text-gray-400">The future of business, in your pocket.</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Empowering businesses with AI-driven insights, consultation, and market analysis to help you make informed decisions and stay ahead of the competition.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="grid grid-cols-2 gap-2">
              <a href="/" className="text-gray-300 hover:text-red-400 transition-colors text-sm">Home</a>
              <a href="/competitor-analysis" className="text-gray-300 hover:text-red-400 transition-colors text-sm">Competitor Analysis</a>
              <a href="/market-trends" className="text-gray-300 hover:text-red-400 transition-colors text-sm">Market Trends</a>
              <a href="/contact" className="text-gray-300 hover:text-red-400 transition-colors text-sm">Contact</a>
            </div>
          </div>

          {/* Contact & Social */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Stay Connected</h3>
            <div className="flex space-x-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 rounded-lg hover:bg-red-600 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 rounded-lg hover:bg-red-600 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 rounded-lg hover:bg-red-600 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
            <a
              href="mailto:contact@bizbuddybot.com"
              className="flex items-center space-x-2 text-gray-300 hover:text-red-400 transition-colors"
            >
              <Mail className="h-4 w-4" />
              <span className="text-sm">contact@bizbuddybot.com</span>
            </a>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 BizBuddyBot. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;