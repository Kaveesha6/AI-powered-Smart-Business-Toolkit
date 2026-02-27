import React from 'react';
import { BarChart3, TrendingUp, Users, Target, Eye, Search, Award, AlertTriangle } from 'lucide-react';

const CompetitorAnalysis: React.FC = () => {
  const analysisSteps = [
    {
      icon: <Search className="h-8 w-8" />,
      title: 'Identify Competitors',
      description: 'Find direct and indirect competitors in your market space',
      details: [
        'Direct competitors offering similar products/services',
        'Indirect competitors solving the same customer problem',
        'Emerging competitors and new market entrants'
      ]
    },
    {
      icon: <Eye className="h-8 w-8" />,
      title: 'Analyze Their Strategy',
      description: 'Deep dive into competitor business models and approaches',
      details: [
        'Pricing strategies and value propositions',
        'Marketing channels and messaging',
        'Product features and customer experience'
      ]
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: 'Find Opportunities',
      description: 'Identify gaps and opportunities in the market',
      details: [
        'Underserved customer segments',
        'Product or service gaps',
        'Pricing optimization opportunities'
      ]
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: 'Develop Advantages',
      description: 'Create strategies to outperform competitors',
      details: [
        'Unique value propositions',
        'Superior customer experience',
        'Innovative product features'
      ]
    }
  ];

  const competitorTypes = [
    {
      type: 'Direct Competitors',
      description: 'Companies offering similar products/services to the same target market',
      color: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
    },
    {
      type: 'Indirect Competitors',
      description: 'Companies solving the same customer problem with different solutions',
      color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
    },
    {
      type: 'Substitute Competitors',
      description: 'Alternative solutions customers might choose instead',
      color: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
    }
  ];

  const analysisTools = [
    {
      name: 'SWOT Analysis',
      description: 'Analyze Strengths, Weaknesses, Opportunities, and Threats',
      useCase: 'Compare your position against key competitors'
    },
    {
      name: 'Feature Comparison',
      description: 'Side-by-side comparison of product features and capabilities',
      useCase: 'Identify feature gaps and differentiation opportunities'
    },
    {
      name: 'Pricing Analysis',
      description: 'Compare pricing strategies and value propositions',
      useCase: 'Optimize your pricing strategy and positioning'
    },
    {
      name: 'Marketing Analysis',
      description: 'Study competitor marketing channels and messaging',
      useCase: 'Improve your marketing strategy and reach'
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-900 transition-colors">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
              <BarChart3 className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Competitor Analysis
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Understand your competitive landscape, identify opportunities, and develop strategies 
            to outperform your competition in the market.
          </p>
        </div>
      </section>

      {/* Analysis Process */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Our Analysis Process
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              A systematic approach to understanding your competitive environment
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {analysisSteps.map((step, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl w-fit mb-4">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {step.description}
                </p>
                <ul className="space-y-2">
                  {step.details.map((detail, idx) => (
                    <li key={idx} className="text-sm text-gray-500 dark:text-gray-400 flex items-start">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Competitor Types */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Types of Competitors
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Understanding different competitor categories for comprehensive analysis
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {competitorTypes.map((type, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-4 ${type.color}`}>
                  {type.type}
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {type.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Analysis Tools */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Analysis Tools & Methods
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Proven frameworks and tools for effective competitor analysis
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {analysisTools.map((tool, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {tool.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {tool.description}
                </p>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <p className="text-sm font-medium text-blue-800 dark:text-blue-300">
                    Best for: {tool.useCase}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6">
            <AlertTriangle className="h-12 w-12 text-blue-100 mx-auto mb-4" />
          </div>
          <h2 className="text-4xl font-bold text-white mb-6">
            Stay Ahead of Your Competition
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Don't let competitors catch you off guard. Get comprehensive competitor analysis 
            and strategic insights to maintain your competitive edge.
          </p>
          <button className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-50 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
            Start Analysis
            <BarChart3 className="ml-2 h-5 w-5" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default CompetitorAnalysis;