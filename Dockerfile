# Usar uma imagem oficial do Node.js como base
FROM node:20

# Definir diretório de trabalho dentro do container
WORKDIR /app

# Copiar os arquivos do backend para dentro do container
COPY package.json package-lock.json ./

# Instalar dependências
RUN npm install

# Copiar o restante do código para dentro do container
COPY . .

# Expor a porta que o backend usa
EXPOSE 4000

# Comando para rodar a aplicação
CMD ["node", "server.js"]
