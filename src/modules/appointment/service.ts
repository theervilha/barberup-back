import { ServiceRepository } from "../service/repository";
import { ShopService } from "../shop/service";
import { AppointmentRepository } from "./repository";
import {
  CreateAppointmentInput,
  UpdateAppointmentInput,
} from "./validators/appointment.schema";

export class AppointmentService {
  constructor(
    private repository: AppointmentRepository,
    private serviceRepository: ServiceRepository,
    private shopService: ShopService,
  ) {} // Incluir o ShopService aqui para verificar se shop existe.

  async getById(id: number) {
    const appointment = await this.repository.getById(id);
    if (!appointment) {
      throw new Error("Appointment not found");
    }
    return appointment;
  }

  async create(data: CreateAppointmentInput) {
    const { shopId, serviceIds, startDate, ...restOfData } = data;

    const now = new Date();
    const start = new Date(startDate);
    if (start < now) {
      throw new Error("Start date is in past");
    }

    const services = await this.serviceRepository.findManyByIds(serviceIds);
    const totalConsumeMinutes = services.reduce(
      (sum, service) => sum + service.consumeMinutes,
      0,
    );
    const endDate = new Date(start.getTime() + totalConsumeMinutes * 60 * 1000);

    await this.shopService.isShopAvailableBetweenDates(shopId, start, endDate);

    const prismaData = {
      ...restOfData,
      startDate: start,
      endDate,
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
