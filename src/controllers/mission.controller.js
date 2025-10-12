import { createMissionRequest } from "../dtos/mission.dto";

class MissionController {
    constructor(missionService) {
        this.missionService = missionService;
    }

    async handleAddMission(req, res, next) {
        try {
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