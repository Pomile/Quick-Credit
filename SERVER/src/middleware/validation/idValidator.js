const validateId = (req, res, next) => {
  const { id } = req.params;
  if (Number.isInteger(+id) && +id > 0) {
    next();
  } else {
    res.status(422).json({ status: 422, error: 'Invalid id. id must be a positive integer and greater than 0.' }).end();
  }
};

export default validateId;
