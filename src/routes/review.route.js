import express from "express";
import ReviewController from "../controllers/review.controller.js";

const reviewRouter = (reviewService) => {  
    const router = express.Router();
    const reviewController = new ReviewController(reviewService);
    router.post("/", reviewController.handleAddReview.bind(reviewController));
    return router;
}

export default reviewRouter;