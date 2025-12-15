import e from "cors";
import { createStoreRequest } from "../dtos/store.dto.js";
import { StatusCodes } from "http-status-codes";

class StoreController {
    constructor(storeService) {
        this.storeService = storeService;
    }

    async handleAddStore(req, res, next) {
        try {
            console.log("가게 추가 요청 받음");
            const storeData = req.body;
            const userId = req.user.id;
            const newStore = await this.storeService.addStore(createStoreRequest(storeData, userId));
            return res.status(StatusCodes.CREATED).success({
                message: "가게를 성공적으로 추가했습니다.",
                data: newStore,
            });
        } catch (error) {
            next(error);
        }       
    }

    
}

export default StoreController;