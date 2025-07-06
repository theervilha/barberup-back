import { AppointmentRepository } from "./repository";

export class AppointmentService {
  constructor(private repository: AppointmentRepository) {} // Incluir o ShopService aqui para verificar se shop existe.

  async getById(id: number) {
    const appointment = await this.repository.getById(id);
    if (!appointment) {
      throw new Error("Appointment not found");
    }
    return appointment;
  }
}
