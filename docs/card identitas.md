# Product API Spec

## Create Product API

Endpoint: POST /api/products

Headers :

- Authorization : token

Request Body:

```json
{
  "name": "ugan",
  "nik": "2020202023",
  "tempatlahir": "sukabumi",
  "jeniskelamin": "lakilaki",
  "alamat": "cibadak",
  "agama": "islam"
}
```

Response Body Success:

```json
{
  "data": {
    "id": 1,
    "name": "ugan",
    "nik": "2020202023",
    "tempatlahir": "sukabumi",
    "jeniskelamin": "lakilaki",
    "alamat": "cibadak",
    "agama": "islam"
  }
}
```

Response Body Error:

```json
{
  "error": " invalid"
}
```

## Update Product API

Endpoint: PUT /api/products/:id

Headers :

- Authorization : token

Request Body:

```json
{
  "name": "ugan",
  "nik": "2020202023",
  "tempatlahir": "sukabumi",
  "jeniskelamin": "lakilaki",
  "alamat": "cibadak",
  "agama": "islam"
}
```

Response Body Success:

```json
{
  "data": {
    "name": "update erik",
    "nik": "2020202021",
    "tempatlahir": "sukabumi",
    "jeniskelamin": "lakilaki",
    "alamat": "cibadak",
    "agama": "islam"
  }
}
```

Response Body Error:

```json
{
  "error": "invalid"
```

## Get Product API

Endpoint: GET /api/products/:id

Headers :

- Authorization : token

Response Body Success:

```json
{
  "data": {
    "name": "update erik",
    "nik": "2020202021",
    "tempatlahir": "sukabumi",
    "jeniskelamin": "lakilaki",
    "alamat": "cibadak",
    "agama": "islam"
  }
}
```

Response Body Error:

```json
{
  "errors": "identitas tidak valid..."
}
```

## Search Product API

Endpoint: GET /api/products/:id

Headers :

- Authorization : token

Query params :

- name : Search by name, using like, optional
- price : Search by price, using like, optional
- category : Search by category, using like, optional
- page : number of page. dafault 1
- size : size per page, default 10

Response Body Success:

```json
{
  "data": [
    {
      "id": 1,
      "name": "update erik",
      "nik": "2020202021",
      "tempatlahir": "sukabumi",
      "jeniskelamin": "lakilaki",
      "alamat": "cibadak",
      "agama": "islam"
    },
    {
      "id": 2,
      "name": "update erik",
      "nik": "2020202021",
      "tempatlahir": "sukabumi",
      "jeniskelamin": "lakilaki",
      "alamat": "cibadak",
      "agama": "islam"
    }
  ],
  "paging": {
    "page": 1,
    "total_page": 3,
    "total_item": 30
  }
}
```

Response Body Error:

```json

```

## Remove Product API

Endpoint: DELETE /api/products/:id

Headers :

- Authorization : token

Response Body Success:

```json
{
  "data": "OK"
}
```

Response Body Error:

```json
{
  "errors": "identitas ditemukan"
}
```
