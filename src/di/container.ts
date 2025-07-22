import { AppointmentRepository } from "../modules/appointment/repository";
import { AppointmentService } from "../modules/appointment/service";
import { ServiceRepository } from "../modules/service/repository";
import { ServicesService } from "../modules/service/service";
import { ShopRepository } from "../modules/shop/repository";
import { ShopService } from "../modules/shop/service";

// Repositories
const appointmentRepository = new AppointmentRepository();
const serviceRepository = new ServiceRepository();
const shopRepository = new ShopRepository();

// Services com dependências injetadas
const shopService = new ShopService(shopRepository, appointmentRepository);
const appointmentService = new AppointmentService(
  appointmentRepository,
  serviceRepository,
  shopService,
);
const servicesService = new ServicesService(serviceRepository);

export {
  appointmentService,
  shopService,
  appointmentRepository,
  shopRepository,
  serviceRepository,
  servicesService,
};
