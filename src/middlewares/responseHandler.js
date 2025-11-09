// src/middlewares/responseHandler.js
import { createResponse } from "../libs/responseFormatter.js";

export const responseHandler = (req, res, next) => {
  /** 
   * 응당 성공 핼퍼 함수
   * @param {Object} params - 응답 파라미터 객체
   * @param {string} [params.message="요청에 성공했습니다."] - 응답 메시지
   * @param {Object} params.data - 응답 데이터
   * @return {Object} 통일된 성공 응답 포맷 객체
   * */ 
  console.debug('[responseHandler] attaching res.success helper');
  res.success = ({ message = "요청에 성공했습니다.", data }) => {
    return res.json(createResponse({
      resultType: "SUCCESS", 
      message: message,
      error: null,
      success: data
    }));
  };

  next();
};

