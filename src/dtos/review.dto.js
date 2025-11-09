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
    reviewId: review.id,
    storeName: review.storeName,
    reviewImgUrls: review.images,
  };
};
