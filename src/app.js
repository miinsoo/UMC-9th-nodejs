import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import passport from "passport"; 
import { googleStrategy, jwtStrategy } from "./auth.config.js";
import { responseHandler } from "./middlewares/responseHandler.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import compression from "compression";

import { missionRoute, reviewRoute, storeRoute, activatedMissionRoute, userRoute, authRouter } from "./loader/index.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors()); // cors 방식 허용
app.use(express.static("public")); // 정적 파일 접근
app.use(express.json()); // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석
app.use(morgan("dev")); // 로그 출력
app.use(cookieParser()); // cookie 파싱
app.use(compression({
  threshold: 512,
})); // 응답 압축

passport.use(googleStrategy); // Google 인증 전략 등록
passport.use(jwtStrategy);    // JWT 검증 전략 등록
app.use(passport.initialize()); // Passport 초기화 미들웨어 추가

app.get(
  "/oauth2/callback/google",
  passport.authenticate("google", {
	  session: false,
    failureRedirect: "/login-failed", // 실패 시 리다이렉트 (추가 필요)
  }),
  (req, res) => {
    // 인증 성공 시 실행 (req.user에 { accessToken, refreshToken }이 담겨 있음)
    const tokens = req.user; 

    // 통일된 성공 응답 포맷 사용 (200 OK)
    res.status(200).json({
      resultType: "SUCCESS",
      error: null,
      success: {
          message: "Google 로그인 및 토큰 발급 성공!",
          tokens: tokens, // { "accessToken": "...", "refreshToken": "..." }
      }
    });
  }
);

app.use(responseHandler); // response handler middleware

app.use('/api/auth', authRouter);
app.use('/api/users', userRoute);
app.use('/api/missions', missionRoute);
app.use('/api/reviews', reviewRoute);
app.use('/api/stores', storeRoute);
app.use('/api/activated-missions', activatedMissionRoute); 

app.use(errorHandler); // error handler middleware

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});