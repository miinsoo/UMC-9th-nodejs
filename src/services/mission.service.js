import { createMissionResponse, getMissionByStoreIdResponse } from "../dtos/mission.dto.js";
import { NotFoundError, InternalServerError } from "../middlewares/error.js";   

class MissionService {
    constructor(missionRepository, storeRepository) {
        this.missionRepository = missionRepository;
        this.storeRepository = storeRepository; 
    }
    async addMission(missionData) {
        try {
            // 가게가 존재하는지 확인  
            if (!await this.storeRepository.getStoreById(missionData.storeId)) {
                throw new NotFoundError('가게를 찾을 수 없습니다.');
            }
            const newMission = await this.missionRepository.addMission(missionData);
            if (!newMission) {
                throw new NotFoundError('미션을 찾을 수 없습니다.');
            }
            console.log("미션 서비스 레이어 완료");
            return createMissionResponse(newMission);
        } catch (error) {
            if (error instanceof NotFoundError) {
                throw error;
            }  
            console.error(error);
            throw new InternalServerError('미션 추가 중에 오류가 발생했습니다.');
        }
    }   
    async getMissionByStoreId(missionData) {
        try {
            console.log("서비스 레이어의 getMissionByStoreId 도달");
            if (!await this.storeRepository.getStoreById(missionData.storeId)) {
                throw new NotFoundError('가게를 찾을 수 없습니다.');
            }
            const missions = await this.missionRepository.getMissionByStoreId(missionData.storeId);
            console.log("미션 조회 완료:", missions);
            return missions.map(mission => getMissionByStoreIdResponse(mission));
        } catch (error) {
            if (error instanceof NotFoundError) {
                throw error;
            }   
            console.error(error);
            throw new InternalServerError('미션 조회 중에 오류가 발생했습니다.');
        }
    }
}

export default MissionService;