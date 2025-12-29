const API_BASE = ''

// Helper para fazer requisições autenticadas
export async function fetchAPI(endpoint, options = {}) {
  const token = localStorage.getItem('token')
  
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...options.headers,
  }
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers,
    })

    if (response.status === 401) {
      // Token inválido ou expirado
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      window.location.href = '/auth'
      return null
    }

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(errorText || 'Erro na requisição')
    }

    return response.json()
  } catch (error) {
    console.error('Erro na requisição:', error)
    throw error
  }
}

// Serviços específicos
export const api = {
  // Dashboard
  async getDashboard() {
    return fetchAPI('/api/v1/dashboard')
  },

  // Vendas
  async getSales() {
    return fetchAPI('/api/v1/sales')
  },

  // Clientes
  async getCustomers() {
    return fetchAPI('/api/v1/customers')
  },

  // Configurações
  async getConfig() {
    return fetchAPI('/api/v1/config')
  },

  // Saúde do sistema
  async getHealth() {
    return fetchAPI('/api/v1/health')
  },

  // Previsões de IA
  async predictSales(data) {
    return fetchAPI('/api/v1/ai/predict/sales', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  async optimizeInventory(data) {
    return fetchAPI('/api/v1/ai/optimize/inventory', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  async detectFraud(data) {
    return fetchAPI('/api/v1/ai/detect/fraud', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  async getInsights() {
    return fetchAPI('/api/v1/ai/insights')
  },

  // Usuários
  async getUsers() {
    return fetchAPI('/api/v1/users')
  },

  async getUser(id) {
    return fetchAPI(`/api/v1/users/${id}`)
  },

  async createUser(userData) {
    return fetchAPI('/api/v1/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    })
  },

  async updateUser(id, userData) {
    return fetchAPI(`/api/v1/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    })
  },

  async deleteUser(id) {
    return fetchAPI(`/api/v1/users/${id}`, {
      method: 'DELETE',
    })
  },
}
