import { createStoreResponse } from "../dtos/store.dto.js";
import { NotFoundError, InternalServerError, CustomError } from "../middlewares/error.js";

class StoreService {
  constructor(storeRepository) {
    this.storeRepository = storeRepository; 
  }
    async addStore(storeData) {
        try {
            const newStore = await this.storeRepository.addStore(storeData);
            if (!newStore) {
                throw new NotFoundError('가게를 찾을 수 없습니다.', storeData);
            }
            return createStoreResponse(newStore);
        } catch (error) {
            if (error instanceof CustomError) {
                console.error(error);
                throw error;
            }
            console.error(error);
            throw new InternalServerError('가게 추가 중에 오류가 발생했습니다.', storeData);
        }
    }   
}

export default StoreService;