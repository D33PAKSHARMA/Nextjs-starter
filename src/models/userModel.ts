import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true },
  image:{ type: String},
  password: { type: String , select: false},
  googleId: { type: String },
});

const User = mongoose.models?.User || mongoose.model("User", UserSchema);

export default User;
