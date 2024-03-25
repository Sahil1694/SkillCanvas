import express from "express"
import { addToPlayList, changepassword, deleteMyProfile, deleteUser, forgetPassword, getAllUsers, getMyProfile, login, logout, register, removeFromPlaylist, resetPassword, updateProfile, updateUserRole } from "../controllers/userController.js";
import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js";
import singleUpload from "../middlewares/multer.js";

const router = express.Router();

//to register new user
 router.route("/register").post(singleUpload , register)

 //Login Route
 router.route("/login").post(login)
 //log out Routes  
 router.route("/logout").get(logout)

 //get my profile
 router.route("/me").get(isAuthenticated, getMyProfile)
//delete my profile
 router.route("/me").delete(isAuthenticated, deleteMyProfile)

 //change password
 router.route("/changepassword").put(isAuthenticated, changepassword)

 //update Profile
 router.route("/updateprofile").put(isAuthenticated, updateProfile)

 //update Profile Picture
 router.route("/updateprofilepicture").put(singleUpload,isAuthenticated, updateProfile)

 //forget Password
 router.route("/forgetpassword").post(forgetPassword)

 //reset password
 router.route("/resetPassword/:token").put(resetPassword)

 //add to playlist
 router.route("/addtoplaylist").post(isAuthenticated,addToPlayList)

 //remove From PlayList
 router.route("/removefromplaylist").delete(isAuthenticated,removeFromPlaylist)

// admin Routes
router.route("/admin/users").get(isAuthenticated , authorizeAdmin , getAllUsers)

router.route("/admin/user/:id").put(isAuthenticated , authorizeAdmin , updateUserRole).delete(isAuthenticated , authorizeAdmin , deleteUser)
export default router;