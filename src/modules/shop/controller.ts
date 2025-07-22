import { Request, Response } from "express";
import { ShopInputSchema, UpdateShopSchema } from "./validators/shop.schema";
import { shopService } from "../../di/container";

export async function findShopById(req: Request, res: Response) {
  const id = req.params.id;

  try {
    const shop = await shopService.findById(id);
    res.json(shop);
  } catch (error) {
    res.status(404).json({ message: (error as Error).message });
  }
}

export async function findAllShops(req: Request, res: Response) {
  try {
    const shop = await shopService.findAll();
    res.json(shop);
  } catch (error) {
    res.status(404).json({ message: (error as Error).message });
  }
}

export async function createShop(req: Request, res: Response) {
  const validationResult = ShopInputSchema.safeParse(req.body);
  if (!validationResult.success) {
    res.status(400).json({
      errors: validationResult.error.flatten().fieldErrors,
    });
    return;
  }

  try {
    const shop = await shopService.create(validationResult.data);
    res.status(201).json(shop);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

export async function updateShop(req: Request, res: Response) {
  const id = req.params.id;

  const validationResult = UpdateShopSchema.safeParse(req.body);
  if (!validationResult.success) {
    res.status(400).json({
      errors: validationResult.error.flatten().fieldErrors,
    });
    return;
  }

  try {
    const shop = await shopService.update(id, validationResult.data);
    res.status(200).json(shop);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

export async function deleteShop(req: Request, res: Response) {
  const id = req.params.id;

  try {
    const shop = await shopService.delete(id);
    res.json(shop);
  } catch (error) {
    res.status(404).json({ message: (error as Error).message });
  }
}
