import jwt from 'jsonwebtoken';

export const generateJWT = (user) => {
  return jwt.sign(
    // Generate JWT without user password
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '30d',
    }
  );
};
