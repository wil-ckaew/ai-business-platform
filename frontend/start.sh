#!/bin/bash

echo "🚀 Iniciando projeto com novo sistema de administração..."

# Instalar dependências se necessário
if [ ! -d "node_modules" ]; then
  echo "📦 Instalando dependências..."
  npm install
fi

echo "✅ Sistema pronto!"
echo ""
echo "📋 Funcionalidades implementadas:"
echo "   • Header moderno com notificações e perfil"
echo "   • Sistema de administrador vs usuário"
echo "   • Contexto de autenticação"
echo "   • Modo escuro/claro"
echo "   • Menu lateral adaptável"
echo ""
echo "🚀 Iniciando servidor de desenvolvimento..."
echo "🌐 Acesse: http://localhost:3000"
echo ""
echo "🔑 Credenciais demo:"
echo "   • Admin: admin@aibusiness.com / admin123"
echo "   • User: user@example.com / user123"
echo ""
npm run dev
