import { config } from 'dotenv'
config({path:'./dev.env'})

import {encode, decode} from './src/index'

// get the password from process.env.JWT_SECRET_SHA256_KEY
// encode
const encodedWithDefaultPasswordFromEnv = encode({exp:120, message:"Hello, world!"})
console.log(encodedWithDefaultPasswordFromEnv)
// decode
const decodedWithDefaultPasswordFromEnv = decode(encodedWithDefaultPasswordFromEnv)
console.log(decodedWithDefaultPasswordFromEnv)

// set the password manually as a parameter
// encode
const encodedWithPasswordFromParam = encode({exp:120, message:"Hello, world!"}, "password")
console.log(encodedWithPasswordFromParam)
// decode
const decodedWithPasswordFromParam = decode(encodedWithPasswordFromParam,"password")
console.log(decodedWithPasswordFromParam)

// set the password and algorithm manually as parameters
// encode
const encodedWithPasswordFromParamAndSha512 = encode({exp:120, message:"Hello, world!"}, "password", "sha512")
console.log(encodedWithPasswordFromParamAndSha512)
// decode
const decodedWithPasswordFromParamAndSha512 = decode(encodedWithPasswordFromParamAndSha512,"password", "sha512")
console.log(decodedWithPasswordFromParamAndSha512)
