# API Controller Documentation - template

## Overview

text overview

## Dependencies

- `Dependence`: why?

## Endpoints

### 1. `endpoint name`

**Method**: `GET`  
**Route**: `/route`

**Description**: desc.

**Response**:

- **200 OK**: Returns data.
- **500 Internal Server Error**: In case of any error during retrieval.

**Example Response**:

```json
[
    {foo: baa},
    {foo: baa}
]
```

### 2. `endpoint name`

**Method**: `POST`  
**Route**: `/route`

**Description**: desc.

**Request Body**:

```json
{
  "foo": "baa"
}
```

**Response**:

- **201 Created**: data.
- **409 Conflict**: why?.
- **500 Internal Server Error**: In case of any error during creation.

**Example Response**:

```json
{
  "msg": "foo"
}
```

### 3. `endpoint name`

**Method**: `PUT`  
**Route**: `/rout`

**Description**: desc.

**Request Body**:

```json
{
  "foo": "baa"
}
```

**Response**:

- **200 OK**: data.
- **404 Not Found**: why?.
- **500 Internal Server Error**: In case of any error during update.

**Example Response**:

```json
{
  "foo": "baa"
}
```

### 4. `endpoint name`

**Method**: `DELETE`  
**Route**: `/rout`

**Description**: desc

**Request Body**:

```json
{
  "foo": "baa"
}
```

**Response**:

- **200 OK**: data.
- **404 Not Found**: why?.
- **500 Internal Server Error**: In case of any error during deletion.

**Example Response**:

```json
{
  "foo": "baa"
}
```

## Notes

- notes.
- another notes.
