/**
 * @author  Marinel Cirstea
 * Time wasted: ~ 4 hours
 * JWT token consists of 3 segments, each separated by a dot (" . "):
 *  - Header
 *  - Payload
 *  - Signature
 * Full format: "Payload.Payload.Signature"
 */

 import { createHmac } from "crypto";

 const JWT_SECRET_SHA256_SIGNATURE = process.env.JWT_SECRET_SHA256_SIGNATURE;
 
 if (!JWT_SECRET_SHA256_SIGNATURE) {
   throw new Error(
     `Environment variable "JWT_SECRET_SHA256_SIGNATURE" does not exist.`
   );
 }
 
 export interface Payload {
   exp: number; //expiry in seconds
   iat?: number;
   [key: string]: any; // any other data
 }
 export type Token = string;
 
 /**
  * Decode and verify a JWT token.
  *
  * @returns `payload` which is the data decoded from the token
  */
 export function decode(token: string): Payload {
   if (!token) throw new Error("INVALID");
 
   const segments = token.split(".");
   if (segments.length !== 3 || !hasValidSignature(token)) {
     throw new Error("INTEGRITY");
   }
 
   const payload: Payload = decodeBase64UrlAndParse(segments[1]);
 
   const isExpired = <boolean>(
     (Date.now() > (payload.iat || 0) + payload.exp * 1000) /*s -> ms*/
   );
 
   if (isExpired) {
     throw new Error("EXPIRED");
   }
 
   return payload;
 }
 
 /**
  * Encodes data(payload) and returns a token(string)
  * 
  * @example
  * const token = encode({exp:3600, iat:Date.now(), message:"Hello, world!"})
  * 
  * `exp` is required
  * `iat` is optional. If iat is not provided, it will default to Date.now()
  */
 export function encode(payload: Payload): Token {
   payload.iat = payload.iat || Date.now(); // auto set "issued at" if none is provided
 
   const segments = [];
   segments.push(stringifyAndEncodeBase64Url({ alg: "HS256", typ: "JWT" })); // Header
   segments.push(stringifyAndEncodeBase64Url(payload)); // Payload
   segments.push(sign(segments.join("."))); // Signature
 
   return segments.join(".");
 }
 
 // UTILS
 function sign(input: string): string {
   const base64url = createHmac("sha256", `${JWT_SECRET_SHA256_SIGNATURE}`)
     .update(input)
     .digest("base64url");
   return base64url;
 }
 
 function hasValidSignature(token: string) {
   const [head, payload, signature] = token.split(".");
   return signature === sign(`${head}.${payload}`);
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
 