import express from "express";

const missionRouter = (missionController, activatedMissionController) => {
    const router = express.Router();
    router.post("/", missionController.handleAddMission.bind(missionController));
    router.post("/activated", activatedMissionController.handleAddActivatedMission.bind(activatedMissionController));

  return router;
}

export default missionRouter;