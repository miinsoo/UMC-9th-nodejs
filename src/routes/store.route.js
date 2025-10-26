import express from "express";

const storeRouter = (storeController) => {
    const router = express.Router();
    router.post("/", storeController.handleAddStore.bind(storeController));

    return router;
}

export default storeRouter;