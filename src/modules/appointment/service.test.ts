import { jest, describe, expect, beforeEach, it } from "@jest/globals";
import { AppointmentRepository } from "./repository";
import { AppointmentService } from "./service";

describe("Appointment Service", () => {
  let appointmentService: AppointmentService;
  let mockRepository: jest.Mocked<AppointmentRepository>;

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

  describe("getAppointmentById", () => {
    it("should return appointment when found", async () => {
      const mockAppointment = {
        id: 1,
        shopId: "shop-123",
        startDate: new Date("2025-07-05"),
        endDate: new Date("2025-07-05"),
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

      mockRepository.getById.mockResolvedValue(mockAppointment);

      const result = await appointmentService.getAppointmentById(1);

      expect(result).toEqual(mockAppointment);
      expect(mockRepository.getById).toHaveBeenCalledWith(1);
    });

    it("should throw error when appointment not found", async () => {
      const mockAppointment = null;

      mockRepository.getById.mockResolvedValue(mockAppointment);

      await expect(
        appointmentService.getAppointmentById(1),
      ).rejects.toThrowError("Appointment not found");
    });
  });
});
