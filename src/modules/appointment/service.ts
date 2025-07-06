import { AppointmentRepository } from "./repository";
import {
  CreateAppointmentInput,
  UpdateAppointmentInput,
} from "./validators/appointment.schema";

export class AppointmentService {
  constructor(private repository: AppointmentRepository) {} // Incluir o ShopService aqui para verificar se shop existe.

  async getById(id: number) {
    const appointment = await this.repository.getById(id);
    if (!appointment) {
      throw new Error("Appointment not found");
    }
    return appointment;
  }

  async create(data: CreateAppointmentInput) {
    const { shopId, serviceIds, ...restOfData } = data;
    const prismaData = {
      ...restOfData,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
      shop: {
        connect: {
          id: shopId,
        },
      },
      services: {
        connect: serviceIds.map((id) => ({ id })),
      },
    };
    return await this.repository.create(prismaData);
  }

  async update(id: number, data: UpdateAppointmentInput) {
    await this.getById(id);

    const { shopId, serviceIds, ...restOfData } = data;
    const prismaUpdateData = {
      ...restOfData,
      ...(data.startDate && { startDate: new Date(data.startDate) }),
      ...(data.endDate && { endDate: new Date(data.endDate) }),
      ...(shopId && { shop: { connect: { id: shopId } } }),
      ...(serviceIds && {
        services: {
          set: serviceIds.map((id) => ({ id })),
        },
      }),
    };
    return await this.repository.update(id, prismaUpdateData);
  }

  async delete(id: number) {
    await this.getById(id);
    return await this.repository.delete(id);
  }
}
