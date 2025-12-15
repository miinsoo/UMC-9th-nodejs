import express from "express";
import passport from "passport";
import { StatusCodes } from "http-status-codes";
// ✅ 추가: BigInt 변환 유틸리티 임포트
import { convertBigIntsToNumbers } from "../libs/ dataTransformer.js";

export const authRouter = express.Router(); 

export const isLogin = passport.authenticate('jwt', { session: false });

authRouter.get("/google", 
  passport.authenticate("google", { 
    session: false,
  })
);

authRouter.get('/mypage', isLogin, (req, res) => {
  
  // ✅ 수정: req.user 객체 내부의 BigInt 필드(id 등)를 Number로 변환
  const userResponseData = convertBigIntsToNumbers(req.user);

  res.status(StatusCodes.OK).success({
    message: `인증 성공! ${userResponseData.name}님의 마이페이지입니다.`,
    data: {
      user: userResponseData, 
    }
  });
});

export default authRouter;