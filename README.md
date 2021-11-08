# JWT-NANO

Lightweight, 0 dependency Node.js module for working with JWT (JSON web tokens)

## Getting started

## Install

```sh
npm install jwt-nano
```

If you don't want to pass the password as a param in every `decode(x)` or `encode(x)` call,
just set this key as an environment variable.(this is the default set in the methods)

```node
JWT_SECRET_SHA256_KEY = mySecretSignature;
```

## Usage

```javascript
const jwt = require("jwt-nano");

const somePayload = {
  exp: 120, // 120 seconds(2 minutes) // Default to 1 hour if not set. To disable, set to 0
  someKey: "Hello, world!",
};

// encode
const token = jwt.encode(somePayload);

if (token) {
  // do something
} else {
  // do something else
}

// decode
const payload = decode(token);

if (payload) {
  // do something
} else {
  // do something else
}
```

## Changing the environment key

If you want to change the environment key from `JWT_SECRET_SHA256_KEY` to something else,
you'll have to pass the password in each call

For the sake of simplicity, let's say you want to change the key to `mySecretKey`. In this case, you'll use it like this:

```javascript
const { encode } = require("jwt-nano");

const key = process.env.mySecretKey;

const token = encode({ message: "Hello, world!" }, key);
```

## Changing the algorithm

The default algorithm is `sha256`, but it also supports `sha512`

If you change it, you'll have to pass the key as a param as well.

Example:

```javascript
const { encode } = require("jwt-nano");

const token = encode({ message: "Hello, world!" }, mySecretKey, "sha512");
```

## Client-side

A "token" is just a string with 3 segments separated by dot(.) => "Header.Payload.Signature"

I didn't want to create another useless module for reading the payload client-side.
You can just use this:

```javascript
// this assumes you sent the token as a header with the key "x-auth-token", edit to match your needs
const [header, payload, signature] = res.headers["x-auth-token"]?.split(".");

if (!payload) return console.log(" No payload :( "); // handle accordingly

const data = JSON.parse(Buffer.from(payload, "base64url").toString());
```
