const permit = (req, res, next) => {
  if (req.user.isadmin === true) {
    next();
  } else {
    res.status(403).json({ status: 403, error: 'access denied' });
  }
};

export default permit;
