import { SRC_TYPE, COM_TYPE } from './constants'

export const tagsSchema = {
  type: 'object',
  required: ['App-Name', 'App-Version', 'Did', 'Type'],
  properties: {
    'App-Name': {
      type: 'string'
    },
    'App-Version': {
      type: 'string'
    },
    Did: {
      type: 'string'
    },
    Type: {
      type: 'string',
      enum: [SRC_TYPE, COM_TYPE]
    }
  }
}

export const createSchema = {
  type: 'object',
  required: ['iat', 'op', 'community', 'iss'],
  properties: {
    iat: {
      type: 'integer'
    },
    op: {
      type: 'string'
    },
    community: {
      required: ['name', 'symbol', 'isOpen'],
      properties: {
        name: {
          type: 'string'
        },
        symbol: {
          type: 'string'
        },
        isOpen: {
          type: 'boolean'
        }
      },
      type: 'object'
    },
    iss: {
      type: 'string'
    }
  }
}
