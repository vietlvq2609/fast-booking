import { z } from 'zod';

// ---------------------------------------------------------------------------
// Enums
// ---------------------------------------------------------------------------

export const BookingStatusSchema = z.enum([
  'PENDING',
  'CONFIRMED',
  'IN_PROGRESS',
  'COMPLETED',
  'CANCELLED',
  'NO_SHOW',
]);
export type BookingStatus = z.infer<typeof BookingStatusSchema>;

export const PaymentStatusSchema = z.enum([
  'UNPAID',
  'PENDING',
  'PAID',
  'REFUNDED',
  'FAILED',
]);
export type PaymentStatus = z.infer<typeof PaymentStatusSchema>;

export const PaymentMethodSchema = z.enum(['CASH', 'VIETQR', 'PAYOS', 'SEPAY']);
export type PaymentMethod = z.infer<typeof PaymentMethodSchema>;

// ---------------------------------------------------------------------------
// Create Booking
// ---------------------------------------------------------------------------

export const createBookingSchema = z.object({
  shopId: z.string().cuid(),
  customerId: z.string().cuid(),
  staffId: z.string().cuid(),
  serviceIds: z.array(z.string().cuid()).min(1),
  /// ISO-8601 string in Asia/Ho_Chi_Minh timezone – backend converts to UTC.
  startTime: z.string().datetime({ offset: true }),
  note: z.string().max(500).optional(),
  paymentMethod: PaymentMethodSchema.optional(),
});
export type CreateBookingDto = z.infer<typeof createBookingSchema>;

// ---------------------------------------------------------------------------
// Update Booking Status
// ---------------------------------------------------------------------------

export const updateBookingStatusSchema = z.object({
  status: BookingStatusSchema,
});
export type UpdateBookingStatusDto = z.infer<typeof updateBookingStatusSchema>;

// ---------------------------------------------------------------------------
// Payment Webhook (PayOS / SePay)
// ---------------------------------------------------------------------------

export const paymentWebhookSchema = z.object({
  invoiceId: z.string(),
  amount: z.number().positive(),
  status: z.enum(['SUCCESS', 'FAILED', 'CANCELLED']),
  transactionId: z.string(),
  /// Unix timestamp from the payment gateway
  paidAt: z.number().int(),
});
export type PaymentWebhookDto = z.infer<typeof paymentWebhookSchema>;
