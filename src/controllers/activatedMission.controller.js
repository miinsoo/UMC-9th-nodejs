import { createActivatedMissionRequest, getActivatedMissionRequest, completeActivatedMissionRequest } from "../dtos/activatedMission.dto.js";

class ActivatedMissionController {
    constructor(activatedMissionService) {
        this.activatedMissionService = activatedMissionService;
    }

    async handleAddActivatedMission(req, res, next) {
        try {
            console.log("활성화된 미션 추가 요청 받음");
            const activatedMissionData = req.body;
            const newActivatedMission = await this.activatedMissionService.addActivatedMission(createActivatedMissionRequest(activatedMissionData));
            return res.success({
                code: 201,
                message: "가게를 성공적으로 추가했습니다.",
                result: newActivatedMission,
            });
        } catch (error) {
            next(error);
        }
    }
    async handleGetActivatedMission(req, res, next) {
        try {
            console.log("활성화된 미션 조회 요청 받음");
            const queries = req.query;
            const activatedMission = await this.activatedMissionService.getActivatedMission(getActivatedMissionRequest(queries));
            console.log(activatedMission);
            return res.success({
                code: 200,
                message: "활성화된 미션을 성공적으로 조회했습니다.",
                result: activatedMission,
            });
        } catch (error) {
            next(error);
        }
    }

    async handleCompleteActivatedMission(req, res, next) {
        try {
            console.log("활성화된 미션 완료 요청 받음");
            const activatedMissionData = req.body;
            const completedActivatedMission = await this.activatedMissionService.completeActivatedMission(completeActivatedMissionRequest(activatedMissionData));
            return res.success({
                code: 200,
                message: "활성화된 미션을 성공적으로 완료했습니다.",
                result: completedActivatedMission,
            });
        } catch (error) {
            next(error);
        }
    }
}

export default ActivatedMissionController;
