import { TrendingUp, TrendingDown } from 'lucide-react'

const predictionData = [
  { month: 'Jan 2024', predicted: 4200, actual: 4100 },
  { month: 'Feb 2024', predicted: 4500, actual: 4600 },
  { month: 'Mar 2024', predicted: 4800, actual: 4900 },
  { month: 'Apr 2024', predicted: 5100, actual: 5050 },
  { month: 'May 2024', predicted: 5400, actual: null },
  { month: 'Jun 2024', predicted: 5700, actual: null },
  { month: 'Jul 2024', predicted: 6000, actual: null },
]

export default function PredictionCard() {
  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {predictionData.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <span className="text-sm text-gray-600">{item.month}</span>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <span className="font-medium text-gray-900">
                  ${item.predicted.toLocaleString()}
                </span>
                <div className="flex items-center text-xs text-gray-500">
                  {item.actual && (
                    <>
                      {item.actual >= item.predicted ? (
                        <TrendingUp className="h-3 w-3 text-success-500 mr-1" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-danger-500 mr-1" />
                      )}
                      Actual: ${item.actual.toLocaleString()}
                    </>
                  )}
                </div>
              </div>
              <div className="h-2 w-16 bg-primary-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary-600 rounded-full"
                  style={{ width: `${Math.min(item.predicted / 6000 * 100, 100)}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-gray-900">AI Insights</h4>
            <p className="text-sm text-gray-600">Strong growth expected in Q2</p>
          </div>
          <button className="px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors">
            View Details
          </button>
        </div>
      </div>
    </div>
  )
}
