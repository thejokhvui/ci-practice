# CI-node-demo

Простий Node.js-застосунок для практичної роботи з CI/CD.

При пуші в `main` GitHub Actions встановлює залежності, запускає тести, робить білд, збирає Docker-образ, пушить його в GitHub Container Registry і запускає застосунок на сервері через docker compose.

## Важливо про сервер

У мене виникла проблема з реєстрацією в AWS, тому замість Amazon EC2 використав свій ноутбук.
На ньому стоїть Ubuntu у WSL, а GitHub Actions підключається по SSH через тунель Cloudflare.
Сам процес такий самий, як у завданні. Назви секретів `EC2_*` я залишив як у методичці.

## Важливо про реєстр образів

У завданні вказано Docker Hub, але вхід у Docker Hub із токеном у мене не спрацював. Тому образ лежить у GitHub Container Registry (ghcr.io). Збірка і пуш працюють так само.

## Запуск

    npm install
    npm test
    npm start

## Docker

Зібрати образ із тегом за хешем коміту:

    docker build -t ghcr.io/thejokhvui/nodeapp:$(git rev-parse --short HEAD) .

Запустити застосунок разом із PostgreSQL:

    docker compose up -d --build
    docker compose logs app
    curl http://localhost:3000/db

Тег образу задає змінна `IMAGE_TAG` у `docker-compose.yml`.

## Secrets у GitHub

`EC2_HOST`, `EC2_USER`, `EC2_SSH_KEY_B64`.

Для входу в реєстр використовується вбудований `GITHUB_TOKEN`.
