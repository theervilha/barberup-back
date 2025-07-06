import { Request, Response } from "express";
import { AppointmentService } from "./service";
import { AppointmentRepository } from "./repository";

const repository = new AppointmentRepository();
const service = new AppointmentService(repository);

export async function getAppointmentById(req: Request, res: Response) {
  const id = Number(req.params.id);

  try {
    const appointment = await service.getById(id);
    console.log(appointment);
    res.json(appointment);
  } catch (error) {
    res.status(404).json({ message: (error as Error).message });
  }
}
