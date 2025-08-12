/**
 * Сервіс для роботи з товарами (Item) у базі даних
 * Реалізує базові CRUD операції та додаткові методи для управління товарами
 */
import { Repository } from "typeorm";
import { AppDataSource } from "../config/data-source";
import { Item } from "../models/itemEntity";
import { ICreateItemDto, IUpdateItemDto } from "../types/item.types";
import { ItemSexEnum, ItemStatusEnum } from "../types/enums";

export class ItemService {
  private itemRepository: Repository<Item>; // Репозиторій для взаємодії з таблицею товарів у базі даних

  /**
   * Ініціалізує репозиторій товарів з джерела даних додатку
   */
  constructor() {
    this.itemRepository = AppDataSource.getRepository(Item);
  }

  /**
   * Створює новий товар у базі даних
   * @param createItemDto - Об'єкт з даними нового товару
   * @returns Promise із створеним товаром, включно з ID
   */
  async create(createItemDto: ICreateItemDto): Promise<Item> {
    const item = this.itemRepository.create(createItemDto); // Створює екземпляр товару
    return this.itemRepository.save(item); // Зберігає товар у базі даних
  }

  /**
   * Отримує всі товари з бази даних
   * @returns Promise з масивом усіх товарів
   */
  async findAll(): Promise<Item[]> {
    return this.itemRepository.find();
  }
  /** Отримує усі товари для чоловіків */
  async findMenItems(): Promise<Item[]> {
    return this.itemRepository.find({
      where: { sex: ItemSexEnum.MAN },
    });
  }
  /** Отримує усі товари для чоловіків */
  async findWomenItems(): Promise<Item[]> {
    return this.itemRepository.find({
      where: { sex: ItemSexEnum.WOMAN },
    });
  }
  /** Отримує усі товари для дітей */
  async findKidsItems(): Promise<Item[]> {
    return this.itemRepository.find({
      where: { sex: ItemSexEnum.CHILDREN },
    });
  }
  /** Отримує усі нові товари */
  async findNewItems(): Promise<Item[]> {
    return this.itemRepository.find({
      where: { role: ItemStatusEnum.NEW },
    });
  }
  async findAccessoriesItems(): Promise<Item[]> {
    return this.itemRepository.find({
      where: { category: "accessories" },
    });
  }

  /**
   * Знаходить товар за його ID
   * @param id - Унікальний ідентифікатор товару
   * @returns Promise з товаром або null, якщо товар не знайдено
   */
  async findById(id: number): Promise<Item | null> {
    return this.itemRepository.findOneBy({ id });
  }

  /**
   * Оновлює існуючий товар у базі даних
   * @param id - Унікальний ідентифікатор товару
   * @param updateItemDto - Об'єкт з полями, які потрібно оновити
   * @returns Promise з оновленим товаром або null, якщо товар не знайдено
   */
  async update(
    id: number,
    updateItemDto: IUpdateItemDto
  ): Promise<Item | null> {
    const item = await this.findById(id);
    if (!item) return null;

    // Видаляє null значення та конвертує в DeepPartial<Item>
    // Це дозволяє оновлювати лише надані поля, залишаючи інші без змін
    const cleanUpdateDto = Object.entries(updateItemDto).reduce(
      (acc, [key, value]) => {
        if (value !== null) {
          acc[key as keyof Item] = value;
        }
        return acc;
      },
      {} as Partial<Item>
    );

    this.itemRepository.merge(item, cleanUpdateDto); // Об'єднує існуючий товар з новими даними
    return this.itemRepository.save(item); // Зберігає оновлений товар у базі даних
  }

  /**
   * Отримує медіа-посилання (фото та відео) для товару за його ID
   * @param id - Унікальний ідентифікатор товару
   * @returns Promise з об'єктом, що містить URL фото та відео, або null, якщо товар не знайдено
   */
  async getItemMedia(
    id: number
  ): Promise<{ photoUrl: string | null; videoUrl: string | null } | null> {
    const item = await this.itemRepository.findOneBy({ id });

    if (!item) return null;

    return {
      photoUrl: item.photoUrl || null,
      videoUrl: item.videoUrl || null,
    };
  }

  /**
   * Видаляє товар з бази даних
   * @param id - Унікальний ідентифікатор товару
   * @returns Promise з булевим значенням, що показує успішність видалення (true - видалено успішно)
   */
  async remove(id: number): Promise<boolean> {
    const result = await this.itemRepository.delete(id);
    return result.affected ? result.affected > 0 : false; // Перевіряє, чи було щось видалено
  }
}
