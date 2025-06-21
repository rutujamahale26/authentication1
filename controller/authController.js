import {User} from '../models/userModel.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Replace with your actual secret key
const JWT_SECRET = 'accd_ef';

export const register = async (req, res) => {
  try {
    const { fname, lname, mobile, gender, email, password, role } = req.body;

    // Validate required fields
    if (!fname || !lname || !mobile || !gender || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({
      fname,
      lname,
      mobile,
      gender,
      email,
      password: hashedPassword,
      role: role || 'user'
    });

    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Error during registration:', err.message); // 
    res.status(500).json({ message: 'Something went wrong. Please try again later.' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        fname: user.fname,
        lname: user.lname,
        role: user.role
      }
    });
  } catch (err) {
    res.status(500).json({  message : 'Somthing went wrong', err });
  }
};
