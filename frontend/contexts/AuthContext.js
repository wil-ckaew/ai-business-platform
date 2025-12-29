import { createContext, useState, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'

const AuthContext = createContext({})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Verificar se há um usuário salvo no localStorage ao carregar a página
    const storedUser = localStorage.getItem('user')
    const token = localStorage.getItem('token')
    
    if (storedUser && token) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (e) {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
      }
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      console.log('Tentando login com:', { email, password })
      
      const response = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ email, password }),
      })

      console.log('Resposta do login:', response.status)
      
      if (response.ok) {
        const data = await response.json()
        console.log('Dados do login:', data)
        
        // O backend Rust retorna { token: string, user: {...} }
        const userData = data.user || { email, name: email.split('@')[0] }
        const token = data.token || 'demo-token'
        
        setUser(userData)
        localStorage.setItem('user', JSON.stringify(userData))
        localStorage.setItem('token', token)
        
        return { success: true }
      } else {
        const errorText = await response.text()
        console.error('Erro no login:', errorText)
        
        // Fallback para demo se o backend não estiver respondendo
        if (email === 'admin@aibusiness.com' && password === 'admin123') {
          const demoUser = {
            id: 1,
            email: 'admin@aibusiness.com',
            name: 'Administrador',
            role: 'admin'
          }
          setUser(demoUser)
          localStorage.setItem('user', JSON.stringify(demoUser))
          localStorage.setItem('token', 'demo-admin-token')
          return { success: true }
        }
        
        if (email === 'user@example.com' && password === 'user123') {
          const demoUser = {
            id: 2,
            email: 'user@example.com',
            name: 'Usuário Demo',
            role: 'user'
          }
          setUser(demoUser)
          localStorage.setItem('user', JSON.stringify(demoUser))
          localStorage.setItem('token', 'demo-user-token')
          return { success: true }
        }
        
        return { 
          success: false, 
          error: response.status === 401 ? 'Credenciais inválidas' : 'Erro no servidor' 
        }
      }
    } catch (error) {
      console.error('Erro de rede no login:', error)
      
      // Fallback para demo em caso de erro de rede
      if (email === 'admin@aibusiness.com' && password === 'admin123') {
        const demoUser = {
          id: 1,
          email: 'admin@aibusiness.com',
          name: 'Administrador',
          role: 'admin'
        }
        setUser(demoUser)
        localStorage.setItem('user', JSON.stringify(demoUser))
        localStorage.setItem('token', 'demo-admin-token')
        return { success: true }
      }
      
      if (email === 'user@example.com' && password === 'user123') {
        const demoUser = {
          id: 2,
          email: 'user@example.com',
          name: 'Usuário Demo',
          role: 'user'
        }
        setUser(demoUser)
        localStorage.setItem('user', JSON.stringify(demoUser))
        localStorage.setItem('token', 'demo-user-token')
        return { success: true }
      }
      
      return { 
        success: false, 
        error: 'Erro de conexão. Verifique se o backend está rodando.' 
      }
    }
  }

  const register = async (name, email, password) => {
    try {
      console.log('Tentando registro com:', { name, email, password })
      
      const response = await fetch('/api/v1/auth/register', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ name, email, password }),
      })

      console.log('Resposta do registro:', response.status)
      
      if (response.ok) {
        const data = await response.json()
        console.log('Dados do registro:', data)
        
        const userData = data.user || { email, name }
        const token = data.token || 'new-user-token'
        
        setUser(userData)
        localStorage.setItem('user', JSON.stringify(userData))
        localStorage.setItem('token', token)
        
        return { success: true }
      } else {
        const errorText = await response.text()
        console.error('Erro no registro:', errorText)
        return { 
          success: false, 
          error: response.status === 409 ? 'Email já cadastrado' : 'Erro no registro' 
        }
      }
    } catch (error) {
      console.error('Erro de rede no registro:', error)
      return { 
        success: false, 
        error: 'Erro de conexão. Tente novamente mais tarde.' 
      }
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    router.push('/auth')
  }

  const updateUser = (userData) => {
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register, 
      logout, 
      updateUser,
      loading 
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
