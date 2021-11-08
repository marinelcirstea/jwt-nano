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

const JWT_SECRET_SHA256_KEY =
  process.env.JWT_SECRET_SHA256_KEY || "";

const secretKeyError = new Error(
  `Environment variable JWT_SECRET_SHA256_KEY does not exist.`
);

interface Payload {
  exp?: number; // expiry in seconds - default to 1 hour
  iat?: number; // issued at - default to Date.now()
  [key: string]: any; // any other data
}
export type EncodeResult = string | null;
export type DecodeResult = Payload | null;
/**
 * Decode and verify a JWT token.
 *
 * @returns `payload`(object) which is the data decoded from the token
 * @returns `null` if the token is null, invalid or expired
 */
export function decode(
  token: string | null,
  secretKey: any = JWT_SECRET_SHA256_KEY,
  algorithm: "sha256" | "sha512" = "sha256"
): DecodeResult {
  if (!secretKey) throw secretKeyError;
  if (!token) return null;

  const segments = token.split(".");

  if (segments.length !== 3) return null;

  if (!hasValidSignature(token, secretKey, algorithm)) return null;

  const payload: Payload = decodeBase64UrlAndParse(segments[1]);
  if (!payload) return null;

  const isExpired = payload.exp // if: exp = 0(disabled) return false, else: do the math
    ? Date.now() > (payload.iat || 0) + payload.exp * 1000 /*s -> ms*/
    : false;

  if (isExpired) return null;

  return payload;
}

/**
 * Encodes data(payload) and returns a token(string)
 *
 * @returns `token`(string) if the encoding was successfull
 * @returns `null` if the payload is empty
 */
export function encode(
  payload: Payload | null,
  secretKey: any = JWT_SECRET_SHA256_KEY,
  algorithm: "sha256" | "sha512" = "sha256"
): EncodeResult {
  if (!payload) return null;
  if (!secretKey) throw secretKeyError;

  payload.iat = payload.iat || Date.now(); // auto set "issued at" if none is provided
  payload.exp = payload.exp ?? 3600; // can be 0

  const segments = [];
  segments.push(stringifyAndEncodeBase64Url({ alg: "HS256", typ: "JWT" })); // Header
  segments.push(stringifyAndEncodeBase64Url(payload)); // Payload
  segments.push(sign(segments.join("."), secretKey, algorithm)); // Signature

  return segments.join(".");
}

// UTILS
function hasValidSignature(
  token: string,
  secretKey: string,
  algorithm: string
) {
  const [head, payload, signature] = token.split(".");
  return signature === sign(`${head}.${payload}`, secretKey, algorithm);
}

function sign(input: string, secretKey: string, algorithm: string): string {
  const base64url = createHmac(`${algorithm}`, `${secretKey}`)
    .update(input)
    .digest("base64url");

  return base64url;
}

function stringifyAndEncodeBase64Url(
  data: Payload | { alg: string; typ: string }
): string {
  return Buffer.from(JSON.stringify(data)).toString("base64url");
}

function decodeBase64UrlAndParse(str: string): any {
  return JSON.parse(Buffer.from(str, "base64url").toString());
}

export default { encode, decode };
