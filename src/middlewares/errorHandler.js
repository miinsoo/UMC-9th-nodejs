// src/middlewares/errorHandler.js

import { InternalServerError, CustomError } from './error.js'
import { createResponse } from "../libs/responseFormatter.js";

export const errorHandler = (err, req, res, next) => {
    // 이미 응답이 전송된 후에는 에러 처리 X
    if (res.headersSent) {
        return next(err)
    }

    let erroData;
    let statusCode;
    let errorMessage;

    // CustomError 기반일 경우 해당 에러 코드 및 메시지 응답
    if (err instanceof CustomError) {
        statusCode = err.statusCode;
        errorMessage = err.message;
        erroData = {
            errorCode: err.errorCode,
            data: err.data || null,
        };
    }else {
        // 그 외 알 수 없는 에러는 500번 서버 내부 오류로 처리
        console.error('[errorHandler] Unexpected Error: ', err);
        const internalServerError = new InternalServerError();
        statusCode = internalServerError.statusCode;
        errorMessage = internalServerError.message;
        erroData = {
            errorCode: internalServerError.errorCode,
            data: internalServerError.data || null,
        };
    }

    // 통일된 에러 응답 포맷으로 전송
    return res.status(statusCode).json(createResponse({
        resultType: "FAIL",
        message: errorMessage,
        error: erroData,
        success: null
    }));
}