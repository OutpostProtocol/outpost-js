export const CONTRACT_SRC = 'a3vdjXrmSyF6zrSOO-ddeXuGuWpJ-3SCfOWkh9ms4cY'
export const PROD_CONTRACT_ID = 'BXCEBKTv-Fvan0m82aEi7njdnRsFDluFkfN8vrWG5FI'
export const DEV_CONTRACT_ID = 'tynArDso6PKe7h1uRfu8jS7XHhTYRJQhqVRExAi0bqU'

export const ROLES = {
  OWNER: 'OWNER',
  ADMIN: 'ADMIN',
  MODERATOR: 'MODERATOR',
  MEMBER: 'MEMBER'
}

export function createInitState (did, name, isOpen) {
  const initState = {
    name,
    isOpen,
    guidelines: null,
    owner: did,
    admins: {},
    moderators: {},
    members: {},
    children: {},
    timestamps: {}
  }

  initState.admins[did] = true
  initState.moderators[did] = true
  initState.members[did] = true

  return initState
}
