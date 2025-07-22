import { z } from "zod";
import { AppointmentSchema } from "../../appointment/validators/appointment.schema";

export const WorkingHourSchema = z.object({
  id: z.string(),
  shopId: z.string(),
  weekDay: z.number().int(),
  openAt: z.string(),
  closeAt: z.string(),
});

export const ShopSchema = z.object({
  id: z.string(),
  name: z.string(),
  address: z.string(),
  phone: z.string(),
  services: z.array(z.any()).optional(),
  appointments: z.array(AppointmentSchema).optional(),
  workingHours: z.array(WorkingHourSchema).optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const WorkingHourInputSchema = z.object({
  weekDay: z.number().int(),
  openAt: z.string(),
  closeAt: z.string(),
});

export const ShopInputSchema = z.object({
  name: z.string(),
  address: z.string(),
  phone: z.string(),
  workingHours: z.array(WorkingHourInputSchema),
});

export const UpdateShopSchema = ShopInputSchema.partial();

export type CreateShopInput = z.infer<typeof ShopInputSchema>;
export type UpdateShopInput = z.infer<typeof UpdateShopSchema>;
export type Shop = z.infer<typeof ShopSchema>;
