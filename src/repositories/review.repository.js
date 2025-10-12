import { pool } from "../db.config.js";
import { InternalServerError, NotFoundError } from "../middlewares/error.js";

class ReviewRepository {
    constructor() {}   
    async addReview(reviewData) {
        const conn = await pool.getConnection();
        try {
            const [result] = await conn.query(
                `INSERT INTO review (store_id, user_id, text, rating) VALUES (?, ?, ?, ?)`,
                [reviewData.storeId, reviewData.userId, reviewData.text, reviewData.rating]
            );
            return result.insertId;
        } catch (err) {
            console.error(err);
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
                    `INSERT INTO review_img (review_id, img_url) VALUES (?, ?)`,
                    [reviewId, url]
                );
            });
            await Promise.all(insertPromises);
            return;
        } catch (err) {
            console.error(err);
            throw new InternalServerError('리뷰 이미지 추가 중에 데이터베이스 오류가 발생했습니다.');
        } finally {
            conn.release();
        }
    }

    async getReviewById(reviewId) {
        const conn = await pool.getConnection();
        try {
            const [reviews] = await conn.query(
                `SELECT r.id, r.store_id, s.name, r.user_id, r.text, r.rating, 
                        GROUP_CONCAT(ri.img_url) AS images, r.created_at
                 FROM review r
                 LEFT JOIN review_img ri ON r.id = ri.review_id
                 JOIN store s ON r.store_id = s.id
                 WHERE r.id = ?
                 GROUP BY r.id, r.store_id, s.name, r.user_id, r.text, r.rating, r.created_at`,
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