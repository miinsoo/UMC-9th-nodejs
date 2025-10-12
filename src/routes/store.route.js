import expresss from "express";
import StoreController from "../controllers/store.controller.js";

const router = expresss.Router();

const storeRouter = (storeService) => {
    const storeController = new StoreController(storeService);
    router.post("/missions/activated", storeController.handleAddStore.bind(storeController));
    return router;
}

export default storeRouter;