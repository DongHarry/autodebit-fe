import type { ICompany } from './company'
import type { IRole } from './role'

export interface IFormUser {
  id?: number | null
  name: string
  username?: string
  email: string
  phone_number?: string
  role: string | undefined
  company_id: number | undefined
  note?: string
  status: number
}

export interface IUser {
  id: number
  name: string
  avatar?: string
  company_id: number
  creator_id: number
  editor_id: number
  email: string
  phone_number?: string
  username: string
  created_at: string
  company: ICompany
  roles?: IRole[]
  permissions?: string[]
  is_super_admin: boolean
  language?: string
}

export interface IUserDelete {
  user_ids: number[]
}
