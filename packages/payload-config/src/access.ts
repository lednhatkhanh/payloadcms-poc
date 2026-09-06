import type { Access, Where } from 'payload'

export const authenticated: Access = ({ req }) => Boolean(req.user)

type RecordValue = Record<string, unknown>

function isRecord(value: unknown): value is RecordValue {
  return typeof value === 'object' && value !== null
}

function rolesForUser(user: unknown): readonly string[] {
  if (!isRecord(user) || !Array.isArray(user.roles)) return []
  return user.roles.filter((role): role is string => typeof role === 'string')
}

function relationshipId(value: unknown): number | string | undefined {
  if (typeof value === 'number' || typeof value === 'string') return value
  if (isRecord(value) && (typeof value.id === 'number' || typeof value.id === 'string')) {
    return value.id
  }
  return undefined
}

export function countryIdsForUser(user: unknown): readonly (number | string)[] {
  if (!isRecord(user) || !Array.isArray(user.countries)) return []
  return user.countries.flatMap((membership) => {
    if (!isRecord(membership)) return []
    const country = relationshipId(membership.country)
    return country === undefined ? [] : [country]
  })
}

export function isGlobalAccount(user: unknown): boolean {
  return isAdministrator(user) || (isRecord(user) && user.globalAccess === true)
}

export function isAdministrator(user: unknown): boolean {
  if (!isRecord(user)) return false
  return !Array.isArray(user.roles) || rolesForUser(user).includes('admin')
}

export function hasEditorialRole(
  user: unknown,
  role: 'editor' | 'translator' | 'reviewer' | 'publisher',
): boolean {
  return isAdministrator(user) || rolesForUser(user).includes(role)
}

export function isFormDataManager(user: unknown): boolean {
  return isAdministrator(user) || rolesForUser(user).includes('operations')
}

function countryWhere(user: unknown): Where {
  return { country: { in: countryIdsForUser(user) } }
}

function countryNewsWhere(user: unknown): Where {
  return {
    and: [{ scope: { equals: 'country' } }, countryWhere(user)],
  }
}

export const administrator: Access = ({ req }) => isAdministrator(req.user)

export const formDataManager: Access = ({ req }) => isFormDataManager(req.user)

export const editorialParticipant: Access = ({ req }) =>
  hasEditorialRole(req.user, 'editor') ||
  hasEditorialRole(req.user, 'translator') ||
  hasEditorialRole(req.user, 'reviewer') ||
  hasEditorialRole(req.user, 'publisher')

export const editorialCreator: Access = ({ req }) => hasEditorialRole(req.user, 'editor')

export const countryEditorialParticipant: Access = ({ req }) => {
  if (!editorialParticipant({ req })) return false
  return isGlobalAccount(req.user) ? true : countryNewsWhere(req.user)
}

export const countryEditorialCreator: Access = ({ req }) => {
  if (!editorialCreator({ req })) return false
  return true
}

export const countryMember: Access = ({ req }) => {
  if (!req.user) return false
  return isGlobalAccount(req.user) ? true : countryWhere(req.user)
}

export const selfOrAdministrator: Access = ({ id, req }) => {
  if (isAdministrator(req.user)) return true
  if (!isRecord(req.user)) return false
  return req.user.id === id
}

export const publicRead: Access = () => true

export const publishedOrAuthenticated: Access = ({ req }) => {
  if (req.user) return true
  return { _status: { equals: 'published' } }
}

export const publishedCountryContentOrMember: Access = ({ req }) => {
  if (!req.user) return { _status: { equals: 'published' } }
  return isGlobalAccount(req.user) ? true : countryWhere(req.user)
}

export const publishedCountryNewsOrParticipant: Access = ({ req }) => {
  if (!req.user) return { _status: { equals: 'published' } }
  if (!editorialParticipant({ req })) return false
  return isGlobalAccount(req.user) ? true : countryNewsWhere(req.user)
}

export const publicGlobalRead: Access = () => true
