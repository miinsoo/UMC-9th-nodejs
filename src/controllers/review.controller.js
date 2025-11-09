import { StatusCodes } from "http-status-codes";
import { createReviewRequest } from "../dtos/review.dto.js";

class ReviewController {
    constructor(reviewService) {
        this.reviewService = reviewService;
    }

    async handleAddReview(req, res, next) {
        try {
            const reviewData = req.body;
            const newReview = await this.reviewService.addReview(createReviewRequest(reviewData));
            return res.status(StatusCodes.CREATED).success({
                message: "리뷰를 성공적으로 추가했습니다.",
                data: newReview,
            });
        } catch (error) {
            next(error);
        }       
    }

}

export default ReviewController;
