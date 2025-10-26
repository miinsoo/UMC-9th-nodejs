import { prisma } from "../db.config.js";

// User 데이터 삽입
export const addUser = async (data) => {
  try {
    const isExistEmail = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (isExistEmail) {
      return null;
    }
    const result = await prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        gender: data.gender,
        birth: data.birth,
        address: data.address,
        detailAddress: data.detailAddress,
        phoneNumber: data.phoneNumber,
        password: data.password,
      },
    });

    return result.id;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  }
}

// 사용자 정보 얻기
export const getUser = async (userId) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return null;
    }

    return user;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } 
};

// 음식 선호 카테고리 매핑
export const setPreference = async (userId, foodCategoryId) => {

  try {
    await primsa.userFoodType.create({
      data: {
        userId: userId,
        foodTypeId: foodCategoryId,
      },
    });
    return;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } 
};

// 사용자 선호 카테고리 반환
export const getUserPreferencesByUserId = async (userId) => {
  try {
    const preferences = await prisma.userFoodType.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        foodTypeId: 'asc',
      },
      include: {
        FoodType: {
          select: {
            name: true,
          },
        },
      },
    });

    return preferences;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  }
};
