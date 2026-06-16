import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set');
}

/**
 * postgres-js connection.
 * In serverless/edge environments set `max: 1` to avoid connection exhaustion.
 * For long-running Node.js processes the default pool is fine.
 */
const queryClient = postgres(process.env.DATABASE_URL);

export const db = drizzle(queryClient, { schema });

export type Db = typeof db;
