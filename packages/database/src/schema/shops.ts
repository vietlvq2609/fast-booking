import { pgTable, text, boolean } from 'drizzle-orm/pg-core';
import { auditTimestamps } from './helpers';

export const shops = pgTable('shops', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text('name').notNull(),
  /** URL-friendly unique identifier used in booking links. */
  slug: text('slug').notNull().unique(),
  phone: text('phone'),
  address: text('address'),
  /** IANA timezone name. Default is Asia/Ho_Chi_Minh (GMT+7). */
  timezone: text('timezone').notNull().default('Asia/Ho_Chi_Minh'),
  logoUrl: text('logo_url'),
  isActive: boolean('is_active').notNull().default(true),
  ...auditTimestamps,
});
