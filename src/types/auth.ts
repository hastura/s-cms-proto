export type UserRole = 'super_admin' | 'company_admin' | 'manager' | 'employee'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  departmentId?: string
  teamId?: string
  avatarUrl?: string
}
