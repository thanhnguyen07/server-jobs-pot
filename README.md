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

## Method

**`POST`**

##  Parameter

- **`userName`** - ***Required***

    Type: **Sting**

- **`email`** - ***Required***

    Type: **Sting** 

- **`password`** - ***Required***

    Type: **Sting**

    Recommend: ***encryption***

##  Successful Response

```
{
    "userName": "Thành Nguyễn",
    "email": "thanhjang2k@gmail.com",
    "_id": "648fc519685d6441587add9d",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRoYW5oamFuZzJrQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiMTI3YjUwZGU2ZDAwNTRhYjAyNzI5MTUyZDNiMTMyNTQ3ODE1OTczNDMxNDNiZjM0MWE0YjIyMzMwMWExNGI5YyIsImlhdCI6MTY4NzE0MzcwNSwiZXhwIjoxNjg3MTQ3MzA1fQ.RdpjmKN7TEfxB0Jarztbpeo8Zyj471fFNYyYl9qZYck",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRoYW5oamFuZzJrQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiMTI3YjUwZGU2ZDAwNTRhYjAyNzI5MTUyZDNiMTMyNTQ3ODE1OTczNDMxNDNiZjM0MWE0YjIyMzMwMWExNGI5YyIsImlhdCI6MTY4NzE0MzcwNSwiZXhwIjoxNjg4MDA3NzA1fQ.LQoiZ558j57hgNxdZkuh_OBfgbnqEnzP1i1XWeGVxcN",
    "msg": "Sign Up Successfully!"
}
```
## Error Response

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

## End Point
```
user/signin
```

## Method

**`POST`**

## Parameter

- **`email`** - ***Required***

    Type: **Sting**

- **`password`** - ***Required***

    Type: **Sting**

    Recommend: ***encryption***
