import { z } from "zod";

export const ServiceSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  description: z.string(),
  images: z.array(z.string()),
  consumeMinutes: z.number().int(),
  price: z.number().int().min(0),
  shopId: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const ServiceInputSchema = z.object({
  name: z.string(),
  description: z.string(),
  images: z.array(z.string()),
  consumeMinutes: z.number().int(),
  price: z.number().int().min(0),
  shopId: z.string(),
});

export const UpdateServiceSchema = ServiceInputSchema.partial();

export type CreateServiceInput = z.infer<typeof ServiceInputSchema>;
export type UpdateServiceInput = z.infer<typeof UpdateServiceSchema>;
export type Service = z.infer<typeof ServiceSchema>;
