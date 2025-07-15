import { Router } from "express";
import { ItemController } from "../controllers/item.controller";

const router = Router();
const itemController = new ItemController();

// GET /api/items - Get all items
router.get("/", itemController.getAll);
router.get("/mans", itemController.getMenItems);
router.get("/womens", itemController.getWomensItems);
router.get("/kids", itemController.getKidsItems);
router.get("/new", itemController.getNewItems);
router.get("/accessories", itemController.getAccessoriesItems);

// GET /api/items/:id - Get item by ID
router.get("/:id", itemController.getById);

// POST /api/items - Create new item
router.post("/", itemController.create);

// PUT /api/items/:id - Update item
router.put("/:id", itemController.update);

// DELETE /api/items/:id - Delete item
router.delete("/:id", itemController.delete);

export default router;
