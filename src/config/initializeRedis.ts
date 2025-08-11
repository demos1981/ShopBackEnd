// import Redis from "ioredis";
// import dotenv from "dotenv";

// dotenv.config();

// const redis = new Redis(process.env.REDIS_URL!);

// const initializeRedis = async () => {
//   try {
//     const newEntityKey = "newEntity"; // Key for the new entity

//     // Перевірка, чи вже існує ключ
//     const existing = await redis.exists(newEntityKey);
//     if (existing) {
//       console.log(
//         `⚠️ Ключ "${newEntityKey}" вже існує. Ініціалізація пропущена.`
//       );
//       return process.exit(0);
//     }

//     const newEntityValue = {
//       id: "1",
//       name: "Sample Entity",
//       description: "This is a sample entity for Redis",
//       createdAt: new Date().toISOString(),
//     };

//     // Add the new entity to Redis
//     await redis.set(newEntityKey, JSON.stringify(newEntityValue));

//     console.log(`New entity added to Redis with key: ${newEntityKey}`);
//     process.exit(0); // Exit the script
//   } catch (error) {
//     console.error("Error initializing Redis entity:", error);
//     process.exit(1); // Exit with error
//   }
// };

// initializeRedis();
