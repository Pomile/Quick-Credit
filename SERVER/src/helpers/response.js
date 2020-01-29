class responseHelper {
  static notFound(res, msg) {
    res.status(404).json({ status: 404, error: msg }).end();
  }

  static oK(res, data, msg) {
    res.status(200).json({ status: 200, data, msg }).end();
  }

  static unprocessables(res, msgs) {
    res.status(422).json({ status: 422, errors: msgs }).end();
  }

  static unprocessable(res, msg) {
    res.status(422).json({ status: 422, error: msg }).end();
  }

  static badRequests(res, msgs) {
    res.status(400).json({ status: 400, errors: msgs }).end();
  }

  static badRequest(res, msgs) {
    res.status(400).json({ status: 400, error: msgs }).end();
  }

  static unauthorize(res, msg) {
    res.status(401).json({ status: 401, error: msg }).end();
  }

  static resourceCreated(res, data) {
    res.status(201).json({ status: 201, data }).end();
  }

  static conflict(res, msg) {
    res.status(409).json({ status: 409, error: msg }).end();
  }
}

export default responseHelper;
