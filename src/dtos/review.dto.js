export const createReviewRequest = (body, userId) => {
  return {
    storeId: body.store_id,
    userId: BigInt(userId),
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
