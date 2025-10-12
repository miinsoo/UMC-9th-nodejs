import { createStoreResponse } from "../dtos/store.dto.js";
import { NotFoundError, InternalServerError } from "../middlewares/error";

class StoreService {
  constructor(storeRepository) {
    this.storeRepository = storeRepository; 
  }
    async addStore(storeData) {
        try {
            const newStore = await this.storeRepository.addStore(storeData);
            const store = await this.storeRepository.getStoreById(newStore);
            if (!store) {
                throw new NotFoundError('가게를 찾을 수 없습니다.');
            }
            return createStoreResponse(store);
        } catch (error) {
            if (error instanceof NotFoundError) {
                throw error;
            }
            console.error(error);
            throw new InternalServerError('가게 추가 중에 오류가 발생했습니다.');
        }
    }   
}

export default StoreService;