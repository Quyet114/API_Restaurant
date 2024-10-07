const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }
  const token = authHeader.split("")[1];
  if (!token) {
    return res.status(401).json({ message: 'Token is not valid' });
  }


  try {
    jwt.verify(token, process.env.JWT_ACCESS_KEY, (err, user) =>{
      if(err){
        return res.status(403).json({message:"Token i not valid"})
      }
      req.userId = user.id;
      next();
    })
  } catch (error) {
    return res.status(401).json({message:"Token i not valid"})
  }
}
const checkAuthAndUserRole = (req, res) => {

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return { role: -1, userId: null };
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return { role: -1, userId: null };
  }

  try {
    const user = jwt.verify(token, process.env.JWT_ACCESS_KEY);
    if (!user || !user.role) {
      return { role: -1, userId: null };
    }

    let roleValue;
    switch (user.role) {
      case 'admin':
        roleValue = 3;
        break;
      case 'customer':
        roleValue = 2;
        break;
      case 'user':
        roleValue = 1;
        break;
      case 'guest':
        roleValue = 0;
        break;
      default:
        roleValue = -1;
    }

    req.userId = user.id;

    return { role: roleValue, userId: user.id };

  } catch (error) {
    return { role: -1, userId: null };
  }
};
module.exports = {
  authenticateUser,
  checkAuthAndUserRole
};