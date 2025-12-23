# 📡 API Endpoints

## 🔐 Authentication
- `POST /api/v1/auth/login` - Login de usuário
- `POST /api/v1/auth/register` - Registro de usuário

## 📊 Dashboard
- `GET /api/v1/dashboard` - Dados do dashboard
- `GET /api/v1/dashboard/metrics` - Métricas em tempo real

## 💰 Sales
- `GET /api/v1/sales` - Listar todas as vendas
- `POST /api/v1/sales` - Criar nova venda
- `GET /api/v1/sales/{id}` - Obter venda específica
- `GET /api/v1/sales/analytics` - Análise de vendas

## 👥 Customers
- `GET /api/v1/customers` - Listar clientes
- `POST /api/v1/customers` - Criar cliente
- `GET /api/v1/customers/{id}` - Obter cliente
- `GET /api/v1/customers/segments` - Segmentação de clientes

## 🧠 AI Predictions
- `POST /api/v1/ai/predict` - Previsão de vendas/receita
- `GET /api/v1/ai/insights` - Insights gerados por IA
- `POST /api/v1/ai/analyze` - Análise de texto/sentimento
- `POST /api/v1/ai/cluster` - Clusterização de dados

## 📈 Analytics
- `GET /api/v1/analytics/revenue` - Análise de receita
- `GET /api/v1/analytics/growth` - Análise de crescimento
- `GET /api/v1/analytics/trends` - Identificação de tendências

## 🛠️ System
- `GET /api/v1/health` - Health check
- `GET /api/v1/config` - Configuração do sistema
- `GET /api/v1/stats` - Estatísticas do sistema

## 🔒 Admin
- `GET /api/v1/admin/users` - Gerenciar usuários
- `POST /api/v1/admin/users` - Criar usuário
- `PUT /api/v1/admin/users/{id}` - Atualizar usuário
- `DELETE /api/v1/admin/users/{id}` - Excluir usuário
