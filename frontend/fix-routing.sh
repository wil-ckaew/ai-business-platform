#!/bin/bash

echo "🔧 Verificando e corrigindo roteamento..."

cd ~/rust/ai-business-platform/frontend

# 1. Verificar se as páginas existem
echo "📁 Páginas existentes:"
find pages -type f -name "*.js" -o -name "*.jsx" | sort

# 2. Verificar o conteúdo do Layout
echo ""
echo "📄 Verificando Layout (DashboardLayout):"
cat components/layout/DashboardLayout.js

# 3. Verificar o Sidebar
echo ""
echo "📄 Verificando Sidebar:"
cat components/layout/Sidebar.js

# 4. Verificar o MobileMenu
echo ""
echo "📄 Verificando MobileMenu:"
cat components/MobileMenu.js

# 5. Verificar _app.js
echo ""
echo "📄 Verificando _app.js:"
cat pages/_app.js

# 6. Criar uma página de teste para verificar se o roteamento funciona
cat > pages/test.js << 'TEST'
export default function Test() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Test Page</h1>
      <p>If you can see this, routing is working.</p>
    </div>
  )
}
TEST

echo ""
echo "✅ Verificação concluída."
echo "🌐 Acesse: http://localhost:3000/test para verificar se a página de teste funciona."

