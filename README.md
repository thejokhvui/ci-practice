# CI-node-demo

Простий Node.js-застосунок для практичної роботи з CI/CD.

При пуші в `main` GitHub Actions встановлює залежності, запускає тести, робить білд, збирає Docker-образ, пушить його в Docker Hub і запускає застосунок на сервері через docker compose.

## Важливо про сервер

У мене виникла проблема з реєстрацією в AWS, тому замість Amazon EC2 використав свій ноутбук.
На ньому стоїть Ubuntu у WSL, а GitHub Actions підключається по SSH через тунель Cloudflare.
Сам процес такий самий, як у завданні. Назви секретів `EC2_*` я залишив як у методичці.

## Запуск

    npm install
    npm test
    npm start

## Docker

Зібрати образ із тегом за хешем коміту (замість `<your-name>` твоє ім'я на Docker Hub):

    docker build -t <your-name>/nodeapp:$(git rev-parse --short HEAD) .

Запустити застосунок разом із PostgreSQL:

    docker compose up -d --build
    docker compose logs app
    curl http://localhost:3000/db

Тег образу задає змінна `IMAGE_TAG` у `docker-compose.yml`.

## Secrets у GitHub

`EC2_HOST`, `EC2_USER`, `EC2_SSH_KEY_B64`, `DOCKERHUB_USERNAME`, `DOCKERHUB_TOKEN`.
