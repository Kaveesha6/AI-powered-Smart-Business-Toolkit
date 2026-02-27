import React from 'react';
import { TrendingUp, BarChart3, Globe, Zap, Target, Calendar, ArrowUp, ArrowDown } from 'lucide-react';

const MarketTrends: React.FC = () => {
  const trendCategories = [
    {
      icon: <Globe className="h-8 w-8" />,
      title: 'Global Market Trends',
      description: 'Worldwide economic and business developments affecting all industries',
      trends: [
        'Digital transformation acceleration',
        'Sustainability and ESG focus',
        'Remote work normalization',
        'AI and automation adoption'
      ]
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: 'Industry-Specific Trends',
      description: 'Sector-focused developments and emerging opportunities',
      trends: [
        'E-commerce growth patterns',
        'Healthcare technology advances',
        'Fintech innovations',
        'Green energy expansion'
      ]
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: 'Technology Trends',
      description: 'Cutting-edge technologies shaping business landscapes',
      trends: [
        'Artificial Intelligence integration',
        'Blockchain applications',
        'IoT ecosystem growth',
        'Cloud-first strategies'
      ]
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: 'Consumer Behavior',
      description: 'Evolving customer preferences and purchasing patterns',
      trends: [
        'Personalization demand',
        'Social commerce rise',
        'Subscription model preference',
        'Ethical consumption focus'
      ]
    }
  ];

  const marketIndicators = [
    {
      name: 'Digital Adoption Rate',
      value: '78%',
      change: '+12%',
      trend: 'up',
      description: 'Businesses adopting digital-first strategies'
    },
    {
      name: 'Remote Work Adoption',
      value: '42%',
      change: '+28%',
      trend: 'up',
      description: 'Companies offering remote work options'
    },
    {
      name: 'AI Implementation',
      value: '34%',
      change: '+19%',
      trend: 'up',
      description: 'Organizations using AI technologies'
    },
    {
      name: 'Traditional Retail',
      value: '23%',
      change: '-8%',
      trend: 'down',
      description: 'Physical-only retail market share'
    }
  ];

  const emergingOpportunities = [
    {
      title: 'Sustainable Business Models',
      description: 'Growing demand for environmentally conscious products and services',
      potential: 'High',
      timeframe: '1-2 years'
    },
    {
      title: 'AI-Powered Personalization',
      description: 'Customized experiences driving customer engagement and loyalty',
      potential: 'Very High',
      timeframe: '6-12 months'
    },
    {
      title: 'Hybrid Work Solutions',
      description: 'Tools and services supporting flexible work arrangements',
      potential: 'High',
      timeframe: 'Immediate'
    },
    {
      title: 'Health & Wellness Tech',
      description: 'Digital health solutions and wellness platforms',
      potential: 'High',
      timeframe: '1-3 years'
    }
  ];

  const trendSources = [
    'Industry Research Reports',
    'Market Analysis Firms',
    'Government Economic Data',
    'Consumer Behavior Studies',
    'Technology Innovation Tracking',
    'Social Media Sentiment Analysis'
  ];

  return (
    <div className="bg-white dark:bg-gray-900 transition-colors">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-green-900/20 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-full mb-4">
              <TrendingUp className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Market Trends
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Stay ahead of the curve with real-time market insights, emerging trends, 
            and data-driven analysis to guide your business decisions.
          </p>
        </div>
      </section>

      {/* Market Indicators */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Key Market Indicators
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Real-time metrics showing current market conditions and trends
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {marketIndicators.map((indicator, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {indicator.name}
                  </h3>
                  <div className={`flex items-center space-x-1 ${
                    indicator.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {indicator.trend === 'up' ? (
                      <ArrowUp className="h-4 w-4" />
                    ) : (
                      <ArrowDown className="h-4 w-4" />
                    )}
                    <span className="text-sm font-medium">{indicator.change}</span>
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {indicator.value}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {indicator.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trend Categories */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Trending Categories
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Explore different categories of market trends affecting businesses today
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {trendCategories.map((category, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="p-3 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-xl">
                    {category.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {category.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {category.description}
                    </p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {category.trends.map((trend, idx) => (
                    <li key={idx} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-700 dark:text-gray-300">{trend}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emerging Opportunities */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Emerging Opportunities
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Identify and capitalize on upcoming market opportunities
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {emergingOpportunities.map((opportunity, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {opportunity.title}
                  </h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    opportunity.potential === 'Very High' 
                      ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                      : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                  }`}>
                    {opportunity.potential} Potential
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {opportunity.description}
                </p>
                <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                  <Calendar className="h-4 w-4" />
                  <span>Timeline: {opportunity.timeframe}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Data Sources */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Our Data Sources
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Comprehensive market intelligence from trusted sources
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendSources.map((source, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 text-center">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {source}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-700 dark:from-green-700 dark:to-green-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Stay Ahead of Market Changes
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Get real-time market insights and trend analysis to make informed business 
            decisions and capitalize on emerging opportunities.
          </p>
          <button className="inline-flex items-center px-8 py-4 bg-white text-green-600 font-semibold rounded-xl hover:bg-gray-50 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
            Get Market Insights
            <TrendingUp className="ml-2 h-5 w-5" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default MarketTrends;