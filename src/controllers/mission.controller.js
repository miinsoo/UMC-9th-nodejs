import { createMissionRequest } from "../dtos/mission.dto.js";

class MissionController {
    constructor(missionService) {
        this.missionService = missionService;
    }

    async handleAddMission(req, res, next) {
        try {
            console.log("미션 추가 요청 받음");
            const missionData = req.body;
            const newMission = await this.missionService.addMission(createMissionRequest(missionData));
            return res.success({
                code: 201,
                message: "가게를 성공적으로 추가했습니다.",
                result: newMission,
            });
        } catch (error) {
            next(error);
        }       
    }
    
}

export default MissionController;