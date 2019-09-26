# Schedule api

schedule manager api

```shell
docker pull kainonly/schedule-api:1.0.0
```

## Version

- `1.0.0` stable

## Docker Compose

example

```yml
version: '3.7'
services:
  schedule:
    image: kainonly/schedule-api:1.0.0
    restart: always
    volumes: 
      - ./schedule:/app/storage
    ports:
      - 3000:3000
```

## Environment

- **LOGGER** `boolean` service logger, default `false`
- **STORAGE** `string` leveldb storage path, default `/app/storage/logs`

## Api docs

Assume that the underlying request path is `http://localhost:3000`

#### Put Job

- url `/put`
- method `POST`
- body
  - **identity** `string` Job identity
  - **time** `string` Cron rule
  - **bash** `string` Exec base
  - **start** `boolean` Begin execution
  - **zone** `string` Timezone

```json
{
	"identity":"test",
	"time":"* * * * * *",
	"bash":"echo 1",
	"start":true,
	"zone":"Asia/Shanghai"
}
```

- response
  - **error** `number` status
  - **msg** `string` Message

```json
{
    "error": 0,
    "msg": "ok"
}
```

#### Get Job

- url `/get`
- method `POST`
- body
  - **identity** `string` Job identity

```json
{
	"identity":"test"
}
```

- response
  - **error** `number` status
  - **data**
    - **identity** `string` Job identity
    - **time** `string` Cron rule
    - **bash** `string` Exec base
    - **start** `boolean` Begin execution
    - **zone** `string` Timezone
    - **running** `boolean` Running status
    - **nextDate** `Date` Next run date
    - **lastDate** `Date` Last run date

```json
{
    "error": 0,
    "data": {
        "identity": "test",
        "time": "* * * * * *",
        "bash": "echo 1",
        "start": true,
        "zone": "Asia/Shanghai",
        "running": true,
        "nextDate": "2019-09-26T09:35:59.000Z",
        "lastDate": "2019-09-26T09:35:58.002Z"
    }
}
```

#### Lists Job

- url `/lists`
- method `POST`
- body
  - **identity** `string[]` Jobs identity array

```json
{
	"identity":["test"]
}
```

- response
  - **data** `array`
    - **identity** `string` Job identity
    - **time** `string` Cron rule
    - **bash** `string` Exec base
    - **start** `boolean` Begin execution
    - **zone** `string` Timezone
    - **running** `boolean` Running status
    - **nextDate** `Date` Next run date
    - **lastDate** `Date` Last run date

```json
{
    "error": 0,
    "data": [
        {
            "identity": "test",
            "time": "* * * * * *",
            "bash": "echo 1",
            "start": true,
            "zone": "Asia/Shanghai",
            "running": true,
            "nextDate": "2019-09-26T09:40:04.000Z",
            "lastDate": "2019-09-26T09:40:03.000Z"
        }
    ]
}
```

#### Change Running Status

- url `/status`
- method `POST`
- body
  - **identity** `string` Job identity
  - **status** `boolean` Job running status

```json
{
	"identity":"test",
	"status":false
}
```

- response
  - **error** `number` status
  - **msg** `string` Message

```json
{
    "error": 0,
    "msg": "ok"
}
```

#### Delete Job

- url `/delete`
- method `POST`
- body
  - **identity** `string` Job identity

```json
{
	"identity":"test"
}
```

- response
  - **error** `number` status
  - **msg** `string` Message

```json
{
    "error": 0,
    "msg": "ok"
}
```

#### Logging Data

- url `/logging`
- method `POST`
- body
  - **type** `string` Logging Type
    - 'put', 'delete', 'status', 'run', 'error'
  - **identity** `string` Job identity
  - **limit** `number` Page limit
  - **skip** `number` Page Number

```json
{
	"type":"run",
	"identity":"test",
	"limit":20,
	"skip":1
}
```