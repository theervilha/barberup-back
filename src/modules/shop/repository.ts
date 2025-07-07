import { Shop, Prisma } from "@prisma/client";
import { prisma } from "../../config/database";

export class ShopRepository {
  async create(data: Prisma.ShopCreateInput) {
    return await prisma.shop.create({ data });
  }

  async findById(id: string) {
    return await prisma.shop.findUnique({
      where: { id },
      include: { services: true },
    });
  }

  async findAll() {
    return await prisma.shop.findMany();
  }

  async update(id: string, data: Prisma.ShopUpdateInput) {
    return await prisma.shop.update({ where: { id }, data });
  }

  async delete(id: string): Promise<Shop> {
    return await prisma.shop.delete({ where: { id } });
  }
}
