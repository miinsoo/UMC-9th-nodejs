export const createReviewRequest = (body) => {
  return {
    storeId: body.store_id,
    userId: body.user_id,
    text: body.text,
    rating: body.rating,
    imgCount: body.img_count,
  };
};

export const createReviewResponse = (review) => {
  return {
    reviewId: review.review_id,
    storeName: review.store_name,
    reviewImgUrls: review.review_img_urls,
  };
};