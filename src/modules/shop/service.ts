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
    return await this.repository.create(data);
  }

  async update(id: string, data: UpdateShopInput) {
    await this.findById(id);
    return await this.repository.update(id, data);
  }

  async delete(id: string) {
    await this.findById(id);
    return await this.repository.delete(id);
  }
}
