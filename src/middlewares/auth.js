import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {
  var token = req.headers['authorization'];

  if (!token) return res.status(403).send({ auth: false, message: 'No token provided.' });

  var cleanToken = token.replace('Bearer ', '').trim();
  jwt.verify(cleanToken, process.env.JWT_SECRET, function (err, decoded) {
    if (err) {
      return res.status(401).send({ auth: false, message: 'Failed to authenticate token.' });
    }
    req.userId = decoded.id;
    next();
  });
};

export const invalidToken = async (err, req, res, next) => {
  console.log(err);
  if (err.name === 'UnauthorizedError') {
    if (err.code === 'invalid_token')
      return res.status(401).json({ mensagem: 'Token JWT inválido.' });
    if (err.code === 'credentials_required') {
      return res.status(401).json({ mensagem: 'Token JWT ausente.' });
    }
  }
  next();
};
