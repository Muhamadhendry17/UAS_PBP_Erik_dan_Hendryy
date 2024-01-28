import express from "express";
import userController from "../controller/user-controller.js";
import cardController from "../controller/card-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";

const userRouter = new express.Router();
userRouter.use(authMiddleware);

// User API
userRouter.get("/api/users/current", userController.get);
userRouter.patch("/api/users/current", userController.update);
userRouter.delete("/api/users/logout", userController.logout);

// card API
userRouter.post("/api/cards", cardController.create);
userRouter.get("/api/cards/:cardId", cardController.get);
userRouter.put("/api/cards/:cardId", cardController.update);
userRouter.delete("/api/cards/:cardId", cardController.remove);
userRouter.get("/api/cards", cardController.search);

export { userRouter };
