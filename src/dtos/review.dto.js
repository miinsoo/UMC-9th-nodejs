export const createReviewRequest = (body) => {
  return {
    storeId: body.storeId,
    userId: body.userId,
    text: body.text,
    rating: body.rating,
    imgCount: body.imgCount,
  };
};

export const createReviewResponse = (review) => {
  return {
    reviewId: review.review_id,
    storeName: review.store_name,
    reviewImgUrls: review.review_img_urls,
  };
};