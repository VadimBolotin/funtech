### ЭТАП 1. СБОРКА ПРОЕКТА (build stage)
# Используем легкий образ Node для сборки фронтенда
FROM node:22-alpine AS builder

# Рабочая директория внутри контейнера
WORKDIR /app

# Копируем файлы package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости (используем npm ci, если есть package-lock.json)
RUN npm ci --silent

# Копируем остальной исходный код внутрь контейнера
COPY . .

# Запускаем production-сборку Vite
RUN npm run build


### ЭТАП 2. СТАТИЧЕСКИЙ СЕРВЕР (production stage)
# Используем Nginx для раздачи собранного фронтенда
FROM nginx:alpine AS production

# Удаляем дефолтный конфиг Nginx (опционально)
RUN rm /etc/nginx/conf.d/default.conf

# Создаем простой конфиг, который обслуживает файлы из /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Копируем собранный фронтенд из первого этапа в директорию, откуда Nginx раздает статику
COPY --from=builder /app/dist /usr/share/nginx/html

# Nginx по умолчанию слушает порт 80
EXPOSE 80

# Команда запуска Nginx в "foreground"-режиме
CMD ["nginx", "-g", "daemon off;"]

