import { createReviewRequest } from "../dtos/review.dto";

class reviewController {
    constructor(reviewService) {
        this.reviewService = reviewService;
    }

    async handleAddreview(req, res, next) {
        try {
            const reviewData = req.body;
            const newReview = await this.reviewService.addReview(createReviewRequest(reviewData));
            return res.success({
                code: 201,
                message: "가게를 성공적으로 추가했습니다.",
                result: newReview,
            });
        } catch (error) {
            next(error);
        }       
    }

    
}

export default reviewController;
