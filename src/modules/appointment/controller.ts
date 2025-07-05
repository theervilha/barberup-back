import { Request, Response } from "express";
import { AppointmentService } from "./service";

const service = new AppointmentService();

export async function getAppointmentById(req: Request, res: Response) {
  const id = Number(req.params.id);

  try {
    const appointment = await service.getAppointmentById(id);
    console.log(appointment);
    res.json(appointment);
  } catch (error) {
    res.status(404).json({ message: (error as Error).message });
  }
}
