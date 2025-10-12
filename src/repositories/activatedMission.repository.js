import { pool } from "../db.config.js";
import { InternalServerError, NotFoundError } from "../middlewares/error.js";

class ActivatedMissionRepository {
    constructor() {}
    async addActivatedMission(activatedMissionData) {
        const conn = await pool.getConnection();
        try { 
            const [result] = await conn.query(
                `INSERT INTO activated_mission (mission_id, user_id, state) VALUES (?, ?, ?)`,
                [activatedMissionData.missionId, activatedMissionData.userId, 'InProgress']
            );
            return result.insertId;
        } catch (err) {
            console.error(err);
            throw new InternalServerError('활성화된 미션 추가 중에 데이터베이스 오류가 발생했습니다.');
        } finally {
            conn.release();
        }
    }

    async getActivatedMissionById(activatedMissionId) {
        const conn = await pool.getConnection();
        try { 
            const [activatedMissions] = await conn.query(
                `SELECT * FROM activated_mission WHERE id = ?`,
                [activatedMissionId]
            );
            return activatedMissions.length > 0 ? activatedMissions[0] : null;
        } catch (err) {
            throw new InternalServerError('활성화된 미션 조회 중에 데이터베이스 오류가 발생했습니다.');
        } finally {
            conn.release();
        } 
    }
}

export default ActivatedMissionRepository;