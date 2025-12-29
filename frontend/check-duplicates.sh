#!/bin/bash

echo "🔍 Verificando páginas duplicadas no Next.js..."

# Encontrar possíveis duplicações
echo "📁 Páginas encontradas:"
find pages -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" | sort

echo ""
echo "⚠️  Possíveis conflitos de rota:"

# Verificar por arquivos que podem gerar rotas duplicadas
find pages -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" | \
  sed 's|^pages/||' | \
  sed 's|/index\.jsx*$||' | \
  sed 's|\.jsx*$||' | \
  sed 's|\.tsx*$||' | \
  sort | uniq -d

echo ""
echo "✅ Verificação concluída!"
