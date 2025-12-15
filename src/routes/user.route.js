// src/routes/user.route.js
import express from "express";

// ✅ isLogin 미들웨어를 인자로 받도록 수정
const userRouter = (userController, isLogin) => { 
    const router = express.Router();
    
    // 1. 회원가입 (POST /signup)
    router.post("/signup", userController.handleUserSignUp.bind(userController));

    // 2. 프로필 수정 (POST /update-profile) - isLogin 미들웨어 적용
    router.patch(
        '/update-profile', 
        isLogin, 
        userController.handleUserUpdateProfile.bind(userController) 
    );

    return router;
}

export default userRouter;