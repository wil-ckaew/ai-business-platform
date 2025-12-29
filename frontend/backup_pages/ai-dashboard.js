export default function AIDashboard() {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">AI Dashboard</h1>
        <p className="text-gray-600 mt-2">AI-powered insights and predictions</p>
      </div>

      <div className="bg-white rounded-xl shadow p-4 sm:p-6">
        <h3 className="text-lg font-semibold mb-4">AI Features</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="border rounded-lg p-4">
            <div className="text-2xl mb-2">🤖</div>
            <h4 className="font-semibold">Predictive Analytics</h4>
            <p className="text-sm text-gray-600 mt-1">Forecast future trends based on historical data</p>
          </div>
          <div className="border rounded-lg p-4">
            <div className="text-2xl mb-2">🎯</div>
            <h4 className="font-semibold">Smart Recommendations</h4>
            <p className="text-sm text-gray-600 mt-1">Personalized suggestions for your business</p>
          </div>
          <div className="border rounded-lg p-4">
            <div className="text-2xl mb-2">⚡</div>
            <h4 className="font-semibold">Automated Reports</h4>
            <p className="text-sm text-gray-600 mt-1">Generate insights automatically</p>
          </div>
        </div>
      </div>
    </div>
  )
}
