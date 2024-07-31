# createInitialUser Controller

## Description

This controller handles the creation of the initial user in the system. It checks if there are any
existing users, and if not, it creates a new user with the provided details. This includes creating
entries in the `Pessoa`, `Endereco`, and `Credencial` tables. Passwords are hashed using bcrypt
before being stored.

## Endpoint

**POST** `/create-initial-user`

## Request Body

```json
{
  "nome": "John",
  "sobrenome": "Doe",
  "cpf": "99988877755",
  "telefone": "987654321",
  "email": "john.doe@example.com",
  "password": "newpassword123",
  "logradouro": "Rua XYZ",
  "complemento": "Apto 202",
  "cidade": "São Paulo",
  "estado": "SP",
  "pais": "Brasil",
  "codigo_postal": "87654-321",
  "is_admin": true,
  "cargo": "Pesquisador"
}
```

## Responses

### Success

- **Status Code**: 201 Created
- **Body**:
  ```json
  {
    "message": "Initial user created successfully.",
    "data": {
      "id": 1,
      "nome": "João",
      "sobrenome": "Silva",
      "cpf": "00099988877",
      "telefone": "123456789",
      "cargo": "Pesquisador",
      "updatedAt": "2024-07-25T06:04:37.928Z",
      "createdAt": "2024-07-25T06:04:37.928Z",
      "logradouro": "Rua Exemplo",
      "complemento": "Apt 101",
      "cidade": "São Paulo",
      "estado": "SP",
      "pais": "Brasil",
      "codigo_postal": "12345-678",
      "pessoa_id": 1,
      "email": "joao.silva@example.com",
      "password": "",
      "is_admin": true
    }
  }
  ```

## Errors

- **Status Code**: 500 Internal Server Error

When an error occurs during the user creation process.

- **Body**:

```json
{
  "msg": "Error message"
}
```
