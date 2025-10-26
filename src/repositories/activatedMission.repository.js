import { prisma } from "../db.config.js";
import { InternalServerError, NotFoundError } from "../middlewares/error.js";
import { convertBigIntsToNumbers } from "../libs/ dataTransformer.js";

class ActivatedMissionRepository {
    constructor() {}
    async addActivatedMission(activatedMissionData) {
        try {
            const result = await prisma.activatedMission.create({
                data: {
                    missionId: activatedMissionData.missionId,
                    userId: activatedMissionData.userId,
                    state: 'InProgress',
                },
            });
            return convertBigIntsToNumbers(result);
        } catch (err) {
            console.error(err);
            throw new InternalServerError('활성화된 미션 추가 중에 데이터베이스 오류가 발생했습니다.');
        }
    }

    async getActivatedMissionById(activatedMissionId) {
        try { 
            const result = await prisma.activatedMission.findUnique({
                where: {
                    id: activatedMissionId,
                },
            });
            return convertBigIntsToNumbers(result);
        } catch (err) {
            console.error(err);
            throw new InternalServerError('활성화된 미션 조회 중에 데이터베이스 오류가 발생했습니다.');
        }
    }
}

export default ActivatedMissionRepository;