import { ServiceRepository } from "./repository";
import {
  CreateServiceInput,
  UpdateServiceInput,
} from "./validators/service.schema";

export class ServicesService {
  constructor(private repository: ServiceRepository) {}

  async findById(id: number) {
    const service = await this.repository.findById(id);
    if (!service) {
      throw new Error("Service not found");
    }
    return service;
  }

  async create(data: CreateServiceInput) {
    const { shopId, ...restOfData } = data;
    const prismaCreateData = {
      ...restOfData,
      shop: {
        connect: { id: shopId },
      },
    };
    return await this.repository.create(prismaCreateData);
  }

  async update(id: number, data: UpdateServiceInput) {
    await this.findById(id);
    const { shopId, ...restOfData } = data;
    const prismaUpdateData = {
      ...restOfData,
      ...(shopId && {
        shop: {
          connect: { id: shopId },
        },
      }),
    };
    return await this.repository.update(id, prismaUpdateData);
  }

  async delete(id: number) {
    await this.findById(id);
    return await this.repository.delete(id);
  }
}
