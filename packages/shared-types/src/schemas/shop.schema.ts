import { z } from 'zod';

// ---------------------------------------------------------------------------
// Shop
// ---------------------------------------------------------------------------

export const createShopSchema = z.object({
  name: z.string().min(2).max(100),
  slug: z
    .string()
    .min(2)
    .max(60)
    .regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'),
  phone: z.string().regex(/^(\+84|0)[0-9]{9}$/, 'Invalid Vietnamese phone number').optional(),
  address: z.string().max(255).optional(),
  timezone: z.string().default('Asia/Ho_Chi_Minh'),
});
export type CreateShopDto = z.infer<typeof createShopSchema>;

// ---------------------------------------------------------------------------
// Service
// ---------------------------------------------------------------------------

export const createServiceSchema = z.object({
  name: z.string().min(2).max(100),
  description: z.string().max(500).optional(),
  durationMin: z.number().int().min(5).max(480),
  price: z.number().nonnegative(),
});
export type CreateServiceDto = z.infer<typeof createServiceSchema>;

// ---------------------------------------------------------------------------
// Customer
// ---------------------------------------------------------------------------

export const createCustomerSchema = z.object({
  name: z.string().min(1).max(100),
  phone: z.string().regex(/^(\+84|0)[0-9]{9}$/, 'Invalid Vietnamese phone number'),
  email: z.string().email().optional(),
  note: z.string().max(500).optional(),
});
export type CreateCustomerDto = z.infer<typeof createCustomerSchema>;
