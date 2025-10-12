import express from "express";

const reviewRouter = (reviewController) => {  
    const router = express.Router();
    router.post("/", reviewController.handleAddReview.bind(reviewController));
    return router;
}

export default reviewRouter;