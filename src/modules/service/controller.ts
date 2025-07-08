import { Request, Response } from "express";
import { ServicesService } from "./service";
import { ServiceRepository } from "./repository";
import {
  ServiceInputSchema,
  UpdateServiceSchema,
} from "./validators/service.schema";

const serviceRepository = new ServiceRepository();
const servicesService = new ServicesService(serviceRepository);

export async function findServiceById(req: Request, res: Response) {
  const id = Number(req.params.id);

  try {
    const service = await servicesService.findById(id);
    res.json(service);
  } catch (error) {
    res.status(404).json({ message: (error as Error).message });
  }
}

export async function createService(req: Request, res: Response) {
  const validationResult = ServiceInputSchema.safeParse(req.body);
  if (!validationResult.success) {
    res.status(400).json({
      errors: validationResult.error.flatten().fieldErrors,
    });
    return;
  }

  try {
    const service = await servicesService.create(validationResult.data);
    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

export async function updateService(req: Request, res: Response) {
  const id = Number(req.params.id);

  const validationResult = UpdateServiceSchema.safeParse(req.body);
  if (!validationResult.success) {
    res.status(400).json({
      errors: validationResult.error.flatten().fieldErrors,
    });
    return;
  }

  try {
    const service = await servicesService.update(id, validationResult.data);
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

export async function deleteService(req: Request, res: Response) {
  const id = Number(req.params.id);

  try {
    const service = await servicesService.delete(id);
    res.json(service);
  } catch (error) {
    res.status(404).json({ message: (error as Error).message });
  }
}
