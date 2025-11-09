// src/libs/responseFormatter.js

// 응답 통일을 위한 포맷터 함수
/**
 * 
 * @param {Object} params
 * @param {string} params.resultType - "SUCCESS" | "FAIL"
 * @param {string} params.message - 응답 메시지
 * @param {Object|null} params.error - 에러 정보 (실패 시)
 * @param {Object|null} params.success - 성공 데이터 (성공 시)   
 * @returns {Object} 통일된 응답 객체
 */
export const createResponse = ({ resultType, message, error, success }) => {
  return {
    resultType,
    message,
    error,
    success,
  };
};