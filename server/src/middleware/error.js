import CustomError from "../errors/customError.js";

const errorMiddleware = (err, req, res, next) => {
  if (err instanceof CustomError) {
    res.status(err.statusCode).json({ error: err.message });
  } else {
    res.status(500).json({ error: err.message });
  }
};

export default errorMiddleware;