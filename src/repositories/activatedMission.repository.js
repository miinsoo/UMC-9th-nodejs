import { pool } from "../config/db.config.js";

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
            throw new Error(`활성화된 미션 추가 중 오류가 발생했습니다: ${err.message}`);
        } finally {
            conn.release();
        }
    }

    async getActivatedMissionById(activatedMissionId) {
        const conn = await pool.getConnection();
        try { 
            const [activatedMissions] = await conn.query(
                `SELECT * FROM activated_mission WHERE activated_mission_id = ?`,
                [activatedMissionId]
            );
            return activatedMissions.length > 0 ? activatedMissions[0] : null;
        } catch (err) {
            throw new Error(`활성화된 미션 조회 중 오류가 발생했습니다: ${err.message}`);
        } finally {
            conn.release();
        } 
    }
}

export default ActivatedMissionRepository;