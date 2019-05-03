const validateUserIdParams = (req, res, next) => {
  const { userId } = req.params;
  if (Number.isInteger(+userId)) {
    next();
  } else {
    res.status(400).json({ error: 'Invalid user id. id must be an integer' }).end();
  }
};

export default validateUserIdParams;
