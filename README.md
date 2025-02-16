# Short Link
# Проект доступен по адресу: [http://3.71.114.54](http://3.71.114.54)

## О проекте
**Short Link** – это веб-приложение для сокращения длинных URL. Оно позволяет пользователям создавать короткие ссылки, управлять ими и отслеживать клики. Проект состоит из двух частей:

- **short_link_client** – фронтенд на Vite + React
- **short_link_server** – бэкенд на NestJS

## Основные технологии

### Клиент:
- Vite
- Material-UI
- React
- Docker

### Сервер:
- NestJS
- PostgreSQL
- Docker
- AWS EC2

## Установка и запуск
### 1. Клонирование репозитория
```sh
git clone https://github.com/yan428v/short_link.git
cd short_link
```

### 2. Запуск с Docker
```sh
docker-compose up --build
```

### 3. Ручной запуск
#### Сервер
```sh
cd short_link_server
npm install
npm run start:dev
```

#### Клиент
```sh
cd short_link_client
npm install
npm run dev
```

