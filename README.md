# ШРИ 2020. "CI сервер на Express и его клиент на React"

## Общее описание

Проект пердставляет клиент-серверное приложение для запуска сборок приложений из произвольных
репозиториев. Серверная часть выполнена с использованием [Express](https://expressjs.com/), а клиент
основан на [React](https://reactjs.org/).

## Описание сервера

Сервер отдает статические файлы из папки `public`, а также имеет REST API для клиентской части.
Перед запуском приложение необходимо настроить, задав переменные окружения в файле `.env`. Шаблон
этого файла хранится в [.env-example](.env-example). Сервер запускается командой
`npm run start:server` и ожидает запросы на `localhost:3000`. На `localhost:3000/api-docs` можно
ознакомиться с его API.  
Для задания был подготовлен вспомогательный репозиторий
[hw-3-public-repo-example](https://github.com/dvdvdmt/hw-3-public-repo-example). В нем можно
выполнить команду псевдо сборки `npm run --silent build` которая выдаст лог сборки, либо завешится
ошибкой. Тестовые настройки можно задать с помощью `curl`:

```$bash
curl --location --request POST 'localhost:3000/api/settings' \
--header 'Content-Type: application/json' \
--data-raw '{
    "mainBranch": "main",
    "buildCommand": "npm run --silent build",
    "repoName": "dvdvdmt/hw-3-public-repo-example",
    "period": 1
}'
```

## Описание клиента

> ⚠️ Клиент находится в процессе написания и на текущий момент не удовлетворяет минимальным
> требованиям указанным [в задаче](https://wiki.yandex.ru/shri-2020/homework/React-II/).

Для запуска клиента выполните `npm run start:client:dev`. Основные функци покрыты end-to-end тестами
которые запускаются командой `npm run test:e2e`. Интересной особенностью является генерация
API-client на основе OpenAPI схемы сервера. Запустить генерацию клиента можно командой
`npm run api:generate`.
