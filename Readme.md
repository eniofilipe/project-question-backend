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

+ Request Criar Sessão

  + Headers
        
        Content-Type: application/json
  
  + Attributes (SessionCreate)

+ Response 200 (application/json)

   + Attributes (SessionCreated) 

+ Response 400 (application/json)

    + Body

            "Password does not match"

+ Response 400 (application/json)

    + Body

            "User not exist"


# Group User

## User [/users]

### Create User [POST]
+ Request Create User
    
    + Headers

            Content-Type: application/json

    + Attributes (UserCreate)


+ Response 200 (application/json)

    + Attributes (User)

+ Response 400 (application/json)

    + Body
            
            "User exists!"

## Users [/users/{search}]

+ Parameters 

    + search: name (string) - Filtro de pesquisa de usuários

### List Users [GET]

+ Response 200 (application/json)

    + Attributes (array[User])


# Group Questions

## Question [/questions]

### Make a Question [POST]

+ Request Make a Question

    + Attributes (CreateQuestion)

+ Response 200 (application/json)

    + Body

            "Question send!"

## Reply [/questions/{authorId}/{id}]

+ Parameters

    + authorId: 15 (number, required) - Id do usuário vinculado com a pergunta
    + id: 5 (number, required) - Id pergunta

### Make a Reply [PUT]

+ Request Make a Reply

    + Attributes

        + reply: resposta (string) - Resposta da pergunta
        + token: Bearer token (string) - Token JWT
    
    + Headers

            Authorization: token

    + Body

            {
                "reply": "resposta"
            }

+ Response 200

    + Attributes (Question)

+ Response 401

    + Body 

            "Not Permited"

+ Response 400

    + Body 

            "Question does not exist"

+ Response 401

    + Body 

            "Reply exists"

## List Questions Public [/questions/public/{authorId}]

+ Parameters

    + authorId: 1 (number, required) - Id do usuário

### List Questions User [GET]

+ Response 200 

    + Attributes (array[Question])

## List Question Not Ansewered [/questions/{authorId}]

+ Parameters

    + authorId: 1 (number, required) - Id do usuário

### List Questions User Not Ansewered [GET]

+ Request List Questions

    + Attributes
       
       + token: Bearer token (string) - Token JWT
    
    + Headers

            Authorization: token

+ Response 200 

    + Attributes (array[Question])

## List Question Not Ansewered [/questions/{authorId}/all]

+ Parameters

    + authorId: 1 (number, required) - Id do usuário

### List Questions User Not Ansewered [GET]

+ Request List Questions

    + Attributes
       
       + token: Bearer token (string) - Token JWT
    
    + Headers

            Authorization: token

+ Response 200 

    + Attributes (array[Question])

# Group Avatar

## Avatar [/files/{path}]

+ Parameters

    + path: nomedoavatar.jpg (string) - Nome do avatar

### Get Avatar [GET]

+ Response 200 (MultipartForm)

+ Response 404
    + Body
        
            Cannot GET /files/nomedoavatar.jpg

## Add Avatar [/avatar]

### Upload Avatar [POST]

+ Request Upload Avatar

    + Headers

            Content-Type: multipart/form-data
    
    + Attributes (AvatarFile)

+ Response 200

    + Attributes (Avatar)

# Data Structures

## User (object)
+ id (number) - Id do usuário
+ name (string) - Nome do usuário
+ email (string) - Email do usuário
+ avatarId (number) - Id do avatar do usuário 
+ url (string) - Url do avatar do usuário

## UserCreate (User)
+ password (string) - Senha do usuário
+ passwordConfirm (string) - Confirmação de senha do usuário

## SessionCreate (object)
+ email (string) - Email do usuário
+ password (string) - Senha do usuário

## SessionCreated (object)
+ user (User) - Dados do usuário
+ token (string) - Token JWT

## Avatar (object)
+ id (number) - Id do avatar
+ path (string) - Nome do avatar
+ url (string) - Url do avatar

## AvatarFile (Multipart)
+ avatar (File) - Arquivo de imagem do avatar

## Question (object)
+ id (number) - Id da pergunta
+ body (string) - Corpo da pergunta
+ authorId (number) - Id do usuário viculado com a pergunta
+ reply (string) - Resposta da pergunta

## CreateQuestion (object)
+ authorId (number) - Id do usuário viculado com a pergunta
+ body (string) - Corpo da pergunta