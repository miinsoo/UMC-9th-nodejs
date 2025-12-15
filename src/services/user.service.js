import { userSignUpResponse } from "../dtos/user.dto.js";
import bcrypt from 'bcrypt';
import { ConflictError, NotFoundError, InternalServerError, CustomError } from "../middlewares/error.js";
import { convertBigIntsToNumbers } from "../libs/ dataTransformer.js";

class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async userSignUp(data) {
        try {
            const hashedPassword = await bcrypt.hash(data.password, 12); // 비밀번호 해싱

            const joinUserId = await this.userRepository.addUser({
                email: data.email,
                name: data.name,
                gender: data.gender,
                birth: data.birth,
                address: data.address,
                detailAddress: data.detailAddress,
                phoneNumber: data.phoneNumber,
                password: hashedPassword,
            });

            if (joinUserId === null) {
                // 이메일 중복 시 ConflictError (409) 발생
                throw new ConflictError("이미 존재하는 이메일입니다.");
            }

            // 선호도 설정 로직
            for (const preference of data.preferences) {
                await this.userRepository.setPreference(joinUserId, preference);
            }

            // 최종적으로 사용자 정보와 선호도를 조회하여 DTO로 반환
            const user = await this.userRepository.getUser(joinUserId);
            if (!user) {
                throw new NotFoundError("가입된 사용자 정보를 찾을 수 없습니다.");
            }
            const preferences = await this.userRepository.getUserPreferencesByUserId(joinUserId);

            return userSignUpResponse({ user, preferences });
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            console.error(error);
            throw new InternalServerError('회원가입 처리 중에 오류가 발생했습니다.', data);
        }
    }
    async userUpdateProfile(userId, data) {
      try {
        const updatedUserId = await this.userRepository.updateUser(userId, data);

        const user = await this.userRepository.getUser(updatedUserId);
        if (!user) {
            throw new NotFoundError('업데이트된 사용자를 찾을 수 없습니다.');
        }
        const preferences = await this.userRepository.getUserPreferencesByUserId(updatedUserId);
        
        // 응답 데이터는 BigInt를 Number로 변환
        const response = userSignUpResponse({ user: convertBigIntsToNumbers(user), preferences });
        return response;
      } catch (error) {
        if (error instanceof CustomError) { throw error; }
        console.error(error);
        throw new InternalServerError('사용자 정보 업데이트 중 오류가 발생했습니다.');
      }
    }
}

export default UserService;