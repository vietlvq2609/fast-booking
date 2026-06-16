import { pgEnum } from 'drizzle-orm/pg-core';

export const userRoleEnum = pgEnum('user_role', [
  'SUPER_ADMIN',
  'SHOP_OWNER',
  'SHOP_MANAGER',
  'STAFF',
]);

export const bookingStatusEnum = pgEnum('booking_status', [
  'PENDING',
  'CONFIRMED',
  'IN_PROGRESS',
  'COMPLETED',
  'CANCELLED',
  'NO_SHOW',
]);

export const paymentStatusEnum = pgEnum('payment_status', [
  'UNPAID',
  'PENDING',
  'PAID',
  'REFUNDED',
  'FAILED',
]);

export const paymentMethodEnum = pgEnum('payment_method', [
  'CASH',
  'VIETQR',
  'PAYOS',
  'SEPAY',
]);

export const dayOfWeekEnum = pgEnum('day_of_week', [
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY',
  'SUNDAY',
]);
