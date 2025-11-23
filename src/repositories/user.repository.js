import { prisma } from "../db.config.js";
import { InternalServerError } from "../middlewares/error.js";
import { convertBigIntsToNumbers } from "../libs/ dataTransformer.js";

class UserRepository {
  constructor() {}

  async addUser(data) {
    try {
      // 이메일 중복 검사
      const isExistEmail = await prisma.user.findUnique({
        where: { email: data.email },
      });

      if (isExistEmail) {
        return null; // 충돌 시 null 반환 (Service Layer에서 ConflictError로 처리)
      }
      
      const result = await prisma.user.create({
        data: {
          email: data.email,
          name: data.name,
          gender: data.gender,
          birthDate: data.birth, // DB 스키마에 맞게 birthDate 사용
          highAddress: data.address,
          lowAddress: data.detailAddress,
          phoneNumber: data.phoneNumber,
          password: data.password, // 해싱된 비밀번호 사용
          userPoint: 0,          
          isBusiness: false,     
          isActive: true,        
        },
      });

      // 가입된 사용자 ID 반환
      return Number(result.id);
    } catch (err) {
      console.error(err);
      throw new InternalServerError('사용자 추가 중에 데이터베이스 오류가 발생했습니다.');
    }
  }

  async getUser(userId) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      return convertBigIntsToNumbers(user);
    } catch (err) {
      console.error(err);
      throw new InternalServerError('사용자 정보 조회 중에 데이터베이스 오류가 발생했습니다.');
    }
  }

  async setPreference(userId, foodCategoryId) {
    try {
      await prisma.userFoodType.create({
        data: {
          userId: userId,
          foodTypeId: foodCategoryId,
        },
      });
    } catch (err) {
      console.error(err);
      throw new InternalServerError('사용자 선호 카테고리 설정 중에 데이터베이스 오류가 발생했습니다.');
    }
  }

  async getUserPreferencesByUserId(userId) {
    try {
      const preferences = await prisma.userFoodType.findMany({
        where: { userId: userId },
        include: {
          foodType: { select: { name: true } },
        },
      });

      return convertBigIntsToNumbers(preferences);
    } catch (err) {
      console.error(err);
      throw new InternalServerError('사용자 선호 카테고리 조회 중에 데이터베이스 오류가 발생했습니다.');
    }
  }
  async updateUser(userId, data) {
    try {
      const result = await prisma.user.update({
        where: {
          id: BigInt(userId),
        },
        data: {
          name: data.name,
          gender: data.gender,
          birthDate: data.birthDate,
          highAddress: data.highAddress,
          lowAddress: data.lowAddress,
          phoneNumber: data.phoneNumber,
        },
      });

      return Number(result.id);
    } catch (err) {
      console.error(err);
      throw new InternalServerError('사용자 정보 업데이트 중에 데이터베이스 오류가 발생했습니다.');
    }
  }
}
export default UserRepository;