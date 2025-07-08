import { jest, describe, expect, beforeEach, it } from "@jest/globals";
import { ServiceRepository } from "./repository";
import { ServicesService } from "./service";
import { CreateServiceInput } from "./validators/service.schema";

describe("Services Service", () => {
  let servicesService: ServicesService;
  let mockRepository: jest.Mocked<ServiceRepository>;

  const baseMockService = {
    id: 1,
    name: "Corte de cabelo",
    description: "Um maravilhoso corte",
    images: ["https://example.com"],
    consumeMinutes: 40,
    price: 3000,
    shopId: "shop-123",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    mockRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as jest.Mocked<ServiceRepository>;

    servicesService = new ServicesService(mockRepository);
  });

  describe("create", () => {
    it("should create service", async () => {
      mockRepository.create.mockResolvedValue(baseMockService);
      const createInput: CreateServiceInput = {
        name: "Corte de cabelo",
        description: "Um maravilhoso corte",
        images: ["https://example.com"],
        consumeMinutes: 40,
        price: 3000,
        shopId: "shop-123",
      };

      const { shopId, ...restOfData } = createInput;
      const createPrismaData = {
        ...restOfData,
        shop: {
          connect: { id: shopId },
        },
      };

      const result = await servicesService.create(createInput);

      expect(result).toEqual(baseMockService);
      expect(mockRepository.create).toHaveBeenCalledWith(createPrismaData);
    });

    it.todo("should throw an error if images are not valid");
    it.todo("should throw an error if consumeMinutes is negative");
    it.todo("should throw an error if price is negative");
    it.todo("should throw an error if shop does not exists");
  });

  describe("find service by id", () => {
    it("should return service when found", async () => {
      mockRepository.findById.mockResolvedValue(baseMockService);

      const result = await servicesService.findById(1);

      expect(result).toEqual(baseMockService);
      expect(mockRepository.findById).toHaveBeenCalledWith(1);
    });

    it("should throw error when service not found", async () => {
      mockRepository.findById.mockResolvedValue(null);

      await expect(servicesService.findById(1)).rejects.toThrowError(
        "Service not found",
      );
    });
  });

  describe("update", () => {
    const updateInput = {
      name: "Updated: Corte de cabelo",
      description: "Updated: Um maravilhoso corte",
      images: ["https://example-adjusted.com"],
      consumeMinutes: 45,
      price: 3500,
      shopId: "shop-1234",
    };

    it("should update service", async () => {
      const updatedMockService = {
        ...baseMockService,
        ...updateInput,
      };

      mockRepository.findById.mockResolvedValue(baseMockService);
      mockRepository.update.mockResolvedValue(updatedMockService);

      const result = await servicesService.update(1, updateInput);
      const { shopId, ...restOfData } = updateInput;
      const prismaUpdateData = {
        ...restOfData,
        ...(shopId && { shop: { connect: { id: shopId } } }),
      };

      expect(result).toEqual(updatedMockService);
      expect(mockRepository.update).toHaveBeenCalledWith(1, prismaUpdateData);
    });

    it("should throw error when service not found", async () => {
      mockRepository.findById.mockResolvedValue(null);

      const result = servicesService.update(1, updateInput);
      await expect(result).rejects.toThrowError("Service not found");
      expect(mockRepository.findById).toHaveBeenCalledWith(1);
      expect(mockRepository.update).not.toHaveBeenCalled();
    });
  });

  describe("delete", () => {
    it("should delete service", async () => {
      mockRepository.findById.mockResolvedValue(baseMockService);
      mockRepository.delete.mockResolvedValue(baseMockService);

      const result = await servicesService.delete(1);

      expect(result).toEqual(baseMockService);
      expect(mockRepository.delete).toHaveBeenCalledWith(1);
      expect(mockRepository.findById).toHaveBeenCalledWith(1);
    });

    it("should throw error when service not found", async () => {
      mockRepository.findById.mockResolvedValue(null);

      const result = servicesService.delete(1);
      await expect(result).rejects.toThrowError("Service not found");
      expect(mockRepository.findById).toHaveBeenCalledWith(1);
      expect(mockRepository.delete).not.toHaveBeenCalled();
    });
  });
});
