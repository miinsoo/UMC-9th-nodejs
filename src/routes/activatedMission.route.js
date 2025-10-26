import express from "express";

const activatedMissionRouter = (activatedMissionController) => {
    const router = express.Router();
    router.post("/", activatedMissionController.handleAddActivatedMission.bind(activatedMissionController));
    router.get("/", activatedMissionController.handleGetActivatedMission.bind(activatedMissionController));
    router.patch("/complete", activatedMissionController.handleCompleteActivatedMission.bind(activatedMissionController));
    return router;
}
export default activatedMissionRouter;