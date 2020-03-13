# ШРИ 2020. Домашнее задание 3. "CI сервер на Node.js"

## Результат


## Описание задачи
>Вам нужно написать серверную часть для своего CI сервера. В результате должно получиться приложение Node.js, которое умеет отдавать в браузер статические файлы и предоставляет API для клиентского кода.

### Предметная область

Ваше приложение — это CI сервер, который работает с Git репозиторием. Параметры репозитория задаются в настройках. 

Для любого из коммитов репозитория можно запустить операцию сборки. Сборка — это выполнение каких-то действий над содержимым репозитория. Результатом сборки является лог её выполнения.

CI сервер должен отображать список сборок с информацией о них. Также он должен давать возможность посмотреть лог любой сборки. Кроме того, он должен иметь возможность редактирования настроек репозитория.

### API

В вашем API должны быть все команды, нужные для работы клиентской части приложения:

- %%GET /api/settings%% — получение сохраненных настроек
- %%POST /api/settings%% - cохранение настроек
- %%GET  /api/builds%% - получение списка сборок 
- %%POST /api/builds/:commitHash%% - добавление сборки в очередь 
- %%GET  /api/builds/:buildId%% - получение информации о конкретной сборке 
- %%GET  /api/builds/:buildId/logs%% - получение логов билда (сплошной текст)

### Структуры данных

**Настройки репозитория** должны иметь следующие поля:
- название репозитория
- название главной ветки
- команда для сборки (например, %%npm run build%%)
- период проверки новых коммитов

**Для каждой сборки** должны храниться следующие поля:
- целочисленный номер сборки 
- commit hash
- commit message
- автор коммита
- время начала сборки
- длительность сборки

Для того, чтобы на сервере получить информацию о коммитах (commit message, автор коммита) вы можете обращаться с помощью консольной утилиты git к локальной копии репозитория. Локальную копию репозитория можно создавать в момент сохранения настроек (%%git clone%%), либо любым другим способом на своё усмотрение.

### Хранение состояния

Для хранения состояния используйте бэкенд, который будет хранить данные в БД.

- описание API: https://hw.shri.yandex/api/
- получение токена для авторизации: https://hw.shri.yandex/

В каждом запросе к бэкенду нужно передавать специальный токен в заголовке ##Authorization## (например, ##Authorization: Bearer eyjhbgcioijiuzi1niisi##, где "eyjhbgcioijiuzi1niisi" — это токен). Получить токен можно на страничке https://hw.shri.yandex. Для этого нужно залогиниться через GitHub.

!!Пожалуйста, не храните токен в репозитории!!

### Дополнительное задание

Кэширование ручки получения логов %%GET  /api/builds/:commitHash/logs%%

Получение логов конкретной сборки — это дорогая операция для хранилища. Реализуйте кэширование результатов запросов за логами, чтобы при повторных запросах не было обращения к хранилищу и логи возвращались на клиент без задержки. Подумайте про переполнение памяти, инвалидацию кэша.

### Задание со звездочкой

Сделайте, чтобы ваше приложение само проверяло репозиторий на появление новых коммитов и добавляло их в очередь на сборку. Период проверки задается в настройках приложения.
