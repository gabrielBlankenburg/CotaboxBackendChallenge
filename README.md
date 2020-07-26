# Cotabox Backend Challenge

## O projeto
O projeto consiste em adicionar o percentual de participação de colaboradores em projetos. A soma das participações de cada colaborador não pode passar de 100%.

## Depêndencias
1. Ter o Node v10 instalado (ou superior).
2. Ter rodando um banco de dados mongo.

## Configurando
1. Clone esse repositório:
 ```bash
 git clone https://github.com/gabrielBlankenburg/CotaboxBackendChallenge.git
 ```

2. Crie o arquivo `.env` e configure:
```bash
cp .env.example .env
```
E em seguida coloque o endereço do mongo e o secret da aplicação (ou deixe o valor default para teste).

3. Instale as dependências:
```bash
npm install
```

4. Execute o projeto:
```bash
npm run dev
```

5. Abra `localhost:3000`.

## Estrutura

### Controllers
Recebe a requisição e retorna uma resposta.

### Dependency Injection Factory
Aqui é onde carrega todas as classes com dependencias, assim não é necessário instânciar nenhuma classe dentro de outra. Com isso podemos mockar com mais facilidade os testes e observar melhor quantas dependencias uma classe tem.

### Errors
Classes de erros, utilizado pelo middleware que cuida dos erros.

### Helpers
Classes com funcionalidades adicionais às classes existentes. Possurem também os Formatters, que formatam todas as respostas dos endpoints de Users e Projects.

### Middlewares
Classes de middlewares, onde validamos as requisições, autenticações e lidamos com possíveis erros.

### Models
Possuem as entidades (Representação de uma collection) e os Schemas para acessar o mongo.

### Services 
Trata os dados recebidos pelos controllers.

## Endpoints

### Login

* URL:
    /v1/auth/login/

* Method:
    POST

* Body:
    email: Um email válido e único no sistema.
    password: A senha do usuário.

* Success Response Sample:
    *Code* 200
    ```
    {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMWJhOWY4N2Y3MWU0ZDg4NWIyYzkwNCIsImlhdCI6MTU5NTc4Mzk2OSwiZXhwIjoxNTk1ODcwMzY5fQ.Y-p67l7NWcp-k-S10U-M6Wy7pwlv0lsV6gD6ExE0c4c",
        "firstName": "User",
        "lastName": "Test",
        "email": "user@email.com"
    }
    ```
* Error Response Sample:
    *Code* 401 UNAUTHORIZED
    ```
    {
        "error": "Unauthenticated",
        "message": "Email and password don't match"
    }
    ```

* Notes:
    * Em caso de sucesso, o valor de token deve ser utilizado no header x-access-token nas requisições que exigem autenticação.

### Create New User
* URL:
    /v1/users/create/

* Method:
    POST

* Body:
    email: Um email válido e único no sistema.
    firstName: Nome.
    lastName: Sobrenome.
    password: A senha do usuário.

* Success Response Sample:
    *Code* 200
    ```
    {
        "email": "user@email.com",
        "firstName": "User",
        "lastName": "Tester",
        "password": "123456"
    }
    ```

* Error Response Sample:
    *Code* 400 BAD REQUEST
    ```
    {
        "error": "Invalid Information",
        "message": "This email is already registered at the platform."
    }
    ```

### Get All Users
* URL:
    /v1/users/

* Method:
    GET

* Headers:
    * x-access-token: <TOKEN>

* Success Response Sample:
    *Code* 200
    ```
    [
        {
            "id": "5f1ba9f87f71e4d885b2c904",
            "email": "user@email.com",
            "firstName": "User",
            "lastName": "Tester"
        },
        {
            "id": "5f1baac61e21b5d89fc34228",
            "email": "another_user@email.com",
            "firstName": "Another",
            "lastName": "User"
        },
    ]
    ```

* Error Response Sample:
    *Code* 401 UNAUTHORIZED
    ```
    {
        "error": "Invalid Token."
    }
    ```

### Get an User
* URL:
    /v1/users/:id

* Params:
    * id: ID do usuário desejado.

* Method:
    GET

* Headers:
    * x-access-token: <TOKEN>

* Success Response Sample:
    *Code* 200
    ```
    {
        "id": "5f1ba9f87f71e4d885b2c904",
        "email": "user@email.com",
        "firstName": "User",
        "lastName": "Test"
    }
    ```

* Error Response Sample:
    *Code* 401 UNAUTHORIZED
    ```
    {
        "error": "Invalid Token."
    }
    ```

    OR 

    *Code* 404 NOT FOUND
    ```
    {
        "error": "Not Found",
        "message": "User Not Found."
    }
    ```

### Update an User
* URL:
    /v1/users/:id

* Params:
    * id: ID do usuário desejado.

* Method:
    PUT

* Body:
    email: Um email válido e único no sistema.
    firstName: Nome.
    lastName: Sobrenome.

* Headers:
    * x-access-token: <TOKEN>

* Success Response Sample:
    *Code* 200
    ```
    {
        "id": "5f1ba9f87f71e4d885b2c904",
        "email": "user@email.com",
        "firstName": "User",
        "lastName": "Test"
    }
    ```

* Error Response Sample:
    *Code* 401 UNAUTHORIZED
    ```
    {
        "error": "Invalid Token."
    }
    ```

    OR 

    *Code* 404 NOT FOUND
    ```
    {
        "error": "Not Found",
        "message": "User Not Found."
    }
    ```

    OR
    
    *Code* 400 BAD REQUEST
    ```
    {
        "error": "Invalid Information",
        "message": "This email is already registered at the platform."
    }
    ```

### Delete an User
* URL:
    /v1/users/:id

* Params:
    * id: ID do usuário desejado.

* Method:
    DELETE

* Headers:
    * x-access-token: <TOKEN>

* Success Response Sample:
    *Code* 200
    ```
    {
        "id": "5f1ba9f87f71e4d885b2c904",
        "email": "user@email.com",
        "firstName": "User",
        "lastName": "Test"
    }
    ```

* Error Response Sample:
    *Code* 401 UNAUTHORIZED
    ```
    {
        "error": "Invalid Token."
    }
    ```

    OR 

    *Code* 404 NOT FOUND
    ```
    {
        "error": "Not Found",
        "message": "User Not Found."
    }
    ```

### Get All Projects
* URL:
    /v1/projects/

* Method:
    GET

* Headers:
    * x-access-token: <TOKEN>

* Success Response Sample:
    *Code* 200
    ```
    [
        {
            "id": "5f1baac61e21b5d89fc34228",
            "name": "Proj",
            "userParticipation": [
                {
                    "id": "5f1bb47042dc43da4b91ffc4",
                    "firstName": "Marcos",
                    "lastName": "Almeida",
                    "participation": 50
                },
                {
                    "id": "5f1bb47442dc43da4b91ffc6",
                    "firstName": "Matheus",
                    "lastName": "Da Silva",
                    "participation": 50
                },
            ]
        },
        {
            "id": "5f1c7abb53d723dbb79f3dd2",
            "name": "Project Test",
            "userParticipation": [
                {
                    "id": "5f1cbbf7617aecdeb046377a",
                    "firstName": "Roberto",
                    "lastName": "Pereira",
                    "participation": 80
                },
                {
                    "id": "5f1cbbff617aecdeb046377b",
                    "firstName": "Jose",
                    "lastName": "Da Silva",
                    "participation": 20
                }
            ]
        }
    ]
    ```

* Error Response:
    *Code* 401 UNAUTHORIZED
    ```
    {
        "error": "Invalid Token."
    }
    ```

### Get a Project
* URL:
    /v1/projects/:id

* Params:
    * id: ID do projeto desejado.

* Method:
    GET

* Headers:
    * x-access-token: <TOKEN>

* Success Response Sample:
    *Code* 200
    ```
    {
        "id": "5f1c7abb53d723dbb79f3dd2",
        "name": "Project Test",
        "userParticipation": [
            {
                "id": "5f1cbbf7617aecdeb046377a",
                "firstName": "Roberto",
                "lastName": "Pereira",
                "participation": 80
            },
            {
                "id": "5f1cbbff617aecdeb046377b",
                "firstName": "Jose",
                "lastName": "Da Silva",
                "participation": 20
            }
        ]
    }
    ```

* Error Response Sample:
    *Code* 401 UNAUTHORIZED
    ```
    {
        "error": "Invalid Token."
    }
    ```

    OR
    
    *Code* 404 NOT FOUND 
    ```
    {
        "error": "Not Found",
        "message": "Project Not Found"
    }
    ```

### Create a new Project
* URL:
    /v1/projects/

* Method:
    POST

* Body:
    name: Nome do Projeto.

* Headers:
    * x-access-token: <TOKEN>

* Success Response Sample:
    *Code* 200
    ```
    {
        "id": "5f1c7abb53d723dbb79f3dd2",
        "name": "Project Test",
        "userParticipation": []
    }
    ```

* Error Response Sample:
    *Code* 401 UNAUTHORIZED
    ```
    {
        "error": "Invalid Token."
    }
    ```

### Add an User Participation to a Project
* URL:
    /v1/projects/:id/participation/

* Params:
    * id: ID do projeto desejado.

* Method:
    POST

* Body:
    firstName: Nome do Usuário.
    lastName: Sobrenome do Usuário.
    participation: Porcentagem de participação do usuário no projeto.

* Headers:
    * x-access-token: <TOKEN>

* Success Response Sample:
    *Code* 200
    ```
    {
        "id": "5f1c7abb53d723dbb79f3dd2",
        "name": "Project Test",
        "userParticipation": [
            {
                "id": "5f1cbbff617aecdeb046377b",
                "firstName": "Jose",
                "lastName": "Da Silva",
                "participation": 20
            }
        ]
    }
    ```

* Error Response Sample:
    *Code* 401 UNAUTHORIZED
    ```
    {
        "error": "Invalid Token."
    }
    ```
    
    OR
    
    *Code* 404 NOT FOUND 
    ```
    {
        "error": "Not Found",
        "message": "Project Not Found"
    }
    ```

    OR
    
    *Code* 400 BAD REQUEST
    ```
    {
        "error": "Invalid Information",
        "message": "Participation sum cannot be higher than 100."
    }
    ```

* Note
    - A soma de todas as porcentagens de participações de usuários não pode passar de 100

### Update a Project
* URL:
    /v1/projects/:id

* Params:
    * id: ID do projeto desejado.

* Method:
    PUT

* Body:
    name: Nome do Projeto.

* Headers:
    * x-access-token: <TOKEN>

* Success Response Sample:
    *Code* 200
    ```
    {
        "id": "5f1c7abb53d723dbb79f3dd2",
        "name": "Project Test",
        "userParticipation": []
    }
    ```

* Error Response Sample:
    *Code* 401 UNAUTHORIZED
    ```
    {
        "error": "Invalid Token."
    }
    ```
    
    OR

    *Code* 404 NOT FOUND 
    ```
    {
        "error": "Not Found",
        "message": "Project Not Found"
    }
    ```

### Update a Project Participation
* URL:
    /v1/projects/:id/participation/:participationId

* Params:
    * id: ID do projeto desejado.
    * participationId: ID da participação do usuário.

* Method:
    PUT

* Body:
    firstName: Nome do Usuário.
    lastName: Sobrenome do Usuário.
    participation: Porcentagem de participação do usuário no projeto.

* Headers:
    * x-access-token: <TOKEN>

* Success Response Sample:
    *Code* 200
    ```
    {
        "id": "5f1c7abb53d723dbb79f3dd2",
        "name": "Project Test",
        "userParticipation": [
            {
                "id": "5f1cbbff617aecdeb046377b",
                "firstName": "Jose",
                "lastName": "Da Silva",
                "participation": 20
            }
        ]
    }
    ```

* Error Response Sample:
    *Code* 401 UNAUTHORIZED
    ```
    {
        "error": "Invalid Token."
    }
    ```
    
    OR

    *Code* 404 NOT FOUND 
    ```
    {
        "error": "Not Found",
        "message": "Project Not Found"
    }
    ```
    
    OR

    *Code* 400 BAD REQUEST
    ```
    {
        "error": "Invalid Information",
        "message": "Participation sum cannot be higher than 100."
    }
    ```

### Delete a Project
* URL:
    /v1/projects/:id

* Params:
    * id: ID do projeto desejado.

* Method:
    DELETE

* Headers:
    * x-access-token: <TOKEN>

* Success Response Sample:
    *Code* 200
    ```
    {
        "id": "5f1c7abb53d723dbb79f3dd2",
        "name": "Project Test",
        "userParticipation": [
            {
                "id": "5f1cbbff617aecdeb046377b",
                "firstName": "Jose",
                "lastName": "Da Silva",
                "participation": 20
            }
        ]
    }
    ```

* Error Response Sample:
    *Code* 401 UNAUTHORIZED
    ```
    {
        "error": "Invalid Token."
    }
    ```
    
    OR

    *Code* 404 NOT FOUND 
    ```
    {
        "error": "Not Found",
        "message": "Project Not Found"
    }
    ```

### Delete an User Participation
* URL:
    /v1/projects/:id/participation/:participationId

* Params:
    * id: ID do projeto desejado.
    * participationId: ID da participação do usuário.

* Method:
    DELETE

* Headers:
    * x-access-token: <TOKEN>

* Success Response Sample:
    *Code* 200
    ```
    {
        "id": "5f1c7abb53d723dbb79f3dd2",
        "name": "Project Test",
        "userParticipation": [
            {
                "id": "5f1cbbff617aecdeb046377b",
                "firstName": "Jose",
                "lastName": "Da Silva",
                "participation": 20
            }
        ]
    }
    ```

* Error Response Sample:
    *Code* 401 UNAUTHORIZED
    ```
    {
        "error": "Invalid Token."
    }
    ```
    
    OR

    *Code* 404 NOT FOUND 
    ```
    {
        "error": "Not Found",
        "message": "Project Not Found"
    }
    ```

