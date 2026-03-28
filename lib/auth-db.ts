import { db } from './db'

export interface User {
  id: string
  email: string
  password_hash: string
  created_at: number
  is_pro: number
}

export async function getUserByEmail(email: string): Promise<User | undefined> {
  const result = await db.execute({
    sql: 'SELECT * FROM users WHERE email = ?',
    args: [email],
  })
  return result.rows[0] as unknown as User | undefined
}

export async function getUserById(id: string): Promise<User | undefined> {
  const result = await db.execute({
    sql: 'SELECT * FROM users WHERE id = ?',
    args: [id],
  })
  return result.rows[0] as unknown as User | undefined
}

export async function isUserPro(userId: string): Promise<boolean> {
  const result = await db.execute({
    sql: 'SELECT is_pro FROM users WHERE id = ?',
    args: [userId],
  })
  const row = result.rows[0] as unknown as { is_pro: number } | undefined
  return row?.is_pro === 1
}

export async function createUser(id: string, email: string, passwordHash: string): Promise<void> {
  await db.execute({
    sql: 'INSERT INTO users (id, email, password_hash, created_at) VALUES (?, ?, ?, ?)',
    args: [id, email, passwordHash, Date.now()],
  })
}
