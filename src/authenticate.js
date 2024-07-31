import db from './models/index.js';
import pkg from 'jsonwebtoken';
import { compare } from 'bcrypt';
import { env } from 'process';

const { verify, sign } = pkg;

export function validateToken(req, res) {
  const { token } = req.body;
  try {
    verify(token, env.JWT_SECRET, (err, decoded) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(401).json({ msg: 'Token expired' });
        } else if (err.name === 'JsonWebTokenError') {
          return res.status(401).json({ msg: 'Token invalid' });
        } else {
          return res.status(500).json({ msg: 'Failed to authenticate token' });
        }
      }
      return res.status(200).json(decoded);
    });
  } catch (err) {
    return res.status(500).json({ msg: 'An error occurred during token validation' });
  }
}

export async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Login ou senha inválidos.' });
  }

  const jwtSecret = env.JWT_SECRET;
  const returnError = (res) => (error) =>
    res.status(500).json({ msg: 'Server Error', stack: error.stack });

  db.Credencial.findOne({
    where: { email: email },
    include: [{ model: db.Pessoa, attributes: ['nome'] }],
  })
    .then((credencial) => {
      if (!credencial) {
        return res.status(400).json({ message: 'Login incorreto' });
      }
      try {
        compare(password, credencial.password, (erro, acerto) => {
          if (erro) {
            return returnError(erro);
          }
          if (!acerto) {
            return res.status(401).json({ message: 'Senha incorreta' });
          } else {
            let myToken = sign({ email: email }, jwtSecret, {
              expiresIn: '72h',
            });
            let data = {
              token: myToken,
              nome: credencial.Pessoa.nome,
              email: credencial.email,
              isAdmin: credencial.is_admin,
            };
            return res.status(200).json(data);
          }
        });
      } catch (error) {
        console.log(error);
      }
    })
    .catch(returnError(res));
}
