import { z } from 'zod';

export const addressSchema = z.object({
  addressLine: z.string().min(5, 'Address is required'),
  building: z.string().optional(),
  floor: z.string().optional(),
  apartment: z.string().optional(),
});

export const checkoutSchema = z.object({
  address: addressSchema,
  paymentMethod: z.enum(['card', 'cash']),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;
