import { z } from "zod";
import { AppointmentSchema } from "../../appointment/validators/appointment.schema";

export const ShopSchema = z.object({
  id: z.string(),
  name: z.string(),
  address: z.string(),
  phone: z.string(),
  services: z.array(z.any()).optional(),
  appointments: z.array(AppointmentSchema).optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const ShopInputSchema = z.object({
  name: z.string(),
  address: z.string(),
  phone: z.string(),
});

export const UpdateShopSchema = ShopInputSchema.partial();

export type CreateShopInput = z.infer<typeof ShopInputSchema>;
export type UpdateShopInput = z.infer<typeof UpdateShopSchema>;
export type Shop = z.infer<typeof ShopSchema>;
