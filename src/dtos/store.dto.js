export const createStoreRequest = (body) => {
  return {
    storeName: body.store_name,
    storeAddress: body.store_address,
    foodType: body.food_type,
    town: body.town,
    userId: body.user_id,
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
