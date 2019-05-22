import jwt from 'jsonwebtoken';

const verifyUser = async (req, res, next) => {
  const payload = req.headers.authorization;
  if (payload) {
    jwt.verify(payload, process.env.TOKEN_SECRET, async (err, decoded) => {
      if (!err) {
        if (decoded.data) {
          req.body.user = +decoded.data.id;
          req.user = { ...decoded.data };
          next();
        }
      } else {
        res.status(422).json({ status: 422, error: 'Invalid token', errMsg: err.message }).end();
      }
    });
  } else {
    res.status(401).json({ status: 401, error: 'Not authorized', success: false }).end();
  }
};

export default verifyUser;
