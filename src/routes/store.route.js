import expresss from "express";

const router = expresss.Router();

const storeRouter = (storeController) => {
    router.post("/", storeController.handleAddStore.bind(storeController));

    return router;
}

export default storeRouter;