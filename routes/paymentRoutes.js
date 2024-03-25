import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { buySubscription, cancelSubscription, getRazorPayKey, paymentVerification } from "../controllers/paymentController.js";
const router = express.Router();



//Buy Subsciption
router.route("/subscribe").get(isAuthenticated, buySubscription);

////verify payment and save ref and DB
router.route("/paymentverification").post(isAuthenticated, paymentVerification);


//get razorypay key
router.route("/razorpaykey").get(getRazorPayKey);

//cancel subscription
router.route("/subscribe/cancel").delete(cancelSubscription);



export default router;
