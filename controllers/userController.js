import {catchAsyncError} from "../middlewares/catchAsyncError.js"
import  ErrorHandler from "../utils/errorHandler.js"
import {User} from "../models/User.js"
import { sendToken } from "../utils/sendToken.js"
import { sendEmail } from "../utils/sendEmail.js"
import crypto from "crypto";
import {Course} from "../models/Course.js"
import cloudinary from "cloudinary";
import getDataUri from "../utils/dataUri.js"
import {Stats} from "../models/Stats.js"

export const register = catchAsyncError(async(req,res,next) =>{

  const {name, email , password} = req.body;
  const file = req.file;


  if(!name || !email || !password || !file){
    return next(new ErrorHandler("Please enter all field",400));
  }
    let user = await User.findOne({email});
 
    if(user){
        return  next(new ErrorHandler("User Already Exist",409))
    }

    
    const fileUri = getDataUri (file);
    const mycloud = await cloudinary.uploader.upload(fileUri.content); 

    //upload file on cloudinary
    user = await User.create({
        name,
        email,
        password,
        avatar:{
            public_id: mycloud.public_id,
            url: mycloud.secure_url,
        }
    });
    sendToken(res,user ,"Registerd Successfully", 201);

})


export const login = catchAsyncError(async(req,res,next) =>{

  const {email , password} = req.body;
  //const file = req.file;
  if(!email || !password){
    return next(new ErrorHandler("Please enter all field",400));
  }
    const user = await User.findOne({email}).select("+password");

    if(!user){ 
        return  next(new ErrorHandler("User Does't Exist",401))
    }
    const isMatch = await user.comaprePassword(password);

    if(!isMatch){ 
      return  next(new ErrorHandler("Incorrect Email or Password",401))
  }
    sendToken(res,user ,`Welcome Back, ${user.name}`, 200);

})

export const logout = catchAsyncError(async(req,res,next)=>{
  res.status(200).cookie("token",null,{
    expires: new Date(Date.now()),
    httpOnly: true,
    secure: true,
    sameSite: "none",
  }).json({
    success: true,
    message: "Logged out Successfully"
  })
})


export const getMyProfile = catchAsyncError(async(req,res,next)=>{
   const user = await User.findById(req.user._id);


  res.status(200).json({
    success: true,
    user,
  })
})


export const changepassword = catchAsyncError(async(req,res,next)=>{
  const{oldPassword , newPassword} = req.body;
  if(!oldPassword || !newPassword){
    return next(new ErrorHandler("Please enter all field",400));
  }
  const user = await User.findById(req.user._id).select("+password")

  const isMatch = await user.comaprePassword(oldPassword);
  if(! isMatch){
    return next(new ErrorHandler("Incorrect old Password",400));
  }

  user.password = newPassword;
   
  await user.save();

 res.status(200).json({
   success: true,
   Message:"Password Changed Successfully",
 })
})



export const updateProfile = catchAsyncError(async(req,res,next)=>{
  const{name , email} = req.body;
 
  const user = await User.findById(req.user._id).select("+password")

 if(name) user.name = name;
 if(email) user.email = email;   
  await user.save();

 res.status(200).json({
   success: true,
   Message:"Profile Updated Successfully",
 })
})

export const updateprofilepicture = catchAsyncError(async (req, res, next) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const fileUri = getDataUri(file);
    const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);

    // Delete existing user avatar on Cloudinary
    if (user.avatar && user.avatar.public_id) {
      await cloudinary.v2.uploader.destroy(user.avatar.public_id);
    }

    // Update user's avatar details
    user.avatar = {
      public_id: mycloud.public_id,
      url: mycloud.secure_url,
    };

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile Picture Updated Successfully",
    });
  } catch (error) {
    // Handle any errors
    console.error("Error updating profile picture:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

export const forgetPassword = catchAsyncError(async(req,res,next)=>{
  const {email} = req.body;
   
  const user = await User.findOne({email});

  //if user is not present
  if(!user) return next(new ErrorHandler("User not found",400));

  const resetToken = await user.getResetToken();
   
  await user.save();

  const url = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;

  const message = `Click on the link to reset your password. ${url}. If you have not requested then ignore`
  //send token via email
  await sendEmail(user.email , "SkillCanvas Reset Password",message)

  res.status(200).json({
    success:true,
    message:`Reset Token has been sent to ${user.email}`,
  })
})




export const resetPassword = catchAsyncError(async (req, res, next) => {
  const { token } = req.params;

  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

 
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: {
      $gt: Date.now(),
    },
  });

  
  if (!user)
    return next(new ErrorHandler("Token is invalid or has been expired", 401));

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

 

  res.status(200).json({
    success: true,
    message: "Password changed successfully",
  });
});




export const addToPlayList = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  const course = await Course.findById(req.body.id);

  if (!course) return next(new ErrorHandler("Invalid Course Id", 404));

  const itemExist = user.playlist.find((item) => {
    if (item.course.toString() === course._id.toString()) return true;
  });

  if (itemExist) return next(new ErrorHandler("Item Already Exist", 409));

  user.playlist.push({
    course: course._id,
    poster: course.poster.url,
  });

  await user.save();

  res.status(200).json({
    success: true,
    message: "Added to playlist",
  });
});



export const removeFromPlaylist = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  const course = await Course.findById(req.query.id);

  if (!course) return next(new ErrorHandler("Invalid Course Id", 404));

  // Corrected filter condition and variable name
  const newPlaylist = user.playlist.filter(item => item.course.toString() !== course._id.toString());

  user.playlist = newPlaylist;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Removed from playlist",
  });
});




//admin controllers
export const getAllUsers = catchAsyncError(async(req,res,next)=>{

  const users = await User.find({})

  res.status(200).json({
    success: true,
    users,
  });
})


export const updateUserRole = catchAsyncError(async(req,res,next)=>{
  
  const user = await User.findById(req.params.id)
  
  if(!user) return next(new ErrorHandler("User not found",404));

  if(user.role === "user") user.role = "admin";
  else user.role = "user";

  await user.save(); 

  res.status(200).json({
    success: true,
    message: "Role Updated",
  });
})


export const deleteUser = catchAsyncError(async(req,res,next)=>{
  
  const user = await User.findById(req.params.id)
  
  if(!user) return next(new ErrorHandler("User not found",404));

  await cloudinary.v2.uploader.destroy(user.avatar.public_id)
  //Cancel Subscrition 
  await user.deleteOne();
   
  res.status(200).json({
    success: true,
    message: "User deleted Succesfully",
  });
})


export const deleteMyProfile = catchAsyncError(async(req,res,next)=>{
  
  const user = await User.findById(req.user._id)
  console.log(user);
  

  await cloudinary.v2.uploader.destroy(user.avatar.public_id)
  //Cancel Subscrition 

  await user.deleteOne();
   
  res
  .status(200)
  .cookie("token",null,{
    expires : new Date(Date.now()),
  })
  .json({
    success: true,
    message: "User deleted Succesfully",
  });
})



User.watch().on("change", async () => {
  const stats = await Stats.find({}).sort({ createdAt: "desc" }).limit(1);

  const subscription = await User.find({ "subscription.status": "active" });
  stats[0].users = await User.countDocuments();
  stats[0].subscription = subscription.length;
  stats[0].createdAt = new Date(Date.now());

  await stats[0].save();
});








