// import Router
import missionRouter from "../routes/mission.route.js";
import reviewRouter from "../routes/review.route.js";
import storeRouter from "../routes/store.route.js";
import activatedMissionRouter from "../routes/activatedMission.route.js";
// import controller
import MissionController from "../controllers/mission.controller.js";
import ReviewController from "../controllers/review.controller.js";
import StoreController from "../controllers/store.controller.js";
import ActivatedMissionController from "../controllers/activatedMission.controller.js";
// import service
import MissionService from "../services/mission.service.js";
import ReviewService from "../services/review.service.js";
import StoreService from "../services/store.service.js";
import ActivatedMissionService from "../services/activatedMission.service.js";
// import repository
import MissionRepository from "../repositories/mission.repository.js";
import ReviewRepository from "../repositories/review.repository.js";
import StoreRepository from "../repositories/store.repository.js";
import ActivatedMissionRepository from "../repositories/activatedMission.repository.js";

console.log("loader index.js 실행됨");
// create repository
const missionRepository = new MissionRepository();
const reviewRepository = new ReviewRepository();
const storeRepository = new StoreRepository();
const activatedMissionRepository = new ActivatedMissionRepository();

// create service
const missionService = new MissionService(missionRepository, storeRepository);
const reviewService = new ReviewService(reviewRepository, storeRepository);
const storeService = new StoreService(storeRepository);
const activatedMissionService = new ActivatedMissionService(activatedMissionRepository, missionRepository);

// create controller
const missionController = new MissionController(missionService);
const reviewController = new ReviewController(reviewService);
const storeController = new StoreController(storeService);
const activatedMissionController = new ActivatedMissionController(activatedMissionService);

// create router
const missionRoute = missionRouter(missionController, activatedMissionController);
const reviewRoute = reviewRouter(reviewController);
const storeRoute = storeRouter(storeController);
const activatedMissionRoute = activatedMissionRouter(activatedMissionController);

export {
    missionRoute,
    reviewRoute,
    storeRoute,
    activatedMissionRoute
};
