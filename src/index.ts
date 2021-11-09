/**
 * @author  Marinel Cirstea
 * Time wasted: ~ 4 hours
 * JWT token consists of 3 segments, each separated by a dot (" . "):
 *  - Header
 *  - Payload
 *  - Signature
 * Full format: "Header.Payload.Signature"
 */

import { createHmac } from "crypto";

const JWT_SECRET_SHA256_KEY = process.env.JWT_SECRET_SHA256_KEY || "";

const secretKeyError = new Error(
  `Environment variable JWT_SECRET_SHA256_KEY does not exist.`
);

// export type Algorithm = "HS256" | "HS384" | "HS512"; // hardcoded for IDE autocompletion

const hAlg = {
  HS256: "sha256",
  HS384: "sha384",
  HS512: "sha512",
};

/**
 * Decode and verify a JWT token.
 *
 * @returns `payload`(any) which is the data decoded from the token
 * @returns `null` if the token is null, invalid or expired(if exp is set)
 */
export function decode(
  token: string,
  secretKey: any = JWT_SECRET_SHA256_KEY,
  algorithm: "HS256" | "HS384" | "HS512" = "HS256"
): any {
  if (!secretKey) throw secretKeyError;
  if (!token) return null;

  const segments = token.split(".");

  if (segments.length !== 3) return null;
  if (!hasValidSignature(token, secretKey, hAlg[algorithm])) return null;

  const payload = decodeBase64UrlAndParse(segments[1]);

  if (payload === "") return null;

  if (isObject(payload) && payload?.exp) {
    const isExpired = payload.iat // 0 / false = disabled
      ? Date.now() > payload.iat + payload.exp * 1000 /*s -> ms*/
      : false;

    if (isExpired) return null;
  }

  return payload;
}

/**
 * Encodes data(payload) and returns a token(string)
 *
 * @returns `token`(string) if the encoding was successfull
 * @returns `null` if payload === ""(0, false and null are accepted)
 */
export function encode(
  payload: any,
  secretKey: any = JWT_SECRET_SHA256_KEY,
  algorithm: "HS256" | "HS384" | "HS512" = "HS256"
): string | null {
  if (!secretKey) throw secretKeyError;
  if (payload === "") return null;

  // if user wants it empty or doesn't set an expiry, don't touch it.
  if (isObject(payload) && JSON.stringify(payload) !== "{}" && payload?.exp) {
    // if set by the user, don't touch it(unless it's set to null)
    payload.iat = payload.iat ?? Date.now();
  }

  const segments = [];
  // prettier-ignore
  segments.push(stringifyAndEncodeBase64Url({ alg: algorithm, typ: "JWT" })); // Header
  segments.push(stringifyAndEncodeBase64Url(payload)); // Payload
  segments.push(sign(segments.join("."), secretKey, hAlg[algorithm])); // Signature

  return segments.join(".");
}

function isObject(payload: any) {
  return typeof payload === "object" && !Array.isArray(payload);
}

// UTILS
// prettier-ignore
function hasValidSignature(token: string,secretKey: string,algorithm: string) {
  const [head, payload, signature] = token.split(".");
  return signature === sign(`${head}.${payload}`, secretKey, algorithm);
}

function sign(input: string, secretKey: string, algorithm: string): string {
  const base64url = createHmac(algorithm, secretKey)
    .update(input)
    .digest("base64url");

  return base64url;
}

function stringifyAndEncodeBase64Url(data: any): string {
  // looks like the official JWT website doesn't stringify strings, // https://jwt.io
  // they just create a buffer out of them..
  // we have to comply, i guess..
  if (typeof data === "string") return Buffer.from(data).toString("base64url");

  return Buffer.from(JSON.stringify(data)).toString("base64url");
}

function decodeBase64UrlAndParse(str: string): any {
  try {
    const st =JSON.parse(Buffer.from(str, "base64url").toString());
    return st;
  } catch (error) { 
    // if it fails to parse it means it's a non-stringified string,
    // (thanks to our lovely JWT creators..)
    return Buffer.from(str,"base64url").toString()
  }
}

export default { encode, decode };
