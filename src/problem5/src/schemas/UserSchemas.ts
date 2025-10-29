import { z } from 'zod';

export const createOrUpdateUserSchema = z.object({
  name: z.string().min(3, { message: 'Name must be at least 3 characters long' }).optional(),
  email: z.string().email({ message: 'Invalid email format' }).optional(),
});
export const listUserQuerySchema = z.object({
  offset: z.coerce
    .number()
    .int()
    .min(0, { message: 'Offset must be greater than or equal to 0' })
    .default(0),
  size: z.coerce
    .number()
    .int()
    .min(1, { message: 'Size must be at least 1' })
    .max(100, { message: 'Size must be at most 100' })
    .default(10),
});
