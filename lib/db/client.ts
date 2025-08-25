// Runtime-only database connection
// This ensures database is only connected when actually needed, not during build

let dbInstance: any = null

export function getDatabase() {
  if (!dbInstance && process.env.DATABASE_URL) {
    const { drizzle } = require('drizzle-orm/neon-http')
    const { neon } = require('@neondatabase/serverless')
    const schema = require('./schema')
    
    const sql = neon(process.env.DATABASE_URL)
    dbInstance = drizzle(sql, { schema })
  }
  return dbInstance
}

export * from './schema'