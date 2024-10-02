const validate = (schema) => async (req, res, next) => {
  try {
    const parseBody = await schema.parseAsync(req.body);
    req.body = parseBody;
  } catch (error) {
    res.status(404).json({ success: false, message: error });
  }
};

export default validate;
