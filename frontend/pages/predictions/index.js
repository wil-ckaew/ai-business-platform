import { useState } from 'react'
import Head from 'next/head'
import DashboardLayout from '../../components/layout/DashboardLayout'
import PageWrapper from '../../components/layout/PageWrapper'
import { TrendingUp, Brain, Target, BarChart3, AlertCircle, CheckCircle } from 'lucide-react'

export default function PredictionsPage() {
  const [predictions] = useState([
    { id: 1, metric: 'Revenue Growth', current: 12.5, predicted: 15.2, confidence: 92, trend: 'up', timeframe: 'Next Quarter' },
    { id: 2, metric: 'Customer Acquisition', current: 45, predicted: 58, confidence: 85, trend: 'up', timeframe: 'Next Month' },
    { id: 3, metric: 'Churn Rate', current: 8.2, predicted: 7.1, confidence: 78, trend: 'down', timeframe: 'Next Quarter' },
    { id: 4, metric: 'Market Share', current: 18.5, predicted: 20.3, confidence: 88, trend: 'up', timeframe: 'Next 6 Months' },
    { id: 5, metric: 'Conversion Rate', current: 34.2, predicted: 38.7, confidence: 81, trend: 'up', timeframe: 'Next Month' },
  ])

  const aiInsights = [
    {
      title: 'Revenue Opportunity',
      description: 'AI identifies 15% growth potential in European markets through targeted campaigns.',
      impact: 'High',
      timeframe: 'Q1 2024'
    },
    {
      title: 'Customer Retention',
      description: 'Predicted 12% improvement in retention with personalized engagement strategy.',
      impact: 'Medium',
      timeframe: 'Next 60 days'
    },
    {
      title: 'Cost Optimization',
      description: 'Potential to reduce operational costs by 8% through process automation.',
      impact: 'High',
      timeframe: 'Q2 2024'
    }
  ]

  return (
    <DashboardLayout>
      <Head>
        <title>AI Predictions | AI Business Platform</title>
      </Head>
      
      <PageWrapper>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">AI Predictions</h1>
              <p className="text-gray-600">Advanced AI-powered forecasts and insights</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-primary-50 text-primary-700 rounded-lg">
              <Brain className="h-5 w-5" />
              <span className="font-medium">AI Model: 92% Accuracy</span>
            </div>
          </div>

          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600">Model Accuracy</p>
                  <p className="text-2xl font-bold text-gray-900">92%</p>
                </div>
                <div className="p-3 bg-primary-50 rounded-lg">
                  <Brain className="h-6 w-6 text-primary-600" />
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-500">
                Based on 6 months of data
              </div>
            </div>

            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600">Active Predictions</p>
                  <p className="text-2xl font-bold text-gray-900">{predictions.length}</p>
                </div>
                <div className="p-3 bg-success-50 rounded-lg">
                  <Target className="h-6 w-6 text-success-600" />
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-500">
                <span className="text-success-600 font-medium">+3</span> this month
              </div>
            </div>

            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600">Avg. Confidence</p>
                  <p className="text-2xl font-bold text-gray-900">85%</p>
                </div>
                <div className="p-3 bg-warning-50 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-warning-600" />
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-500">
                Across all predictions
              </div>
            </div>

            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600">Insights Generated</p>
                  <p className="text-2xl font-bold text-gray-900">42</p>
                </div>
                <div className="p-3 bg-secondary-50 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-secondary-600" />
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-500">
                Last 30 days
              </div>
            </div>
          </div>

          {/* Predictions Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Current Predictions */}
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Active Predictions</h3>
                  <p className="text-gray-600">AI forecasts for key metrics</p>
                </div>
                <button className="text-primary-600 hover:text-primary-800 text-sm font-medium">
                  View all →
                </button>
              </div>
              <div className="space-y-4">
                {predictions.map((prediction) => (
                  <div key={prediction.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-medium text-gray-900">{prediction.metric}</h4>
                        <p className="text-sm text-gray-500">{prediction.timeframe}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          prediction.confidence >= 85 ? 'bg-success-100 text-success-800' :
                          prediction.confidence >= 75 ? 'bg-warning-100 text-warning-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {prediction.confidence}% conf
                        </span>
                        {prediction.trend === 'up' ? (
                          <TrendingUp className="h-4 w-4 text-success-500" />
                        ) : (
                          <TrendingUp className="h-4 w-4 text-danger-500 transform rotate-180" />
                        )}
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-gray-600 text-sm">Current:</span>
                        <span className="ml-2 font-medium text-gray-900">
                          {typeof prediction.current === 'number' ? `${prediction.current}%` : prediction.current}
                        </span>
                      </div>
                      <div className="text-gray-400">→</div>
                      <div>
                        <span className="text-gray-600 text-sm">Predicted:</span>
                        <span className="ml-2 font-medium text-primary-600">
                          {typeof prediction.predicted === 'number' ? `${prediction.predicted}%` : prediction.predicted}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Insights */}
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">AI Insights</h3>
                  <p className="text-gray-600">Actionable recommendations</p>
                </div>
                <Brain className="h-6 w-6 text-primary-600" />
              </div>
              <div className="space-y-4">
                {aiInsights.map((insight, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-medium text-gray-900">{insight.title}</h4>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        insight.impact === 'High' ? 'bg-danger-100 text-danger-800' :
                        insight.impact === 'Medium' ? 'bg-warning-100 text-warning-800' :
                        'bg-success-100 text-success-800'
                      }`}>
                        {insight.impact} Impact
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">{insight.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 text-sm">Timeframe: {insight.timeframe}</span>
                      <button className="text-primary-600 hover:text-primary-800 text-sm font-medium">
                        Take Action →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Confidence Indicators */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Prediction Confidence</h3>
            <div className="space-y-4">
              {[
                { label: 'Revenue Predictions', confidence: 92, color: 'bg-success-500' },
                { label: 'Customer Behavior', confidence: 85, color: 'bg-primary-500' },
                { label: 'Market Trends', confidence: 78, color: 'bg-warning-500' },
                { label: 'Risk Assessment', confidence: 88, color: 'bg-secondary-500' },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-700">{item.label}</span>
                    <span className="font-medium text-gray-900">{item.confidence}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${item.color} rounded-full`}
                      style={{ width: `${item.confidence}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-success-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-success-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Recommended Actions</h4>
                  <p className="text-gray-600 text-sm">Based on current predictions</p>
                </div>
              </div>
              <ul className="space-y-3">
                {[
                  'Increase marketing budget for European campaigns',
                  'Implement customer retention program',
                  'Optimize pricing for enterprise clients',
                  'Expand product features based on demand forecast'
                ].map((action, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <div className="h-2 w-2 bg-success-500 rounded-full mr-3"></div>
                    {action}
                  </li>
                ))}
              </ul>
            </div>

            <div className="card">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-warning-50 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-warning-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Risk Factors</h4>
                  <p className="text-gray-600 text-sm">Areas requiring attention</p>
                </div>
              </div>
              <ul className="space-y-3">
                {[
                  'Market volatility may affect growth predictions',
                  'Competitor activity increasing in Q2',
                  'Supply chain dependencies identified',
                  'Seasonal fluctuations expected in Q3'
                ].map((risk, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <div className="h-2 w-2 bg-warning-500 rounded-full mr-3"></div>
                    {risk}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </PageWrapper>
    </DashboardLayout>
  )
}
