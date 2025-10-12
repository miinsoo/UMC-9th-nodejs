import expresss from "express";
import MissionController from "../controllers/mission.controller.js";

const router = expresss.Router();

const missionRouter = (missionService) => {
    const missionController = new MissionController(missionService);
    router.post("/missions", missionController.handleAddMission.bind(missionController));
    return router;
}

export default missionRouter;