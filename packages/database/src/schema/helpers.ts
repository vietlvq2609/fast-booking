import { timestamp } from 'drizzle-orm/pg-core';

/**
 * Shared audit timestamps (UTC).
 * All writes must convert from GMT+7 first.
 */
export const auditTimestamps = {
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' })
    .defaultNow()
    .notNull(),
};
