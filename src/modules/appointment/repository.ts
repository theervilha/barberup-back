import { Appointment, Prisma } from "@prisma/client";
import { prisma } from "../../config/database";

export class AppointmentRepository {
  async create(data: Prisma.AppointmentCreateInput) {
    return await prisma.appointment.create({ data });
  }

  async getById(id: number) {
    return await prisma.appointment.findUnique({ where: { id } });
  }

  async update(id: number, data: Prisma.AppointmentUpdateInput) {
    return await prisma.appointment.update({ where: { id }, data });
  }

  async delete(id: number): Promise<Appointment> {
    return await prisma.appointment.delete({ where: { id } });
  }

  async findByShopId(shopId: string) {
    return await prisma.appointment.findMany({ where: { shopId } });
  }
}
