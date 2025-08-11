// import Redis from "ioredis";

// export const redis = new Redis(
//   process.env.REDIS_URL || "redis://localhost:6379"
// );

// Ініціалізація Redis-клієнта, що підключається до локального Redis-сервера
// export const redis = new Redis({
//   host: process.env.REDIS_URL, // Хост Redis-сервера
//   port: 6379, // Порт Redis-сервера (за замовчуванням 6379)
// });

// Обробка помилок з'єднання з Redis
// redis.on("error", (err) => {
//   console.error("[Redis] Connection error:", err.message);
// });

// Вивід повідомлення при успішному підключенні
// redis.on("connect", () => {
//   console.log("[Redis] Connected successfully");
// });

//
// ------------------ Операції з refresh токенами ------------------
//

/**
 * Зберігає refresh токен у Redis по userId та окремо по самому токену.
 * @param userId - Ідентифікатор користувача
 * @param token - Refresh токен
 */
// export const storeRefreshToken = async (userId: number, token: string) => {
//   const keyByUserId: string = `refresh:${userId}`; // Ключ за userId
//   const keyByToken: string = `refresh_token:${token}`; // Ключ за токеном

//   const expiration: number = 7 * 24 * 60 * 60; // Термін життя токена: 7 днів у секундах

//   await Promise.all([
//     redis.set(keyByUserId, token, "EX", expiration), // Зберігаємо токен по userId
//     redis.set(keyByToken, userId.toString(), "EX", expiration), // Зберігаємо userId по токену
//   ]);
// };

/**
 * Отримує токен користувача за його userId.
 * @param userId - Ідентифікатор користувача
 * @returns токен або null
 */
// export const getRefreshToken = async (
//   userId: number
// ): Promise<string | null> => {
//   const key: string = `refresh:${userId}`;
//   return await redis.get(key);
// };

/**
 * Видаляє токен користувача як за userId, так і за токеном.
 * @param userId - Ідентифікатор користувача
 */
// export const removeRefreshToken = async (userId: number) => {
//   const keyByUserId: string = `refresh:${userId}`;
//   const token: string | null = await redis.get(keyByUserId); // Отримуємо токен, якщо існує

//   if (token) {
//     const keyByToken: string = `refresh_token:${token}`;
//     await redis.del(keyByUserId, keyByToken); // Видаляємо обидва ключі
//   }
// };

/**
 * Отримує userId по refresh токену.
 * @param token - Refresh токен
 * @returns userId або null
 */
// export const getUserIdByToken = async (
//   token: string
// ): Promise<number | null> => {
//   const key: string = `refresh_token:${token}`;
//   const userIdStr: string | null = await redis.get(key); // Отримуємо userId як рядок

//   return userIdStr ? parseInt(userIdStr) : null;
// };
