import { StatusCodes } from "http-status-codes";
import { createActivatedMissionRequest, getActivatedMissionRequest, completeActivatedMissionRequest } from "../dtos/activatedMission.dto.js";

class ActivatedMissionController {
    constructor(activatedMissionService) {
        this.activatedMissionService = activatedMissionService;
    }

    async handleAddActivatedMission(req, res, next) {
        try {
            console.log("활성화된 미션 추가 요청 받음");
            const activatedMissionData = req.body;
            const userId = req.user.id;
            const newActivatedMission = await this.activatedMissionService.addActivatedMission(createActivatedMissionRequest(activatedMissionData, userId));
            return res.status(StatusCodes.CREATED).success({
                message: "활성화된 미션을 성공적으로 추가했습니다.",
                data: newActivatedMission,
            });
        } catch (error) {
            next(error);
        }
    }
    async handleGetActivatedMission(req, res, next) {
        try {
            console.log("활성화된 미션 조회 요청 받음");
            const userId = req.user.id;
            const activatedMission = await this.activatedMissionService.getActivatedMission(getActivatedMissionRequest(userId));
            console.log(activatedMission);
            return res.status(StatusCodes.OK).success({
                message: "활성화된 미션을 성공적으로 조회했습니다.",
                data: activatedMission,
            });
        } catch (error) {
            next(error);
        }
    }

    async handleCompleteActivatedMission(req, res, next) {
        try {
            console.log("활성화된 미션 완료 요청 받음");
            const activatedMissionData = req.body;
            const userId = req.user.id;
            const completedActivatedMission = await this.activatedMissionService.completeActivatedMission(completeActivatedMissionRequest(activatedMissionData, userId));
            return res.status(StatusCodes.OK).success({
                message: "활성화된 미션을 성공적으로 완료했습니다.",
                data: completedActivatedMission,
            });
        } catch (error) {
            next(error);
        }
    }
}

export default ActivatedMissionController;
