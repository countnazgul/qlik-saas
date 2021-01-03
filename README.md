## **UNDER DEVELOPMENT!**

## Description

NodeJS package to communicate with Qlik Sense Saas edition.

> **The official documentation about each endpoint parameters can be found on [qlik.dev](https://qlik.dev/apis#rest)**

## Install

yet to be published to `npm`

## Usage

Using the package is quite similar to [qrs-interact](https://github.com/jparis/qrs-interact)

The package expose 5 methods:

- `Get`
  - params
    - `path` (string, mandatory) (`spaces`, `spaces/space-id` etc)
- `Delete`
  - params
    - `path` (sting, mandatory)
- `Patch`
  - params
    - TBA
- `Post`
  - params
    - `path` (sting, mandatory) (`spaces`, `spaces/space-id` etc)
    - `data` (json, mandatory) (see each endpoint for the required format)
    - `contentType` (string, optional) (default is `application/json`)
- `Put`
  - params
    - `path` (sting, mandatory) (`spaces`, `spaces/space-id` etc)
    - `data` (json, mandatory) (see each endpoint for the required format)
    - `contentType` (string, optional) (default is `application/json`)

Before usage the instance should be initialized:

```javascript
let config = {
  url: `tenant.eu.qlikcloud.com`,
  token: `api-key-generated-from-the-admin-console `,
};

let saasInstance = new qlikSaas(config);
```

### Get method

```javascript
// Get all available spaces
let allSpaces = await saasInstance.Get("spaces");
```

### Delete method

```javascript
// Delete single space
let deletedSpace = await saasInstance.Delete("spaces/1a002233cdd44555566ee77f");
```

### Patch method

```javascript
/// TBA
```

### Post method

```javascript
// Create new space
let data = {
  name: "My new space",
  description: "New space for more apps",
  type: "shared",
};

let createSpace = await saasInstance.Post("spaces", data, "application/json");
```

### Put method

```javascript
// Update space
let data = {
  name: "New name for old space",
};

let updateSpace = await saasInstance.Put(
  `spaces/1a002233cdd44555566ee77f`,
  data,
  "application/json"
);
```

## Paging

When requesting data Qlik will page it by default (max 100 items can be returned in a single call). If there are more records to be returned, the package will extract them all before returning the result

## To be added

- `patch` method
- test cases (in progress)
- proper error handling
- published to `npm`
- more methods?
- more testing with the paging functionality
