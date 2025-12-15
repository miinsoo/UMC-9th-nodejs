import { prisma } from "../db.config.js";
import { InternalServerError, NotFoundError } from "../middlewares/error.js";
import { convertBigIntsToNumbers } from "../libs/ dataTransformer.js";

class ReviewRepository {
    constructor() {}   
    async addReview(reviewData) {
        try {
            const result = await prisma.review.create({
                data: {
                    storeId: reviewData.storeId,
                    userId: reviewData.userId,
                    text: reviewData.text,
                    rating: reviewData.rating,
                },
            });
            return convertBigIntsToNumbers(result);
        } catch (err) {
            console.error(err);
            throw new InternalServerError('리뷰 추가 중에 데이터베이스 오류가 발생했습니다.');
        }
    }

    async addReviewImages(reviewId, imageUrls) {
        try {
            const ops = imageUrls.map((url) =>
                prisma.reviewImg.create({
                    data: {
                        reviewId: reviewId,
                        imgUrl: url,
                    },
                })
            );

            await prisma.$transaction(ops);
            return;
        } catch (err) {
            console.error(err);
            throw new InternalServerError('리뷰 이미지 추가 중에 데이터베이스 오류가 발생했습니다.');
        }
    }

    async getReviewById(reviewId) {
        try {
            const result = await prisma.review.findUnique({
                where: {
                    id: reviewId,
                },
                include: {
                    reviewImgs: true,
                    store: {
                        select: {
                            name: true,
                        },
                    },
                },
            });

            if (!result) {
                return null;
            }

            return convertBigIntsToNumbers({
                id: result.id,
                storeId: result.storeId,
                storeName: result.store.name,
                userId: result.userId,
                text: result.text,
                rating: result.rating,
                images: result.reviewImgs.map(img => img.imgUrl),
                createdAt: result.createdAt,
            });
        } catch (err) {
            console.error(err);
            throw new InternalServerError('리뷰 정보를 가져오는 중에 데이터베이스 오류가 발생했습니다.');
        }
    }
}

export default ReviewRepository;