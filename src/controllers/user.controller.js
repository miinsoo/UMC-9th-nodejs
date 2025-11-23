import { StatusCodes } from "http-status-codes";
import { bodyToUser, userUpdateProfileRequest } from "../dtos/user.dto.js";

class UserController {
    constructor(userService) {
        this.userService = userService;
    }

    async handleUserSignUp(req, res, next) {
        try {
            console.log("회원가입을 요청했습니다!");
            const userData = req.body;
            
            // DTO를 사용하여 요청 데이터 변환
            const signUpData = bodyToUser(userData);
            
            // Service 호출
            const user = await this.userService.userSignUp(signUpData);
            
            // 통일된 응답 포맷 (CREATED: 201) 사용
            return res.status(StatusCodes.CREATED).success({
                message: "회원가입을 성공적으로 완료했습니다.",
                data: user,
            });
        } catch (error) {
            // 에러를 errorHandler 미들웨어로 전달
            next(error);
        }
    }
    async handleUserUpdateProfile(req, res, next) {
      try {
        console.log("사용자 정보 업데이트를 요청했습니다!");
        const userId = req.user.id; 
        const updateData = userUpdateProfileRequest(req.body); 

        const updatedUser = await this.userService.userUpdateProfile(userId, updateData); 
        
        res.status(StatusCodes.OK).success({ 
            message: "사용자 정보가 성공적으로 업데이트되었습니다.",
            data: updatedUser,
        });
      } catch (error) {
        next(error);
      }
    }
}

export default UserController;