# k.js
REST APIs client library

k.js is a generic client for any kind of REST API. k.js takes a JSON-format list of endpoints with possible inputs and transforms that into a set of savvy methods. 

## Getting started

Client has to be instantiated with two arguments; list of endpoints and configuration. /build/client.js is a built version.

```
var client = new Client({
  config: {
    api_url: "https://api.dribbble.com/v1/"
  },
  endpointsList: api,
  validators: validators
});
```

Where Client is imported *endpoints.js*, endpointsList is a list of endpoints, and validators (optional) is a singleton object with validator methods (see below). Example provided in /example/example.js.

## APIs

### Validators

To s
