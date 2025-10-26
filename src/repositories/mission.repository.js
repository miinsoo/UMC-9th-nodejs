import { prisma } from "../db.config.js";
import { convertBigIntsToNumbers } from "../libs/ dataTransformer.js";

class MissionRepository {
    constructor() {}

    async addMission(missionData) {
        try {
            console.log("Adding mission with data:", missionData);
            const result = await prisma.mission.create({
                data: {
                    storeId: missionData.storeId,
                    minPaymentAmount: missionData.minPaymentAmount,
                    rewardPoints: missionData.rewardPoints,
                    deadLine: missionData.deadLine,
                },
            });
            console.log("test");
            return convertBigIntsToNumbers(result);
        } catch (err) {
            console.error(err);
            throw new Error(`미션 추가 중 오류가 발생했습니다: ${err.message}`);
        }
    }

    async getMissionById(missionId) {
        try {   
            const result = await prisma.mission.findUnique({
                where: {
                    id: missionId,
                },
            });
            const storeName = await prisma.store.findUnique({
                where: {
                    id: result.storeId,
                },
                select: {
                    name: true,
                },
            });
            result.storeName = storeName ? storeName.name : null;
            return convertBigIntsToNumbers(result);
        } catch (err) {
            console.error(err);
            throw new Error(`미션 조회 중 오류가 발생했습니다: ${err.message}`);
        }
    }

    async getMissionByStoreId(storeId) {
        try {
            const result = await prisma.mission.findMany({
                where: {
                    storeId: storeId,
                },
            });
            return result.map(convertBigIntsToNumbers);
        } catch (err) {
            console.error(err);
            throw new Error(`미션 조회 중 오류가 발생했습니다: ${err.message}`);
        }
    }
}

export default MissionRepository;