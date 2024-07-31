# API Controller Documentation - Pessoa

## Overview

This controller manages CRUD operations for `Pessoa`, including handling associated `Endereco` and
`Credencial` records. It provides functionality for listing, creating, updating, and deleting
persons and their credentials.

## Dependencies

- `db`: Sequelize models and database connection
- `bcrypt`: For hashing passwords

## Endpoints

### 1. `listPessoa`

**Method**: `GET`  
**Route**: `/pessoas`

**Description**: Retrieves all persons along with their associated addresses and credentials.

**Response**:

- **200 OK**: Returns a list of persons with their associated address and credential data.
- **500 Internal Server Error**: In case of any error during retrieval.

**Example Response**:

```json
[
  {
    "id": 1,
    "nome": "João",
    "sobrenome": "Silva",
    "cpf": "00099988877",
    "telefone": "123456789",
    "cargo": "Pesquisador",
    "createdAt": "2024-07-25T06:04:37.921Z",
    "updatedAt": "2024-07-25T06:04:37.921Z",
    "deletedAt": null,
    "Enderecos": [
      {
        "logradouro": "Rua Exemplo",
        "complemento": "Apt 101",
        "cidade": "São Paulo",
        "estado": "SP",
        "pais": "Brasil",
        "codigo_postal": "12345-678"
      }
    ],
    "Credencial": {
      "email": "joao.silva@example.com",
      "is_admin": true
    }
  }
]
```

### 2. `indexPessoa`

**Method**: `GET`  
**Route**: `/pessoas/:id`

**Description**: Retrieves a persons along with their associated addresses and credentials.

**Response**:

- **200 OK**: Returns a list of persons with their associated address and credential data.
- **500 Internal Server Error**: In case of any error during retrieval.

**Example Response**:

```json
[
  {
    "id": 1,
    "nome": "João",
    "sobrenome": "Silva",
    "cpf": "00099988877",
    "telefone": "123456789",
    "cargo": "Pesquisador",
    "createdAt": "2024-07-25T06:04:37.921Z",
    "updatedAt": "2024-07-25T06:04:37.921Z",
    "deletedAt": null,
    "Enderecos": [
      {
        "logradouro": "Rua Exemplo",
        "complemento": "Apt 101",
        "cidade": "São Paulo",
        "estado": "SP",
        "pais": "Brasil",
        "codigo_postal": "12345-678"
      }
    ],
    "Credencial": {
      "email": "joao.silva@example.com",
      "is_admin": true
    }
  }
]
```

### 3. `storePessoa`

**Method**: `POST`  
**Route**: `/pessoas`

**Description**: Creates a new person, including their address and credentials.

**Request Body**:

```json
{
  "nome": "Maria",
  "cpf": "88877766655",
  "sobrenome": "Silva",
  "telefone": "123456789",
  "cargo": "Pesquisador",

  "logradouro": "Rua Exemplo",
  "complemento": "Apt 101",
  "cidade": "São Paulo",
  "estado": "SP",
  "pais": "Brasil",
  "codigo_postal": "12345-678",

  "password": "123456",
  "email": "maria.teste@example.com",
  "is_admin": true
}
```

**Response**:

- **201 Created**: Person created successfully.
- **409 Conflict**: Person already exists.
- **500 Internal Server Error**: In case of any error during creation.

**Example Response**:

```json
{
  "msg": "Pessoa criada com sucesso",
  "data": {
    "id": 2,
    "nome": "Maria",
    "sobrenome": "Silva",
    "cpf": "88877766655",
    "telefone": "123456789",
    "cargo": "Pesquisador",
    "updatedAt": "2024-07-25T05:58:45.579Z",
    "createdAt": "2024-07-25T05:58:45.579Z",
    "logradouro": "Rua Exemplo",
    "complemento": "Apt 101",
    "cidade": "São Paulo",
    "estado": "SP",
    "pais": "Brasil",
    "codigo_postal": "12345-678",
    "pessoa_id": 2,
    "email": "maria.test2e@example.com",
    "password": "$2b$10$OPf7.....",
    "is_admin": true
  }
}
```

### 4. `updatePessoa`

**Method**: `PUT`  
**Route**: `/pessoas`

**Description**: Updates an existing person's details, including their address and credentials.

**Request Body**:

```json
{
  "pessoa_id": 2,
  "nome": "Mariana",
  "cpf": "88877766644",
  "sobrenome": "Silva",
  "telefone": "123456789",
  "cargo": "Pesquisador",

  "logradouro": "Rua Exemplo",
  "complemento": "Apt 101",
  "cidade": "São Paulo",
  "estado": "SP",
  "pais": "Brasil",
  "codigo_postal": "12345-678",

  "password": "123456",
  "email": "maria.silva@example.com",
  "is_admin": true
}
```

**Response**:

- **200 OK**: Person updated successfully.
- **404 Not Found**: Person not found.
- **500 Internal Server Error**: In case of any error during update.

**Example Response**:

```json
{
  "msg": "Pessoa id: 2 atualizada com sucesso",
  "updated_data": {
    "pessoa": {
      "id": 2,
      "nome": "Mariana",
      "sobrenome": "Silva",
      "cpf": "88877766644",
      "telefone": "123456789",
      "cargo": "Pesquisador",
      "createdAt": "2024-07-25T06:12:44.146Z",
      "updatedAt": "2024-07-25T06:12:47.134Z",
      "deletedAt": null
    },
    "endereco": {
      "id": 2,
      "logradouro": "Rua Exemplo",
      "complemento": "Apt 101",
      "cidade": "São Paulo",
      "estado": "SP",
      "pais": "Brasil",
      "codigo_postal": "12345-678",
      "createdAt": "2024-07-25T06:12:44.149Z",
      "updatedAt": "2024-07-25T06:12:44.149Z",
      "deletedAt": null,
      "pessoa_id": 2
    }
  }
}
```

### 4. `removePessoa`

**Method**: `DELETE`  
**Route**: `/pessoas`

**Description**: Deletes a person and their associated address and credentials based on the provided
email.

**Request Body**:

```json
{
  "cpf": "00099988877"
}
```

**Response**:

- **200 OK**: Person deleted successfully.
- **404 Not Found**: Person or credential not found.
- **500 Internal Server Error**: In case of any error during deletion.

**Example Response**:

```json
{
  "msg": "Usuário João deletado com sucesso"
}
```

### 5. `removeCredencial`

**Method**: `DELETE`  
**Route**: `/credenciais`

**Description**: Deletes credentials based on the provided email.

**Request Body**:

```json
{
  "email": "john.doe@example.com"
}
```

**Response**:

- **200 OK**: Credentials deleted successfully.
- **404 Not Found**: Credentials not found.
- **500 Internal Server Error**: In case of any error during deletion.

**Example Response**:

```json
{
  "msg": "Credenciais para john.doe@example.com deletada com sucesso"
}
```

## Error Handling

- All errors are logged to the console.
- Responses include a JSON object with an `"msg"` field describing the error.

## Notes

- Ensure transactions are handled properly to maintain database integrity.
- Passwords are hashed using `bcrypt` before being saved to the database.
