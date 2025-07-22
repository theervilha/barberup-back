import { Prisma } from "@prisma/client";
import { ShopRepository } from "./repository";
import { CreateShopInput, UpdateShopInput } from "./validators/shop.schema";
import { AppointmentRepository } from "../appointment/repository";
import { timeToMinutes, utcTimeToMinutes } from "../../utils/time";

export class ShopService {
  constructor(
    private repository: ShopRepository,
    private appointmentRepository: AppointmentRepository,
  ) {}

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

  async isShopAvailableBetweenDates(
    id: string,
    startDate: Date,
    endDate: Date,
  ) {
    const shop = await this.findById(id);

    // 1. Verificar horário de funcionamento da loja
    if (startDate.getDay() !== endDate.getDay()) {
      throw new Error("Agendamentos não podem passar de um dia para outro");
    }

    // Buscar horário de funcionamento
    const workingHour = shop.workingHours.find(
      (w) => w.weekDay === startDate.getDay(),
    );

    if (!workingHour) {
      throw new Error("Loja fechada neste dia da semana");
    }

    // Converter tudo para minutos
    const openMinutes = utcTimeToMinutes(workingHour.openAt);
    const closeMinutes = utcTimeToMinutes(workingHour.closeAt);
    const startMinutes = timeToMinutes(startDate);
    const endMinutes = timeToMinutes(endDate);

    // Validações
    if (startMinutes < openMinutes) {
      throw new Error(
        `Loja abre às ${Math.floor(openMinutes / 60)}:${String(openMinutes % 60).padStart(2, "0")}`,
      );
    }

    if (endMinutes > closeMinutes) {
      throw new Error(
        `Loja fecha às ${Math.floor(closeMinutes / 60)}:${String(closeMinutes % 60).padStart(2, "0")}`,
      );
    }

    if (startMinutes >= endMinutes) {
      throw new Error(
        "Horário de início deve ser anterior ao horário de término",
      );
    }

    // 2. Verificar se há conflito de horário com agendamentos futuros
    const futureAppointments =
      await this.appointmentRepository.findFutureByShopId(id);

    const hasConflict = futureAppointments.some((appointment) => {
      return startDate < appointment.endDate && endDate > appointment.startDate;
    });

    if (hasConflict) {
      throw new Error("Já existe um agendamento neste horário");
    }

    return true;
  }
}
