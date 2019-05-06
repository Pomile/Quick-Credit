const validateId = (req, res, next) => {
  const { id } = req.params;
  if (Number.isInteger(+id)) {
    next();
  } else {
    res.status(400).json({ error: 'Invalid id. id must be an integer' }).end();
  }
};

export default validateId;
