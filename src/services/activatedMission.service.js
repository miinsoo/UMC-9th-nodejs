import { createActivatedMissionResponse } from "../dtos/activatedMission.dto.js";
import { NotFoundError, InternalServerError } from "../middlewares/error.js";   

class ActivatedMissionService {
    constructor(activatedMissionRepository, missionRepository) {
        this.activatedMissionRepository = activatedMissionRepository;
        this.missionRepository = missionRepository;
    }   
    async addActivatedMission(activatedMissionData) {
        try {
            console.log("서비스 레이어의 addActivatedMission 도달");
            // 미션이 존재하는지 확인   
            if (!await this.missionRepository.getMissionById(activatedMissionData.missionId)) {
                throw new NotFoundError('미션을 찾을 수 없습니다.');
            }
            const newActivatedMission = await this.activatedMissionRepository.addActivatedMission(activatedMissionData);
            const activatedMission = await this.activatedMissionRepository.getActivatedMissionById(newActivatedMission);
            if (!activatedMission) {
                throw new NotFoundError('활성화된 미션을 찾을 수 없습니다.');
            }
            return createActivatedMissionResponse(activatedMission);
        } catch (error) {
            if (error instanceof NotFoundError) {
                throw error;
            }   
            console.error(error);
            throw new InternalServerError('활성화된 미션 추가 중에 오류가 발생했습니다.');
        }
    }   
}   

export default ActivatedMissionService;