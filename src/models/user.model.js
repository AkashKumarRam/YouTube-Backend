import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      lowercase: true,
      trim: true, // This option will trim whitespace from the value
      index: true, // Database e searching method ke oprimize korte index property neoa hoi
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: [true, "Fullname is required"],
      trim: true,
      index: true,
    },
    avatar: {
      type: String, // Cloudinary te image upload korbo diye oi image er url ekhane use korbo
      required: [true, "Avatar is required"],
    },
    coverImage: {
      type: String, // Cloudinary te image upload korbo diye oi image er url ekhane use korbo
    },
    watchHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

// Password Encrypt korar Logic
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  // Etar mane password database e password save hoar agei sei password take nebo ar setake encrypt kore database e save korabo
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// User er information retrive korar somoi user ta oi user kina seta dekhar jonno user er password ar amader encrypt kora password compare kore dekhte hobe
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Generate Acccess Token
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};

// Generate Refresh Token
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
};

export default User = mongoose.model("User", userSchema);
