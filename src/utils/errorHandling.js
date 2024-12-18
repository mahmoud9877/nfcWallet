export const asyncHandler = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((error) => {
      return res
        .status(500)
        .json({ message: "catch error", error, stack: error.stack });
    });
  };
};

export const globalErrorHandling = (err, req, res, next) => {
  if (err) {
    return res.json({ message: err.message });
  }
};
