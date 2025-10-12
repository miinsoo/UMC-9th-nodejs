import expresss from "express";
import ReviewController from "../controllers/review.controller.js";

const router = expresss.Router();

const reviewRouter = (reviewService) => {  
    const reviewController = new ReviewController(reviewService);
    router.post("/reviews", reviewController.handleAddReview.bind(reviewController));
    return router;
}

export default reviewRouter;