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
    storeId: store.store_id,
    storeName: store.store_name,
    storeAddress: store.store_address,
    foodType: store.food_type_id,
    town: store.town_id,
  };
};