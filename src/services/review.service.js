import { createReviewResponse } from "../dtos/review.dto.js";
import { NotFoundError, InternalServerError } from "../middlewares/error.js";   

class ReviewService {
    constructor(reviewRepository, storeRepository) {
        this.reviewRepository = reviewRepository;
        this.storeRepository = storeRepository; 
    }  
    async addReview(reviewData) {
        try {
            // 가게가 존재하는지 확인
            // if (!await this.storeRepository.getStoreById(reviewData.storeId)) {
            //     throw new NotFoundError('가게를 찾을 수 없습니다.');
            // }
            const newReview = await this.reviewRepository.addReview(reviewData);

            // 이미지 업로드
            // TODO: s3에서 이미지 url를 가져오는 로직
            const imageUrl = ["https://example.com/image1.jpg", "https://example.com/image2.jpg"]; // 예시 URL
            if (imageUrl.length === reviewData.imgCount) {
                await this.reviewRepository.addReviewImages(newReview.id, imageUrl);
            }
            else {
                throw new InternalServerError('S3에서 충분한 이미지 url을 가져오지 못했습니다.');
            }

            // 추가된 리뷰 정보 반환
            const review = await this.reviewRepository.getReviewById(newReview.id);
            if (!review) {
                throw new NotFoundError('리뷰를 찾을 수 없습니다.');
            }
            return createReviewResponse(review);
        } catch (error) {
            if (error instanceof NotFoundError) {
                throw error;
            }
            console.error(error);
            throw new InternalServerError('리뷰 추가 중에 오류가 발생했습니다.');
        }    
    }
}

export default ReviewService;