import { z } from "zod";

export const AppointmentSchema = z.object({
  id: z.number().int(),
  shopId: z.string(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  customerName: z.string(),
  customerPhone: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  services: z.array(z.any()).optional(),
});

export const AppointmentInputSchema = z.object({
  shopId: z.string(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  customerName: z.string(),
  customerPhone: z.string(),
  serviceIds: z.array(z.number().int()).nonempty(),
});

export const UpdateAppointmentSchema = AppointmentInputSchema.partial();

export type CreateAppointmentInput = z.infer<typeof AppointmentInputSchema>;
export type UpdateAppointmentInput = z.infer<typeof UpdateAppointmentSchema>;
export type Appointment = z.infer<typeof AppointmentSchema>;
