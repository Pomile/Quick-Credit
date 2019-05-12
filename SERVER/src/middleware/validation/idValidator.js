const validateId = (req, res, next) => {
  const { id } = req.params;
  if (Number.isInteger(+id) && +id > 0) {
    next();
  } else {
    res.status(422).json({ error: 'Invalid id. id must be an integer' }).end();
  }
};

export default validateId;
