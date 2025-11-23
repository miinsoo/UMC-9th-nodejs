import express from "express";

const storeRouter = (storeController, isLogin) => {
    const router = express.Router();
    router.post("/", isLogin, storeController.handleAddStore.bind(storeController));

    return router;
}

export default storeRouter;