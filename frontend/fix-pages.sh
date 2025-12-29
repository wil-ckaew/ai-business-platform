#!/bin/bash

echo "🔧 Corrigindo páginas para usar Layout centralizado..."

# Vamos processar cada página com um script Node.js mais robusto
node << 'NODE_SCRIPT'
const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'pages');
const pages = ['dashboard', 'ai-dashboard', 'analytics', 'sales', 'customers'];

pages.forEach(page => {
  const pageFile = path.join(pagesDir, \`\${page}.js\`);
  if (!fs.existsSync(pageFile)) return;

  console.log(\`Processando \${page}.js...\`);
  
  let content = fs.readFileSync(pageFile, 'utf8');
  
  // Fazer backup
  fs.writeFileSync(\`\${pageFile}.bak\`, content);
  
  // Remover imports de Sidebar, Header, Layout
  content = content.replace(/import\s+(?:Sidebar|Header|Layout)\s+from\s+['"][^'"]+['"];?\n?/g, '');
  
  // Remover componentes do JSX: <Sidebar />, <Header />, <Layout>...</Layout>
  // Vamos fazer uma substituição simples, mas pode não cobrir todos os casos.
  // Remover <Sidebar /> ou <Sidebar /> com possíveis espaços e quebras de linha
  content = content.replace(/<Sidebar\s*\/>\s*/g, '');
  content = content.replace(/<Header\s*\/>\s*/g, '');
  
  // Remover <Layout> e </Layout> e ajustar indentação
  // Isso é mais complexo, então vamos apenas avisar e pedir para ajustar manualmente.
  
  // Se houver um Layout envolvendo, vamos tentar remover
  const lines = content.split('\n');
  let newLines = [];
  let insideLayout = false;
  
  for (let line of lines) {
    // Se encontrar <Layout> ou <Layout ...> em uma linha, marca que estamos dentro
    if (line.includes('<Layout') && !line.includes('</Layout')) {
      insideLayout = true;
      continue; // Pula a linha com <Layout>
    }
    
    // Se encontramos </Layout>, fecha e continua
    if (line.includes('</Layout>')) {
      insideLayout = false;
      continue;
    }
    
    // Se não estiver dentro do Layout, adiciona a linha
    if (!insideLayout) {
      newLines.push(line);
    }
  }
  
  content = newLines.join('\n');
  
  // Escrever de volta
  fs.writeFileSync(pageFile, content);
});

console.log('✅ Páginas processadas!');
NODE_SCRIPT

echo ""
echo "⚠️  As páginas foram ajustadas, mas verifique manualmente."
echo "   Backups criados com extensão .bak"
