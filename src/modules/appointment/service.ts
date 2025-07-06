import { AppointmentRepository } from "./repository";

export class AppointmentService {
  constructor(private repository: AppointmentRepository) {}

  async getAppointmentById(id: number) {
    const appointment = await this.repository.getById(id);
    if (!appointment) {
      throw new Error("Appointment not found");
    }
    return appointment;
  }
}
