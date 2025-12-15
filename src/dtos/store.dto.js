export const createStoreRequest = (body, userId) => {
  return {
    storeName: body.store_name,
    storeAddress: body.store_address,
    foodType: body.food_type,
    town: body.town,
    userId: BigInt(userId),
  };
};

export const createStoreResponse = (store) => {
  return {
    storeId: store.storeId,
    storeName: store.name,
    storeAddress: store.address,
    foodType: store.foodTypeId,
    town: store.townId,
  };
};
