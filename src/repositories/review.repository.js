import { pool } from "../config/db.config.js";
import { InternalServerError, NotFoundError } from "../middlewares/error.js";

class ReviewRepository {
    constructor() {}   
    async addReview(reviewData) {
        const conn = await pool.getConnection();
        try {
            const [result] = await conn.query(
                `INSERT INTO reviews (store_id, user_id, text, rating) VALUES (?, ?, ?, ?)`,
                [reviewData.storeId, reviewData.userId, reviewData.text, reviewData.rating]
            );
            return result.insertId;
        } catch (err) {
            throw new InternalServerError('리뷰 추가 중에 데이터베이스 오류가 발생했습니다.');
        } finally {
            conn.release();
        }  
    }

    async addReviewImages(reviewId, imageUrls) {
        const conn = await pool.getConnection();
        try {
            // S3에서 이미지 URL을 받아서 review_imgs 테이블에 삽입
            const insertPromises = imageUrls.map(url => {
                return conn.query(
                    `INSERT INTO review_imgs (review_id, review_img) VALUES (?, ?)`,
                    [reviewId, url]
                );
            });
            await Promise.all(insertPromises);
            return;
        } catch (err) {
            throw new InternalServerError('리뷰 이미지 추가 중에 데이터베이스 오류가 발생했습니다.');
        } finally {
            conn.release();
        }
    }

    async getReviewById(reviewId) {
        const conn = await pool.getConnection();
        try {
            const [reviews] = await conn.query(
                `SELECT r.review_id, r.store_id, s.name, r.user_id, r.text, r.rating, 
                        GROUP_CONCAT(ri.review_img) AS images, r.created_at
                 FROM reviews r
                 LEFT JOIN review_imgs ri ON r.review_id = ri.review_id
                 JOIN stores s ON r.store_id = s.store_id
                 WHERE r.review_id = ?
                 GROUP BY r.review_id, r.store_id, s.name, r.user_id, r.text, r.rating, r.created_at`,
                [reviewId]
            );
            const review = reviews[0];
            if (!review) {
                return null;
            }
            return {
                ...review, 
                images: review.images ? review.images.split(',') : [], 
            };
        } catch (err) {
            if (err instanceof NotFoundError) {
                throw err;
            }
            console.error(err);
            throw new InternalServerError('리뷰 정보를 가져오는 중에 데이터베이스 오류가 발생했습니다.');
        } finally {
            conn.release();
        }
    }
}

export default ReviewRepository;