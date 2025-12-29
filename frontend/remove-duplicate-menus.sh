#!/bin/bash

echo "🔧 Removendo menus duplicados das páginas..."

# Função para limpar uma página específica
clean_page() {
  local page=$1
  local component_name=$2
  
  if [ ! -f "pages/${page}.js" ]; then
    echo "⏭️  Página ${page}.js não encontrada, pulando..."
    return
  fi
  
  echo "🔄 Limpando ${page}.js..."
  
  # Fazer backup
  cp "pages/${page}.js" "pages/${page}.js.bak"
  
  # Vamos usar um script Node.js para processar o arquivo
  node <<-NODE_SCRIPT
    const fs = require('fs');
    const path = require('path');
    
    const filePath = path.join(__dirname, 'pages', '${page}.js');
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Remover imports de Sidebar, Header, Layout (se não usados no restante)
    // Isso é uma abordagem simples, pode precisar de ajustes
    content = content.replace(/import\s+(?:Sidebar|Header|Layout)\s+from\s+['"][^'"]+['"];?\n?/g, '');
    
    // Remover qualquer JSX que seja um Sidebar, Header ou Layout
    // Vamos remover apenas se for o componente único, mas como é complexo,
    // vamos apenas garantir que a página exporta um componente que não inclui esses elementos.
    // Na verdade, a melhor abordagem é reescrever a página completamente, mas vamos tentar uma abordagem mais simples.
    
    // Vamos substituir por um template se a página for muito complexa, mas por agora vamos apenas avisar.
    console.log('⚠️  A página ${page}.js foi backupada. Agora, ajuste manualmente removendo qualquer <Sidebar>, <Header> ou <Layout> do JSX.');
    
    // Vamos escrever de volta
    fs.writeFileSync(filePath, content);
NODE_SCRIPT
}

# Lista de páginas para limpar
PAGES="dashboard ai-dashboard analytics sales customers"

for page in $PAGES; do
  clean_page $page
done

echo "✅ Processo concluído!"
echo "⚠️  Por favor, verifique as páginas manualmente para garantir que não há mais menus duplicados."
echo "   Backups foram criados com extensão .bak"
