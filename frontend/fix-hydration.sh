#!/bin/bash

echo "🔧 Aplicando correções de hidratação..."

# 1. Instalar react-hot-toast se necessário
npm install react-hot-toast

# 2. Limpar cache do Next.js
rm -rf .next 2>/dev/null || true

echo ""
echo "✅ Correções aplicadas!"
echo "📋 Resumo das mudanças:"
echo "   • Criado hook useFormat para formatação consistente"
echo "   • Criada página de perfil (My Profile)"
echo "   • Atualizado ModernHeader para fechar menu ao clicar fora"
echo "   • Corrigida formatação de números em todas as páginas"
echo "   • Adicionado suporte a modo escuro consistente"
echo ""
echo "🚀 Reinicie o servidor:"
echo "npm run dev"
echo ""
echo "🌐 Acesse: http://localhost:3000"
echo "👤 A página My Profile agora está disponível: http://localhost:3000/profile"
