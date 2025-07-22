import { Prisma } from "@prisma/client";
import { ShopRepository } from "./repository";
import { CreateShopInput, UpdateShopInput } from "./validators/shop.schema";

export class ShopService {
  constructor(private repository: ShopRepository) {}

  async findById(id: string) {
    const shop = await this.repository.findById(id);
    if (!shop) {
      throw new Error("Shop not found");
    }
    return shop;
  }

  async findAll() {
    return await this.repository.findAll();
  }

  async create(data: CreateShopInput) {
    return await this.repository.create({
      ...data,
      workingHours: {
        create: data.workingHours.map((hour) => ({
          weekDay: hour.weekDay,
          openAt: new Date(`1970-01-01T${hour.openAt}:00Z`),
          closeAt: new Date(`1970-01-01T${hour.closeAt}:00Z`),
        })),
      },
    });
  }

  async update(id: string, data: UpdateShopInput) {
    await this.findById(id);

    const { workingHours, ...restOfData } = data;
    const updatePrismaData: Prisma.ShopUpdateInput = {
      ...restOfData,
      ...(workingHours && {
        workingHours: {
          deleteMany: {},
          create: workingHours.map((hour) => ({
            weekDay: hour.weekDay,
            openAt: new Date(`1970-01-01T${hour.openAt}:00Z`),
            closeAt: new Date(`1970-01-01T${hour.closeAt}:00Z`),
          })),
        },
      }),
    };

    return await this.repository.update(id, updatePrismaData);
  }

  async delete(id: string) {
    await this.findById(id);
    return await this.repository.delete(id);
  }
}
