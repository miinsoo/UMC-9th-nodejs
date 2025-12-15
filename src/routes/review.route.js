import express from "express";

const reviewRouter = (reviewController, isLogin) => {  
    const router = express.Router();
    router.post("/", isLogin, reviewController.handleAddReview.bind(reviewController));
    return router;
}

export default reviewRouter;