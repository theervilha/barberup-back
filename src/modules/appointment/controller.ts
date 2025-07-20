import { Request, Response } from "express";
import { AppointmentService } from "./service";
import { AppointmentRepository } from "./repository";
import {
  AppointmentInputSchema,
  UpdateAppointmentSchema,
} from "./validators/appointment.schema";

const appointmentRepository = new AppointmentRepository();
const appointmentService = new AppointmentService(appointmentRepository);

export async function getAppointmentById(req: Request, res: Response) {
  const id = Number(req.params.id);

  try {
    const appointment = await appointmentService.getById(id);
    res.json(appointment);
  } catch (error) {
    res.status(404).json({ message: (error as Error).message });
  }
}

export async function createAppointment(req: Request, res: Response) {
  const validationResult = AppointmentInputSchema.safeParse(req.body);
  if (!validationResult.success) {
    res.status(400).json({
      errors: validationResult.error.flatten().fieldErrors,
    });
    return;
  }

  try {
    const appointment = await appointmentService.create(validationResult.data);
    res.status(201).json(appointment);
  } catch (error) {
    console.error("Erro ao criar agendamento:", error);
    res.status(500).json({ message: (error as Error).message });
  }
}

export async function updateAppointment(req: Request, res: Response) {
  const id = Number(req.params.id);

  const validationResult = UpdateAppointmentSchema.safeParse(req.body);
  if (!validationResult.success) {
    res.status(400).json({
      errors: validationResult.error.flatten().fieldErrors,
    });
    return;
  }

  try {
    const appointment = await appointmentService.update(
      id,
      validationResult.data,
    );
    res.status(200).json(appointment);
  } catch (error) {
    console.error("Erro ao atualizar agendamento:", error);
    res.status(500).json({ message: (error as Error).message });
  }
}

export async function deleteAppointment(req: Request, res: Response) {
  const id = Number(req.params.id);

  try {
    const appointment = await appointmentService.delete(id);
    res.json(appointment);
  } catch (error) {
    res.status(404).json({ message: (error as Error).message });
  }
}
