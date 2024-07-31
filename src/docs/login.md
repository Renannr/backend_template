# API Controller Documentation - template

## Overview

text overview

## Dependencies

- `Dependence`: why?

## Endpoints

### 1. `login`

**Method**: `POST`  
**Route**: `/login`

**Description**: desc.

**Request Body**:

```json
{
  "email": "joao.silva@example.com",
  "password": "123456"
}
```

**Response**:

- **200 OK**: data.
- **403 Forbidden**: Initial user already exists
- **500 Internal Server Error**: In case of any error during creation.

**Example Response**:

```json
{
  "token": "eyJh...",
  "nome": "João",
  "email": "joao.silva@example.com",
  "isAdmin": true
}
```

## Notes

- The token received in the login response **must be included** in the header of each subsequent
  request as a Bearer token.
