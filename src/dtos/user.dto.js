export const bodyToUser = (body) => {
  const birth = new Date(body.birth); 
  
  return {
    email: body.email, 
    name: body.name, 
    gender: body.gender, 
    birth, 
    address: body.address || "", 
    detailAddress: body.detailAddress || "", 
    phoneNumber: body.phoneNumber,
    preferences: body.preferences,
    password : body.password,
  };
};

export const userUpdateProfileRequest = (body) => {
  const birthDate = body.birthDate ? new Date(body.birthDate) : undefined;
  
  return {
    name: body.name, 
    gender: body.gender, 
    birthDate: birthDate, 
    highAddress: body.highAddress,
    lowAddress: body.lowAddress,
    phoneNumber: body.phoneNumber,
  };
};

export const userSignUpResponse = ({ user, preferences }) => {
  return {
    userId: user.id,
    email: user.email,
    name: user.name,
    gender: user.gender,
    address: user.highAddress, 
    detailAddress: user.lowAddress,
    phoneNumber: user.phoneNumber,
    userPoint: user.userPoint,
    preferences: preferences.map(pref => pref.foodType.name), 
  };
};