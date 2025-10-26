import { createMissionRequest, getMissionByStoreIdRequest } from "../dtos/mission.dto.js";

class MissionController {
    constructor(missionService) {
        this.missionService = missionService;
    }

    async handleAddMission(req, res, next) {
        try {
            console.log("미션 추가 요청 받음");
            console.log("Content-Type:", req.headers['content-type']);
            console.log("request body:", req.body);
            const missionData = req.body;
            const newMission = await this.missionService.addMission(createMissionRequest(missionData));
            console.log("New Mission:", newMission);
            return res.success({
                code: 201,
                message: "가게를 성공적으로 추가했습니다.",
                result: newMission,
            });
        } catch (error) {
            next(error);
        }       
    }
    async handleGetMissionByStoreId(req, res, next) {
        try {
            console.log("미션 조회 요청 받음");
            const params = req.params;
            const mission = await this.missionService.getMissionByStoreId(getMissionByStoreIdRequest(params));
            console.log(mission);
            return res.success({
                code: 200,
                message: "미션을 성공적으로 조회했습니다.",
                result: mission,
            });
        } catch (error) {
            next(error);
        }
    }
}

export default MissionController;