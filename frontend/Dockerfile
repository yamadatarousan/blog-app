# frontend/Dockerfile
FROM node:20

WORKDIR /app

# 依存関係をコピー
COPY ./frontend/package*.json ./
RUN npm install

# アプリケーションファイルをコピー
COPY ./frontend .

# ビルド
RUN npm run build

# 本番環境起動
CMD ["npm", "run", "start"]

EXPOSE 3000