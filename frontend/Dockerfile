FROM node:18-alpine

# Instalar dependências do sistema necessárias
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Copiar package.json primeiro para melhor cache
COPY package.json package-lock.json* ./

# Instalar dependências
RUN npm ci --legacy-peer-deps --no-audit

# Copiar código fonte
COPY . .

# Expor porta
EXPOSE 3000

# Comando para desenvolvimento
CMD ["npm", "run", "dev"]
