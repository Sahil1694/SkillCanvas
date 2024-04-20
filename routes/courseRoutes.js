import express from "express"
import { addLectures, createCourse, deleteCourse, deleteLecture, getAllCourses, getCourseLectures } from "../controllers/courseController.js";
import singleUpload from "../middlewares/multer.js";
import { authorizeAdmin, isAuthenticated  , authorizeSubscribers} from "../middlewares/auth.js";

const router = express.Router();


//get all courses without lec
router.route("/courses").get(getAllCourses);

//create new course Admin
router.route("/createcourse").post( isAuthenticated, authorizeAdmin ,singleUpload , createCourse);

//add lectures
router
     .route("/course/:id")
     .get( isAuthenticated ,authorizeSubscribers,getCourseLectures)
     .post(isAuthenticated,authorizeAdmin,singleUpload ,addLectures)
     .delete(isAuthenticated ,authorizeAdmin, deleteCourse);

     
//delete course
router.route("/lecture").delete(isAuthenticated, authorizeAdmin, deleteLecture);


//get course detail


//delete  lecture

export default router;