import { pool } from "../db.config.js";
import { InternalServerError, NotFoundError } from "../middlewares/error.js"; 

class StoreRepository {
    constructor() {}  
    async addStore(storeData) {
        const conn = await pool.getConnection();
        try {
            const [result] = await conn.query(
                `INSERT INTO stores (store_name, store_address, food_type_id) VALUES (?, ?, ?)`,
                [storeData.storeName, storeData.storeAddress, storeData.foodType]
            );
            return result.insertId;
        } catch (err) {
            throw new InternalServerError('가게 추가 중에 데이터베이스 오류가 발생했습니다.');
        } finally {
            conn.release();
        }
    }
    async getStoreById(storeId) {
        const conn = await pool.getConnection();    
        try {
            const [stores] = await conn.query(
                `SELECT * FROM stores WHERE store_id = ?`,
                [storeId]
            );
            return stores.length > 0 ? stores[0] : null;
        } catch (err) {
            if (err instanceof NotFoundError) {
                throw err;
            }
            console.error(err);
            throw new InternalServerError('가게 정보를 가져오는 중에 데이터베이스 오류가 발생했습니다.');
        } finally {
            conn.release();
        }
    }
}

export default StoreRepository;

