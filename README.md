[![ko-fi](https://www.ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/T6T0148ZP)

## **UNDER DEVELOPMENT!**

## Description

NodeJS package to communicate with Qlik Sense Saas edition.

> **The official documentation about each endpoint parameters can be found on [qlik.dev](https://qlik.dev/apis#rest)**

## Install

`npm install qlik-saas`

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
  version: X, // optional. default is: 1
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
// TBA
```

### Post method

```javascript
// Create new space
let data = {
  name: "My new space",
  description: "New space for more apps",
  type: "shared",
};

let createSpace = await saasInstance.Post({
  path: "spaces",
  data: data,
  contentType: "application/json",
});
```

### Put method

```javascript
// Update space
let data = {
  name: "New name for old space",
};

let updateSpace = await saasInstance.Put({
  path: `spaces/1a002233cdd44555566ee77f`,
  data: data,
  contentType: "application/json",
});
```

## Paging

When requesting data Qlik will page it by default (max 100 items can be returned in a single call). If there are more records to be returned, the package will extract them all before returning the result

## Errors

- Config - to prevent configuration errors just wrap the initialization in `try ... catch` block

  ```javascript
  let saasInstance;

  try {
    saasInstance = new qlikSaas(config);
  } catch (e) {
    console.log(e.message);
  }
  ```

- Methods - once initialized each method returns `promise` and error handling can be done the usual way with `.catch()`

  ```javascript
  // Update space
  let data = {
    name: "New name for old space",
  };

  let updateSpace = await saasInstance
    .Put({
      path: `spaces/1a002233cdd44555566ee77f`,
      data,
      contentType: "application/json",
    })
    .catch(function (e) {
      // do something with the error here
      // if Qlik is raising the error then the format of the error will be { status: XXX, statusText: XXXXY, message: XXXXXXX }
      // if Qlik is NOT raising the error then the format is: { message: XXXXXXX } (no status)
    });
  ```

## Authentication

At the moment the package interact with Qlik only via `API keys`

## To be added

- [x] published to `npm`
- [ ] `patch` method
- [ ] test cases (in progress)
- [ ] proper error handling
- [ ] more methods?
- [ ] more testing with the paging functionality
- [ ] support browser based authentication headers?
- [ ] able to use the package in browsers?
