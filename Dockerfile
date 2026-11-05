FROM node:lts

WORKDIR /app

# Спочатку тільки package*.json, щоб шар із залежностями кешувався
COPY package*.json ./
RUN npm install --omit=dev

COPY . .

EXPOSE 3000

CMD ["node", "index.js"]
