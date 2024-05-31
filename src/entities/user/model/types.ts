export type User = {
  id: string,
  avatar: string | undefined,
  name: string,
  password: string,
  role: 'ADMIN' | 'USER'
}