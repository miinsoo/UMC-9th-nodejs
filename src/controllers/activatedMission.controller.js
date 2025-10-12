import { createActivatedMissionRequest } from "../dtos/activatedMission.dto.js";

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
    
}

export default ActivatedMissionController;
