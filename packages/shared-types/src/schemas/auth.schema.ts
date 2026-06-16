import { z } from 'zod';

// ---------------------------------------------------------------------------
// Enums (mirror Prisma enums so frontend doesn't depend on @prisma/client)
// ---------------------------------------------------------------------------

export const UserRoleSchema = z.enum([
  'SUPER_ADMIN',
  'SHOP_OWNER',
  'SHOP_MANAGER',
  'STAFF',
]);
export type UserRole = z.infer<typeof UserRoleSchema>;

// ---------------------------------------------------------------------------
// Auth
// ---------------------------------------------------------------------------

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
export type LoginDto = z.infer<typeof loginSchema>;

export const jwtPayloadSchema = z.object({
  sub: z.string().cuid(),
  shopId: z.string().cuid(),
  role: UserRoleSchema,
});
export type JwtPayload = z.infer<typeof jwtPayloadSchema>;
