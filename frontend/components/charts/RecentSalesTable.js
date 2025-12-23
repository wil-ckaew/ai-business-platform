export default function RecentSalesTable() {
  const sales = [
    { id: 1, customer: 'John Smith', product: 'Premium License', amount: 249.99, date: '2024-01-15', status: 'Completed' },
    { id: 2, customer: 'Sarah Johnson', product: 'Business Suite', amount: 899.99, date: '2024-01-14', status: 'Pending' },
    { id: 3, customer: 'Mike Wilson', product: 'Basic Plan', amount: 99.99, date: '2024-01-13', status: 'Completed' },
    { id: 4, customer: 'Emma Davis', product: 'Enterprise Bundle', amount: 2499.99, date: '2024-01-12', status: 'Completed' },
    { id: 5, customer: 'Robert Brown', product: 'Pro Tools', amount: 499.99, date: '2024-01-11', status: 'Failed' },
  ]

  const getStatusColor = (status) => {
    switch(status) {
      case 'Completed': return 'bg-success-100 text-success-800'
      case 'Pending': return 'bg-warning-100 text-warning-800'
      case 'Failed': return 'bg-danger-100 text-danger-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Customer
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Product
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Amount
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sales.map((sale) => (
            <tr key={sale.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-semibold">
                    {sale.customer.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{sale.customer}</div>
                    <div className="text-sm text-gray-500">Customer ID: {sale.id}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{sale.product}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">${sale.amount.toFixed(2)}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{sale.date}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(sale.status)}`}>
                  {sale.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button className="text-primary-600 hover:text-primary-900 mr-3">View</button>
                <button className="text-gray-600 hover:text-gray-900">Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
