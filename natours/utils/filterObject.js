module.exports = (obj, ...allowedFields) => {
  const filterable = obj._doc || obj;
  const newObj = {};
  Object.keys(filterable).forEach((el) => {
    if (allowedFields.includes(el)) {
      newObj[el] = filterable[el];
    }
  });
  return newObj;
};
