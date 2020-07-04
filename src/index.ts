import * as didJWT from 'did-jwt'
import * as Ajv from 'ajv'
import * as constants from './constants'
import * as functionTypes from './functionTypes'
import { tagsSchema, createSchema } from './schemas'

const { OPS } = constants
const ajv = new Ajv({})

interface UploadData {
  jwt: string
  tags: txTags
}

interface txTags {
  'App-Name': string
  'App-Version': string
  Type: string
  Did: string
}

interface OpData {
  op: string
  data: object
  iat: number // timestamp
  iss: string // issuer
}

export function isValidUpload (upload: UploadData): boolean {
  if (!hasValidTags(upload)) return false

  return isValidOp(upload.jwt)
}

export function isValidOp (jwt: string): boolean {
  let message

  try {
    message = getJWTPayload(jwt)
  } catch (e) {
    return false
  }

  switch (message.op) {
    case OPS.CREATE_COM:
      return validateCreate(message)
      break
    default:
      return false
  }
}

function hasValidTags (tx: UploadData): boolean {
  return ajv.validate(tagsSchema, tx.tags)
}

function validateCreate (createData: OpData): boolean {
  return ajv.validate(createSchema, createData)
}

export function getJWTPayload (jwt: string): OpData {
  return didJWT.decodeJWT(jwt).payload as OpData
}

export { constants, functionTypes }
