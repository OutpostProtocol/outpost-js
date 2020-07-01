import * as didJWT from 'did-jwt'
import * as Ajv from 'ajv'

import * as constants from './constants'
import { tagsSchema } from './schemas'

const { OPS } = constants
const ajv = new Ajv({})

interface UploadData {
  jwt: string
  tags: {
    'App-Name': string
    'App-Version': string
    Type: string
    Did: string
  }
}

interface OpData {
  op: string
  data: object
  iat: number // timestamp
  iss: string // issuer
}

export function validateTxData (tx: UploadData): boolean {
  checkTags(tx)

  const message: OpData = getJWTPayload(tx.jwt)

  switch (message.op) {
    case OPS.CREATE_COM:
      validateCreate(message.data)
      break
    default:
      throw new Error('Arweave Proxy Server Error: Op in request is invalid')
  }

  return true
}

function checkTags (tx: UploadData): void {
  const valid = ajv.validate(tagsSchema, tx.tags)

  if (!valid) throw new Error('Arweave Proxy Server Error: tags in transaction are invalid.')
}

function validateCreate (createData: object): void {}

const getJWTPayload = (jwt: string): OpData => didJWT.decodeJWT(jwt).payload as OpData

export { constants }
