import express from "express";

const activatedMissionRouter = (activatedMissionController, isLogin) => {
    const router = express.Router();
    router.post("/", isLogin, activatedMissionController.handleAddActivatedMission.bind(activatedMissionController));
    router.get("/", isLogin, activatedMissionController.handleGetActivatedMission.bind(activatedMissionController));
    router.patch("/complete", isLogin, activatedMissionController.handleCompleteActivatedMission.bind(activatedMissionController));
    return router;
}
export default activatedMissionRouter;