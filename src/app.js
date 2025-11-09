import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { responseHandler } from "./middlewares/responseHandler.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import compression from "compression";
//import { handleUserSignUp } from "./controllers/user.controller.js";

import { missionRoute, reviewRoute, storeRoute, activatedMissionRoute } from "./loader/index.js";

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


// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// app.post("/api/v1/users/signup", handleUserSignUp);

app.use(responseHandler); // response handler middleware

app.use('/api/missions', missionRoute);
app.use('/api/reviews', reviewRoute);
app.use('/api/stores', storeRoute);
app.use('/api/activated-missions', activatedMissionRoute); 

app.use(errorHandler); // error handler middleware

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});