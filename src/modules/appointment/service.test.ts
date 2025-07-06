import { jest, describe, expect, beforeEach, it } from "@jest/globals";
import { AppointmentRepository } from "./repository";
import { AppointmentService } from "./service";

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
        consumeHours: 30,
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
      findByShopId: jest.fn(),
    } as jest.Mocked<AppointmentRepository>;

    appointmentService = new AppointmentService(mockRepository);
  });

  describe("create", () => {
    it("should create appointment", async () => {
      mockRepository.create.mockResolvedValue(baseMockAppointment);
      const createData = {
        shopId: "shop-123",
        startDate: new Date(),
        endDate: new Date(),
        customerName: "Teste",
        customerPhone: "5584911111111",
        servicesIds: [1],
      };

      const result = await appointmentService.create(createData);

      expect(result).toEqual(baseMockAppointment);
      expect(mockRepository.create).toHaveBeenCalledWith(createData);
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
        servicesIds: [1],
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
    it("should update appointment", async () => {
      const updatedMockAppointment = {
        ...baseMockAppointment,
        customerName: "Joao",
        customerPhone: "5511922222222",
      };
      mockRepository.update.mockResolvedValue(updatedMockAppointment);

      const updateData = {
        startDate: new Date(),
        endDate: new Date(),
        customerName: "Joao",
        customerPhone: "5511922222222",
        servicesIds: [1],
      };

      const result = await appointmentService.update(1, updateData);

      expect(result).toEqual(updatedMockAppointment);
      expect(mockRepository.update).toHaveBeenCalledWith(1, updateData);
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
      mockRepository.delete.mockResolvedValue(deletedMockAppointment);

      const result = await appointmentService.delete(1);

      expect(result).toEqual(deletedMockAppointment);
      expect(mockRepository.delete).toHaveBeenCalledWith(1);
    });

    it.todo("should throw an error if the updated time slot is already booked");
    it.todo(
      "should throw an error when the updated time slot is outside business hours",
    );
    it.todo("should throw an error if startDate is in the past");
    it.todo("should throw an error if startDate is after endDate");
    it.todo("should throw an error if customerPhone is not valid");
  });

  describe("list shop appointments", () => {
    const listMockAppointments = [{ ...baseMockAppointment }];

    it("should return appointments by shopId", async () => {
      mockRepository.findByShopId.mockResolvedValue(listMockAppointments);

      const result = await appointmentService.getByShopId("shop-123");

      expect(result).toEqual(listMockAppointments);
      expect(mockRepository.findByShopId).toHaveBeenCalledWith("shop-123");
    });
  });
});
