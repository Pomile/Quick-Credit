const permit = (req, res, next) => {
  if (req.user.isAdmin === true) {
    next();
  } else {
    res.status(403).json({ error: 'access denied' });
  }
};

export default permit;
