import { pool } from "../db.config.js";


class MissionRepository {
    constructor() {}

    async addMission(missionData) {
        const conn = await pool.getConnection();
        try {
            const [result] = await conn.query(
                `INSERT INTO mission (store_id, min_payment_amount, reward_points, dead_line) VALUES (?, ?, ?, ?)`,
                [missionData.storeId, missionData.minPaymentAmount, missionData.rewardPoints, missionData.deadline]
            );
            return result.insertId;
        } catch (err) {
            throw new Error(`미션 추가 중 오류가 발생했습니다: ${err.message}`);
        } finally {
            conn.release();
        }
    }

    async getMissionById(missionId) {
        const conn = await pool.getConnection();
        try {
            const [missions] = await conn.query(
                `SELECT * FROM mission WHERE id = ?`,
                [missionId]
            );
            return missions.length > 0 ? missions[0] : null;
        } catch (err) {
            throw new Error(`미션 조회 중 오류가 발생했습니다: ${err.message}`);
        } finally {
            conn.release();
        }
    }
}

export default MissionRepository;