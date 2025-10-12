import express from "express";
import MissionController from "../controllers/mission.controller.js";
import ActivatedMissionController from "../controllers/activatedMission.controller.js";

const missionRouter = (missionService, activatedMissionService) => {
    const router = express.Router();
    const missionController = new MissionController(missionService);
    router.post("/", missionController.handleAddMission.bind(missionController));

  const activatedMissionController = new ActivatedMissionController(activatedMissionService);
  router.post("/activated", activatedMissionController.handleAddActivatedMission.bind(activatedMissionController));

  return router;
}

export default missionRouter;