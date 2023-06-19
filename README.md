# API

## Base URL
```
https://server-jobs-pot.vercel.app/
```

## Sign Up

`End Point`
```
user/signup
```

`Method`

POST

`Parameter`

- `userName` - *Required*

    Type: Sting

- `email` - *Required*

    Type: Sting 

- `password` - *Required*

    Type: Sting

    Recommend: *encryption*

`Successful response`
```

```
`Error response`

- Email registered
    ```
    {
        "msg": "Email registered!"
    }
    ```
- Field required
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
## Sign In

`End Point`
```
user/signin
```

`Method`

POST

`Parameter`

- `email` - *Required*

    Type: Sting 

- `password` - *Required*

    Type: Sting

    Recommend: *encryption*
