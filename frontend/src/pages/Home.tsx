import React from 'react';
import { ArrowRight, Bot, TrendingUp, Users, Shield, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const features = [
    {
      icon: <Bot className="h-8 w-8" />,
      title: 'AI-Powered Insights',
      description: 'Get intelligent business recommendations powered by advanced AI technology.'
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: 'Market Analysis',
      description: 'Stay ahead with real-time market trends and competitive intelligence.'
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Expert Consultation',
      description: 'Access professional business advice tailored to your specific needs.'
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Secure & Reliable',
      description: 'Your business data is protected with enterprise-grade security.'
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-900 transition-colors">
      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1920)'
          }}
        >
          <div className="absolute inset-0 bg-black/30 dark:bg-black/50"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
            <div className="space-y-8 bg-white/70 dark:bg-black/70 backdrop-blur-sm p-8 rounded-3xl shadow-2xl">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-red-600 rounded-2xl">
                    <Bot className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white drop-shadow-lg">
                      BBB
                    </h1>
                    <p className="text-xl text-gray-700 dark:text-gray-200 font-medium">
                      BizBuddyBot
                    </p>
                  </div>
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-red-600 dark:text-red-400 drop-shadow-lg">
                  The future of business, in your pocket.
                </h2>
              </div>
              
              <p className="text-xl text-gray-700 dark:text-gray-200 leading-relaxed">
                Transform your business decisions with AI-powered insights, expert consultation, 
                and real-time market analysis. Your intelligent business companion is here to 
                help you succeed.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/dashboard"
                  className="group inline-flex items-center justify-center px-8 py-4 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/50 dark:border-gray-400 text-gray-800 dark:text-gray-200 font-semibold rounded-xl hover:bg-white/20 dark:hover:bg-black/20 backdrop-blur-sm transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </div>
            
            <div className="lg:pl-8 bg-white/70 dark:bg-black/70 backdrop-blur-sm p-8 rounded-3xl shadow-2xl">
              <div className="relative">
                {/* Main Bot Illustration */}
                <div className="w-80 h-80 mx-auto bg-gradient-to-br from-red-500 to-pink-500 rounded-3xl shadow-2xl transform rotate-6 hover:rotate-3 transition-transform duration-500">
                  <div className="absolute inset-4 bg-white dark:bg-gray-800 rounded-2xl flex items-center justify-center">
                    <div className="text-center space-y-4">
                      {/* Robot Avatar */}
                      <div className="w-24 h-24 mx-auto bg-gradient-to-br from-red-100 to-pink-100 dark:from-red-900 dark:to-pink-900 rounded-full flex items-center justify-center">
                        <div className="relative">
                          <div className="w-16 h-12 bg-red-200 dark:bg-red-800 rounded-full relative">
                            <div className="absolute top-2 left-3 w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
                            <div className="absolute top-2 right-3 w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
                            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-2 bg-red-500 rounded-full"></div>
                          </div>
                          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                            <div className="w-1 h-4 bg-red-400 rounded-full"></div>
                            <div className="absolute -top-1 -left-1 w-3 h-3 bg-red-500 rounded-full animate-bounce"></div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Hi! I'm BBB</h3>
                        <p className="text-gray-600 dark:text-gray-300">Your AI Business Buddy</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-yellow-400 rounded-2xl shadow-lg animate-bounce flex items-center justify-center">
                  <Zap className="h-8 w-8 text-yellow-800" />
                </div>
                <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-blue-500 rounded-2xl shadow-lg animate-pulse flex items-center justify-center">
                  <TrendingUp className="h-10 w-10 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose BizBuddyBot?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Powerful features designed to accelerate your business growth and decision-making process.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300"
              >
                <div className="p-3 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl w-fit mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-red-700 dark:from-red-700 dark:to-red-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses already using BizBuddyBot to make smarter decisions and drive growth.
          </p>
          <Link
            to="/dashboard"
            className="inline-flex items-center px-8 py-4 bg-white text-red-600 font-semibold rounded-xl hover:bg-gray-50 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Start Your Journey
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;