exports.validate = function validate(schema, reqId="body") {
    return (req, res, next) => {
      const validationResult = schema.validate(req[reqId]);
      if (validationResult.error) {
        return res.status(400).send("Ошибка от Joi или другой валидационной библиотеки");
      }
  
      next();
    };
  };