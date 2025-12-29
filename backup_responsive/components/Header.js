import { useState } from 'react'

export default function Header() {
  const [search, setSearch] = useState('')
  
  return (
    <header className="bg-white shadow">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-2 border rounded"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="p-2">🔔</button>
          </div>
        </div>
      </div>
    </header>
  )
}
