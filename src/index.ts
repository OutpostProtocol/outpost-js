export const CONTRACT_SRC = 'eF0e3F3yV-r6jzNw2aH7ND4WgR7KrOU1uoUZAjVY1HI'
export const CONTRACT_ID = 'iOJmwmkP-vQxEGKe0F4fWnoU2vBP4tfoilNZzYEPLQY'

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
