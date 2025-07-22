import { Service, Prisma } from "@prisma/client";
import { prisma } from "../../config/database";

export class ServiceRepository {
  async create(data: Prisma.ServiceCreateInput) {
    return await prisma.service.create({ data });
  }

  async findById(id: number) {
    return await prisma.service.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: Prisma.ServiceUpdateInput) {
    return await prisma.service.update({ where: { id }, data });
  }

  async delete(id: number): Promise<Service> {
    return await prisma.service.delete({ where: { id } });
  }

  async findManyByIds(ids: number[]) {
    return await prisma.service.findMany({
      where: {
        id: { in: ids },
      },
    });
  }
}
