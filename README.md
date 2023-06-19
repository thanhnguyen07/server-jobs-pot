# API

## Base URL
```
https://server-jobs-pot.vercel.app/
```

# Sign Up

### End Point
```
user/signup
```
### Method
**`POST`**
###  Parameter
- **`userName`** - ***Required***

    Type: **Sting**
- **`email`** - ***Required***

    Type: **Sting** 
- **`password`** - ***Required***

    Type: **Sting**

    Recommend: ***encryption***
###  Successful Response

```
{
    "userName": "Thành Nguyễn",
    "email": "thanhjang2k@gmail.com",
    "id": "648fcb48a0f5c7c30d2ead58",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRoYW5oamFuZzJrQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiMTI3YjUwZGU2ZDAwNTRhYjAyNzI5MTUyZDNiMTMyNTQ3ODE1OTczNDMxNDNiZjM0MWE0YjIyMzMwMWExNGI5YyIsImlhdCI6MTY4NzE0NTI4OCwiZXhwIjoxNjg3MTQ4ODg4fQ.7ZssoLcjSgjJBJnDSsxoQeehmzz9irkbBPjcmuWftcc",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRoYW5oamFuZzJrQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiMTI3YjUwZGU2ZDAwNTRhYjAyNzI5MTUyZDNiMTMyNTQ3ODE1OTczNDMxNDNiZjM0MWE0YjIyMzMwMWExNGI5YyIsImlhdCI6MTY4NzE0NTI4OCwiZXhwIjoxNjg4MDA5Mjg4fQ.KVxQ4spXIgXdLof1x5fXs-lW8vwi-tJB_6Vp5DQqQ0c",
    "msg": "Sign Up Successfully!"
}
```
### Error Response

- **`Email registered`**
    ```
    {
        "msg": "Email registered!"
    }
    ```
- **`Field required`**
    ```
    {
        "msg": "userName field is required"
    }
    ```
    ```
    {
        "msg": "email field is required"
    }
    ```
    ```
    {
        "password": "userName field is required"
    }
    ```
# Sign In

### End Point
```
user/signin
```
### Method
**`POST`**
### Parameter
- **`email`** - ***Required***

    Type: **Sting**
- **`password`** - ***Required***

    Type: **Sting**

    Recommend: ***encryption***
