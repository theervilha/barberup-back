import { jest, describe, expect, beforeEach, it } from "@jest/globals";
import { ShopRepository } from "./repository";
import { ShopService } from "./service";
import { CreateShopInput } from "./validators/shop.schema";

describe("Shop Service", () => {
  let shopService: ShopService;
  let mockRepository: jest.Mocked<ShopRepository>;

  const baseMockShop = {
    id: "shop-123",
    name: "Barbearia linda",
    address: "Onde Judas perdeu as botas",
    phone: "5584911111111",
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const baseMockShopWithServices = { ...baseMockShop, services: [] };

  beforeEach(() => {
    mockRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findAll: jest.fn(),
    } as jest.Mocked<ShopRepository>;

    shopService = new ShopService(mockRepository);
  });

  describe("create", () => {
    it("should create shop", async () => {
      mockRepository.create.mockResolvedValue(baseMockShop);
      const createInput: CreateShopInput = {
        name: "Barbearia linda",
        address: "Onde Judas perdeu as botas",
        phone: "5584911111111",
      };

      const result = await shopService.create(createInput);

      expect(result).toEqual(baseMockShop);
      expect(mockRepository.create).toHaveBeenCalledWith(createInput);
    });

    it.todo("should throw error if shop already exists");
    it.todo("should throw an error if phone is not valid");
  });

  describe("find shop by id", () => {
    it("should return shop when found", async () => {
      mockRepository.findById.mockResolvedValue(baseMockShopWithServices);

      const result = await shopService.findById("shop-123");

      expect(result).toEqual(baseMockShopWithServices);
      expect(mockRepository.findById).toHaveBeenCalledWith("shop-123");
    });

    it("should throw error when shop not found", async () => {
      mockRepository.findById.mockResolvedValue(null);

      await expect(shopService.findById("shop-123")).rejects.toThrowError(
        "Shop not found",
      );
    });
  });

  describe("find all shops", () => {
    it("should return shops", async () => {
      mockRepository.findAll.mockResolvedValue([baseMockShop]);

      const result = await shopService.findAll();

      expect(result).toEqual([baseMockShop]);
      expect(mockRepository.findAll).toHaveBeenCalled();
    });

    it("should return empty array if shops does not exists", async () => {
      mockRepository.findAll.mockResolvedValue([]);

      const result = await shopService.findAll();

      expect(result).toEqual([]);
      expect(mockRepository.findAll).toHaveBeenCalled();
    });
  });

  describe("update", () => {
    const updateInput = {
      name: "Barbearia Ajustada",
      address: "Onde Judas não perdeu as botas",
      phone: "5584922222222",
    };

    it("should update Shop", async () => {
      const updatedMockShop = {
        ...baseMockShop,
        ...updateInput,
      };

      mockRepository.findById.mockResolvedValue(baseMockShopWithServices);
      mockRepository.update.mockResolvedValue(updatedMockShop);

      const result = await shopService.update("shop-123", updateInput);

      expect(result).toEqual(updatedMockShop);
      expect(mockRepository.update).toHaveBeenCalledWith(
        "shop-123",
        updateInput,
      );
    });

    it("should throw error when Shop not found", async () => {
      mockRepository.findById.mockResolvedValue(null);

      const result = shopService.update("shop-456", updateInput);
      await expect(result).rejects.toThrowError("Shop not found");
      expect(mockRepository.findById).toHaveBeenCalledWith("shop-456");
      expect(mockRepository.update).not.toHaveBeenCalled();
    });

    it.todo("should throw an error when phone is not valid");
  });

  describe("delete", () => {
    it("should delete Shop", async () => {
      mockRepository.findById.mockResolvedValue(baseMockShopWithServices);
      mockRepository.delete.mockResolvedValue(baseMockShop);

      const result = await shopService.delete("shop-123");

      expect(result).toEqual(baseMockShop);
      expect(mockRepository.delete).toHaveBeenCalledWith("shop-123");
      expect(mockRepository.findById).toHaveBeenCalledWith("shop-123");
    });

    it("should throw error when Shop not found", async () => {
      mockRepository.findById.mockResolvedValue(null);

      const result = shopService.delete("shop-123");
      await expect(result).rejects.toThrowError("Shop not found");
      expect(mockRepository.findById).toHaveBeenCalledWith("shop-123");
      expect(mockRepository.delete).not.toHaveBeenCalled();
    });
  });
});
