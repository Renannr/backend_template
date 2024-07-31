# API Controller Documentation - ValidateToken

## Overview

This document provides an overview and detailed information about the `validateToken` endpoint,
which is responsible for validating JSON Web Tokens (JWT) to ensure their authenticity and
expiration status.

## Dependencies

- `jsonwebtoken`: Used to verify the authenticity and expiration of the JWT.
- `dotenv`: Loads environment variables from a `.env` file into `process.env`.

## Endpoints

### 1. `validateToken`

**Method**: `POST`  
**Route**: `/check-token`

**Description**: Validates the provided JWT to check if it is valid or expired.

**Request Body**:

```json
{
  "token": "your_jwt_token"
}
```

**Response**:

- **200 OK**: Returns the decoded token if valid.
- **401 Unauthorized**:
  - If the token is expired, returns a message: `{"msg": "Token expired"}`.
  - If the token is invalid, returns a message: `{"msg": "Token invalid"}`.
- **500 Internal Server Error**: In case of any error during the validation process.

**Example Response**:

- **200 OK**:

```json
{
  "email": "user@example.com",
  "iat": 1595827027,
  "exp": 1595913427
}
```

- **401 Unauthorized** (Token expired):

```json
{
  "msg": "Token expired"
}
```

- **401 Unauthorized** (Token invalid):

```json
{
  "msg": "Token invalid"
}
```

- **500 Internal Server Error**:

```json
{
  "msg": "An error occurred during token validation"
}
```

## Notes

- Ensure the `token` field in the request body contains a valid JWT.
- The secret key for JWT verification should be stored in the environment variable `JWT_SECRET`.
- Use this endpoint to validate tokens before allowing access to protected routes.
