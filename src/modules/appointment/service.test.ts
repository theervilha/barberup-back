import { jest, describe, expect, beforeEach, it } from "@jest/globals";
import { AppointmentRepository } from "./repository";
import { AppointmentService } from "./service";
import { CreateAppointmentInput } from "./validators/appointment.schema";

describe("Appointment Service", () => {
  let appointmentService: AppointmentService;
  let mockRepository: jest.Mocked<AppointmentRepository>;

  const baseMockAppointment = {
    id: 1,
    shopId: "shop-123",
    startDate: new Date("2025-07-05"),
    endDate: new Date("2025-07-05"),
    customerName: "Teste",
    customerPhone: "5584911111111",
    createdAt: new Date(),
    updatedAt: new Date(),
    services: [
      {
        id: 1,
        name: "Corte de Cabelo",
        description: "Corte padrão masculino",
        images: [],
        consumeMinutes: 30,
        price: 3000,
        shopId: "shop-123",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  };

  beforeEach(() => {
    mockRepository = {
      create: jest.fn(),
      getById: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as jest.Mocked<AppointmentRepository>;

    appointmentService = new AppointmentService(mockRepository);
  });

  describe("create", () => {
    it("should create appointment", async () => {
      mockRepository.create.mockResolvedValue(baseMockAppointment);
      const createInput: CreateAppointmentInput = {
        shopId: "shop-123",
        startDate: "2023-10-27T10:00:00.000Z",
        endDate: "2023-10-27T10:00:00.000Z",
        customerName: "Teste",
        customerPhone: "5584911111111",
        serviceIds: [1],
      };

      const result = await appointmentService.create(createInput);

      const { shopId, serviceIds, ...restOfCreateInput } = createInput;
      const expectedPrismaData = {
        ...restOfCreateInput,
        startDate: new Date(createInput.startDate),
        endDate: new Date(createInput.endDate),
        shop: {
          connect: {
            id: createInput.shopId,
          },
        },
        services: {
          connect: [{ id: 1 }],
        },
      };

      expect(result).toEqual(baseMockAppointment);
      expect(mockRepository.create).toHaveBeenCalledWith(expectedPrismaData);
    });

    it.todo("should throw a ShopNotFound error when the shop does not exist");
    /* Started a code to test but didn't proceed to focus on deliverying a MVP.
    , async () => {
      const createData = {
        shopId: "shop-123",
        startDate: new Date(),
        endDate: new Date(),
        customerName: "Teste",
        customerPhone: "5584911111111",
        serviceIds: [1],
      };

      const expectedError = new ShopNotFoundError(createData.shopId);
      mockShopService.validateShopExists.mockRejectedValue(expectedError);

      await expect(appointmentService.create(createData)).rejects.toThrow(
        expectedError,
      );
      expect(mockAppointmentRepository.create).not.toHaveBeenCalled();
    });
    */

    // To be implemented
    it.todo(
      "should throw an error if the selected time slot is already booked",
    );
    it.todo(
      "should throw an error when the selected time slot is outside business hours",
    );
    it.todo("should throw an error if startDate is in the past");
    it.todo("should throw an error if startDate is after endDate");
    it.todo("should throw an error if customerPhone is not valid");
  });

  describe("get appointment by id", () => {
    it("should return appointment when found", async () => {
      mockRepository.getById.mockResolvedValue(baseMockAppointment);

      const result = await appointmentService.getById(1);

      expect(result).toEqual(baseMockAppointment);
      expect(mockRepository.getById).toHaveBeenCalledWith(1);
    });

    it("should throw error when appointment not found", async () => {
      mockRepository.getById.mockResolvedValue(null);

      await expect(appointmentService.getById(1)).rejects.toThrowError(
        "Appointment not found",
      );
    });
  });

  describe("update", () => {
    const updateInput = {
      startDate: "2023-10-27T10:00:00.000Z",
      endDate: "2023-10-27T10:00:00.000Z",
      customerName: "Joao",
      customerPhone: "5511922222222",
      serviceIds: [1] as [number, ...number[]],
      shopId: "shop-123",
    };

    it("should update appointment", async () => {
      const updatedMockAppointment = {
        ...baseMockAppointment,
        customerName: "Joao",
        customerPhone: "5511922222222",
      };
      mockRepository.getById.mockResolvedValue(baseMockAppointment);
      mockRepository.update.mockResolvedValue(updatedMockAppointment);

      const { shopId, serviceIds, ...restOfUpdateInput } = updateInput;
      const expectedPrismaData = {
        ...restOfUpdateInput,
        startDate: new Date(updateInput.startDate),
        endDate: new Date(updateInput.endDate),
        shop: {
          connect: {
            id: updateInput.shopId,
          },
        },
        services: {
          set: [{ id: 1 }],
        },
      };

      const result = await appointmentService.update(1, updateInput);

      expect(result).toEqual(updatedMockAppointment);
      expect(mockRepository.update).toHaveBeenCalledWith(1, expectedPrismaData);
    });

    it("should throw error when appointment not found", async () => {
      mockRepository.getById.mockResolvedValue(null);

      const result = appointmentService.update(1, updateInput);
      await expect(result).rejects.toThrowError("Appointment not found");
      expect(mockRepository.getById).toHaveBeenCalledWith(1);
      expect(mockRepository.update).not.toHaveBeenCalled();
    });

    it.todo("should throw an error if the updated time slot is already booked");
    it.todo(
      "should throw an error when the updated time slot is outside business hours",
    );
    it.todo("should throw an error if startDate is in the past");
    it.todo("should throw an error if startDate is after endDate");
    it.todo("should throw an error if customerPhone is not valid");
  });

  describe("delete", () => {
    it("should delete appointment", async () => {
      const { services, ...deletedMockAppointment } = baseMockAppointment;
      mockRepository.getById.mockResolvedValue(baseMockAppointment);
      mockRepository.delete.mockResolvedValue(deletedMockAppointment);

      const result = await appointmentService.delete(1);

      expect(result).toEqual(deletedMockAppointment);
      expect(mockRepository.delete).toHaveBeenCalledWith(1);
      expect(mockRepository.getById).toHaveBeenCalledWith(1);
    });

    it("should throw error when appointment not found", async () => {
      mockRepository.getById.mockResolvedValue(null);

      const result = appointmentService.delete(1);
      await expect(result).rejects.toThrowError("Appointment not found");
      expect(mockRepository.getById).toHaveBeenCalledWith(1);
      expect(mockRepository.delete).not.toHaveBeenCalled();
    });
  });
});
