import { AppointmentRepository } from "./repository";

const repository = new AppointmentRepository();

export class AppointmentService {
  async getAppointmentById(id: number) {
    const appointment = await repository.getById(id);
    if (!appointment) {
      throw new Error("Appointment not found");
    }
    return appointment;
  }
}
