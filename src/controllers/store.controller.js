import e from "cors";
import { createStoreRequest } from "../dtos/store.dto";

class StoreController {
    constructor(storeService) {
        this.storeService = storeService;
    }

    async handleAddStore(req, res, next) {
        try {
            const storeData = req.body;
            const newStore = await this.storeService.addStore(createStoreRequest(storeData));
            return res.success({
                code: 201,
                message: "가게를 성공적으로 추가했습니다.",
                result: newStore,
            });
        } catch (error) {
            next(error);
        }       
    }

    
}

export default StoreController;