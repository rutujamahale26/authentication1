import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
    trim: true,
  },
  lname: {
    type: String,
    trim: true,
    required: true
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
    match: [/^\d{10}$/, 'Please enter a valid 10-digit mobile number']
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  role: {
    type: String,
    required: true,
    enum: ['admin', 'user'],
    default: 'user'
  }
}, { timestamps: true }); // ✅ handles createdAt & updatedAt automatically

export const User = mongoose.model('User', UserSchema);
