import expresss from "express";
import ActivatedMissionController from "../controllers/activatedMission.controller.js";

const router = expresss.Router();

const activatedMissionRouter = (activatedMissionService) => {
    const activatedMissionController = new ActivatedMissionController(activatedMissionService);
    router.post("/activated-missions", activatedMissionController.handleAddActivatedMission.bind(activatedMissionController));
    return router;
}

export default activatedMissionRouter;