FROM node:24-alpine

WORKDIR /app

COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./
RUN npm install

COPY . .

EXPOSE 3001

ENV PORT=3001

CMD ["npm", "run", "dev"]