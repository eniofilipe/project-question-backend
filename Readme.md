FORMAT: 1A
HOST: http://questionapp-backend.herokuapp.com

# API QUESTIONAPP

Documentação api QuestionApp.
Aplicação construida com o propósito de estudar e aplicar conhecimentos, dentre eles:

- NodeJs
- Express
- Axios
- Autenticação JWT
- Integração com banco de dados relacional
- API REST

# Group Session

## Session [/]

### Criar sessão [POST]

+ Request JSON Message
  
  + Attributes (object)
    + email: name@email.com (string, required)
    + password: 123456 (string, required)
        
        Number of characters greater than 5

  + Headers
        
        Content-Type: application/json
  
  + Body

        {
            "email": "name@email.com",
            "password" "123456",
        }

+ Response 200 (application/json)

    + Attributes (object)
        + user (object)
            
            + id: 10 (number)
            + name: yourname (string)
            + email: name@email.com (string)
            + avatarUrl: http://questionapp-frontend.herokuapp.com/files/ashdlaksjldakjsdlkasd.jpg (string, null)
        
         + token: tokenJWT (string)
            
            Bearer token JWT

    + Body

            {
                "user": {
                    "id": 10,
                    "name": "yourname",
                    "email": "name@email.com",
                    "avatarURL": "http://questionapp-frontend.herokuapp.com/files/ashdlaksjldakjsdlkasd.jpg"
                },
                "token": "tokenJWT"
            }

+ Response 400 (application/json)

    + Body

            "Password does not match"

+ Response 400 (application/json)

    + Body

            "User not exist"


# Group User

## User [/users]

### Create User [POST]

+ Attributes (object)

    + id: 1 (number)
    + name: yourname (string, required)
    + email: name@email.com (string, required)
    + password: 123456 (string, required)

        Number of characters greater than 5

    + passwordConfirm: 123456 (string, required)
        
        Number of characters greater than 5
    
    + avatarId: 1 (number, null)
    + url: http://questionapp-frontend.herokuapp.com/files/ashdlaksjldakjsdlkasd.jpg (string, null)

+ Request JSON Message
    
    + Headers

            Content-Type: application/json

    + Body

            {
                "name":"yourname",
                "email":"name@email.com",
                "password":"123456",
                "passwordConfirm": "123456",
                "avatarId": 1
            }

+ Response 200 (application/json)

    + Body

            {
                "id": 1,
                "name":"yourname",
                "email":"name@email.com",
                "avatarId": 1,
                "url": "http://questionapp-frontend.herokuapp.com/files/ashdlaksjldakjsdlkasd.jpg"
            }

+ Response 400 (application/json)

    + Body
            
            "User exists!"

## Users [/users/{search}]

+ Parameters 

    + search: name (string)

### List Users [GET]

+ Attributes (object)

    + User: (object)

        + id: 1 (number)
        + name: yourname (string)
        + email: name@email.com (string)
        + avatarId: 1 (number, null)
        + url: http://questionapp-frontend.herokuapp.com/files/ashdlaksjldakjsdlkasd.jpg (string, null)


+ Response 200 (application/json)

    +  Body

            {
                [array(User)]
            }


# Group Questions

# Group Avatar
