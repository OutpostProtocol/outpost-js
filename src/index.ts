import * as didJWT from 'did-jwt'
import * as Ajv from 'ajv'

import * as constants from './constants'
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

export function isValidTx (tx: UploadData): boolean {
  if (!hasValidTags(tx)) return false

  const message = getJWTPayload(tx.jwt)

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

function getJWTPayload (jwt: string): OpData {
  return didJWT.decodeJWT(jwt).payload as OpData
}

export { constants }
