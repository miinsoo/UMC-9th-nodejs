import { prisma } from "../db.config.js";
import { InternalServerError, NotFoundError } from "../middlewares/error.js"; 
import { convertBigIntsToNumbers } from "../libs/ dataTransformer.js";


class StoreRepository {
    constructor() {}  
    async addStore(storeData) {
        try {
            const result = await prisma.store.create({
                data: {
                    name: storeData.storeName,
                    address: storeData.storeAddress,
                    foodTypeId: storeData.foodType,
                    townId: storeData.town,
                    userId: storeData.userId,
                },
            });
            return convertBigIntsToNumbers(result);
        } catch (err) {
            console.error(err);
            throw new InternalServerError('가게 추가 중에 데이터베이스 오류가 발생했습니다.');
        }
    }
    async getStoreById(storeId) {
        try {
            const result = await prisma.store.findUnique({
                where: {
                    id: storeId,
                },
            });
            return convertBigIntsToNumbers(result);
        } catch (err) {
            if (err instanceof NotFoundError) {
                throw err;
            }
            console.error(err);
            throw new InternalServerError('가게 조회 중에 데이터베이스 오류가 발생했습니다.');
        }
    }
}

export default StoreRepository;

