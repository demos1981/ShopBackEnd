/**
 * Item Controller - Handles HTTP requests related to item management
 * Implements CRUD operations and input validation for items
 */
import { AppError } from "../utils/AppError";
import { Request, Response } from "express";
import { ItemService } from "../services/item.service";
import { ICreateItemDto, IUpdateItemDto } from "../types/item.types";
import { ItemStatusEnum, ItemSexEnum } from "../types/enums";

/**
 * Клас для управління товарами через HTTP запити
 * Реалізує операції CRUD та валідацію введених даних
 */
export class ItemController {
  private itemService: ItemService; // Сервіс для роботи з товарами в базі даних

  /**
   * Ініціалізує сервіс для роботи з товарами
   */
  constructor() {
    this.itemService = new ItemService();
  }

  /**
   * Отримує всі товари з бази даних
   * @param _req - Express request object (не використовується)
   * @param res - Express response object
   * @returns Promise<void>
   */
  getAll = async (_req: Request, res: Response): Promise<void> => {
    try {
      const items = await this.itemService.findAll(); // Отримання всіх товарів
      res.json(items); // Повертає масив товарів
    } catch (error) {
      console.error("Error fetching items:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  /** Отримує усі товари з бази даних для чоловіків */
  getMenItems = async (_req: Request, res: Response): Promise<void> => {
    try {
      const menItems = await this.itemService.findMenItems();
      res.status(200).json(menItems);
    } catch (error) {
      console.error("Error fetching men items:", error);
      res.status(500).json({ error: "Server error" });
    }
  };
  /** Отримує усі товари з бази даних для чоловіків */
  getWomensItems = async (_req: Request, res: Response): Promise<void> => {
    try {
      const items = await this.itemService.findWomenItems();
      res.status(200).json(items);
    } catch (error) {
      console.error("Error fetching woman items:", error);
      res.status(500).json({ error: "Server error" });
    }
  };

  getKidsItems = async (_req: Request, res: Response): Promise<void> => {
    try {
      const kidItems = await this.itemService.findKidsItems();
      res.status(200).json(kidItems);
    } catch (error) {
      console.error("Error fetching kids items:", error);
      res.status(500).json({ error: "Server error" });
    }
  };
  /** Отримує усі товари з бази даних для нових товарів */
  getNewItems = async (_req: Request, res: Response): Promise<void> => {
    try {
      const newItems = await this.itemService.findNewItems();
      res.status(200).json(newItems);
    } catch (error) {
      console.error("Error fetching new items:", error);
      res.status(500).json({ error: "Server error" });
    }
  };
  getAccessoriesItems = async (_req: Request, res: Response): Promise<void> => {
    try {
      const accessoriesItems = await this.itemService.findAccessoriesItems();
      res.status(200).json(accessoriesItems);
    } catch (error) {
      console.error("Error fetching accessories items:", error);
      res.status(500).json({ error: "Server error" });
    }
  };

  /**
   * Отримує один товар за його ID
   * @param req - Express request object з ID товару в параметрах
   * @param res - Express response object
   * @returns Promise<void>
   */
  getById = async (req: Request, res: Response): Promise<void> => {
    try {
      // Перевірка формату ID
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ error: "Invalid ID format" });
        return;
      }

      // Пошук товару за ID
      const item = await this.itemService.findById(id);
      if (!item) {
        throw new AppError(`Item with ID ${id} not found`, 404);
      }

      // Повертає знайдений товар з вибраними полями
      res.json({
        id: item.id,
        name: item.name, // або будь-які інші поля
        photoUrl: item.photoUrl,
        videoUrl: item.videoUrl,
      });
    } catch (error) {
      console.error("Error fetching item:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  /**
   * Створює новий товар у базі даних
   * Валідує обов'язкові поля, значення enum та числові обмеження
   * @param req - Express request object з даними товару в тілі запиту
   * @param res - Express response object
   * @returns Promise<void>
   */
  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const createItemDto = req.body as ICreateItemDto;

      // Валідація обов'язкових полів
      const requiredFields = [
        "articles",
        "brand",
        "name",
        "description",
        "quantity",
        "price",
        "role",
        "sex",
        "category",
      ] as const;
      const missingFields = requiredFields.filter(
        (field) => !createItemDto[field]
      );

      if (missingFields.length > 0) {
        res.status(400).json({
          error: "Missing required fields",
          fields: missingFields,
        });
        return;
      }

      // Валідація значень enum
      if (!Object.values(ItemStatusEnum).includes(createItemDto.role)) {
        res.status(400).json({
          error: "Invalid role value",
          validValues: Object.values(ItemStatusEnum),
        });
        return;
      }

      if (!Object.values(ItemSexEnum).includes(createItemDto.sex)) {
        res.status(400).json({
          error: "Invalid sex value",
          validValues: Object.values(ItemSexEnum),
        });
        return;
      }

      // Валідація числових полів
      if (createItemDto.quantity < 0) {
        res.status(400).json({ error: "Quantity cannot be negative" });
        return;
      }

      if (createItemDto.price < 0) {
        res.status(400).json({ error: "Price cannot be negative" });
        return;
      }

      // Створення нового товару
      const newItem = await this.itemService.create(createItemDto);
      res.status(201).json(newItem); // Повертає створений товар з кодом 201
    } catch (error) {
      console.error("Error creating item:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  /**
   * Оновлює існуючий товар у базі даних
   * Валідує формат ID, значення enum та числові обмеження
   * @param req - Express request object з ID товару в параметрах та даними для оновлення в тілі запиту
   * @param res - Express response object
   * @returns Promise<void>
   */
  update = async (req: Request, res: Response): Promise<void> => {
    try {
      // Перевірка формату ID
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ error: "Invalid ID format" });
        return;
      }

      const updateItemDto = req.body as IUpdateItemDto;

      // Валідація значень enum, якщо надані
      if (
        updateItemDto.role &&
        !Object.values(ItemStatusEnum).includes(updateItemDto.role)
      ) {
        res.status(400).json({
          error: "Invalid role value",
          validValues: Object.values(ItemStatusEnum),
        });
        return;
      }

      if (
        updateItemDto.sex &&
        !Object.values(ItemSexEnum).includes(updateItemDto.sex)
      ) {
        res.status(400).json({
          error: "Invalid sex value",
          validValues: Object.values(ItemSexEnum),
        });
        return;
      }

      // Валідація числових полів, якщо надані
      if (updateItemDto.quantity !== undefined && updateItemDto.quantity < 0) {
        res.status(400).json({ error: "Quantity cannot be negative" });
        return;
      }

      if (updateItemDto.price !== undefined && updateItemDto.price < 0) {
        res.status(400).json({ error: "Price cannot be negative" });
        return;
      }

      // Оновлення товару
      const updatedItem = await this.itemService.update(id, updateItemDto);

      if (!updatedItem) {
        res.status(404).json({ error: "Item not found" });
        return;
      }

      res.json(updatedItem); // Повертає оновлений товар
    } catch (error) {
      console.error("Error updating item:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  /**
   * Видаляє товар з бази даних
   * @param req - Express request object з ID товару в параметрах
   * @param res - Express response object
   * @returns Promise<void>
   */
  delete = async (req: Request, res: Response): Promise<void> => {
    try {
      // Перевірка формату ID
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ error: "Invalid ID format" });
        return;
      }

      // Видалення товару
      const deleted = await this.itemService.remove(id);
      if (!deleted) {
        res.status(404).json({ error: "Item not found" });
        return;
      }

      res.status(204).send(); // Повертає успішний статус без тіла відповіді
    } catch (error) {
      console.error("Error deleting item:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
}
