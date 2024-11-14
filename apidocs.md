# Movie API Documentation

## Endpoints :

List of available endpoints:

- `POST /register`
- `POST /login`
- `GET /movies`
- `POST /movies`
- `DELETE /movies/:id`
- `GET /movies/tmdb`
- `PATCH /movies/:id`

&nbsp;

## 1. POST /register

Request:

- headers: 

```json
{
  "authorization": "Bearer token"
}
```

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "email": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required ya"
}
OR
{
  "message": "Harus format email ya"
}
OR
{
  "message": "Email nya sudah dipakai sob"
}
OR
{
  "message": "Password is required ya"
}
```

&nbsp;

## 2. POST /login

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email/password"
}
```

&nbsp;

## 3. GET /movies

Description:
- Get all movie from database

Request:

- headers: 

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
    {
        "id": 9,
        "title": "John Wick 3",
        "synopsis": "Bye doggie",
        "imgUrl": "https://m.media-amazon.com/images/M/MV5BMTU2NjA1ODgzMF5BMl5BanBnXkFtZTgwMTM2MTI4MjE@._V1_.jpg",
        "rating": 10,
        "userId": 6,
        "createdAt": "2024-11-12T03:03:28.553Z",
        "updatedAt": "2024-11-12T03:03:28.553Z"
    },
    {
        "id": 8,
        "title": "John Wick 3",
        "synopsis": "Bye doggie",
        "imgUrl": "https://res.cloudinary.com/daf0mw68q/image/upload/v1731395535/rmt55/kncltdqkcaypkjmoihmy.jpg",
        "rating": 10,
        "userId": 6,
        "createdAt": "2024-11-12T03:00:47.589Z",
        "updatedAt": "2024-11-12T07:12:15.544Z"
    },
    ...
]
```

&nbsp;

## 4. DELETE /movies/:id

Description:
- Delete movie by id

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "message": "Movie has been deleted"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Movie not found"
}
```

&nbsp;

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```