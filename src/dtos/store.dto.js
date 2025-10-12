export const createStoreRequest = (body) => {
  return {
    storeName: body.storeName,
    storeAddress: body.storeAddress,
    foodType: body.foodType,
    town: body.town,
  };
};

export const createStoreResponse = (store) => {
  return {
    storeId: store.store_id,
    storeName: store.store_name,
    storeAddress: store.store_address,
    foodType: store.food_type_id,
    town: body.town_id,
    createdAt: store.created_at
  };
};