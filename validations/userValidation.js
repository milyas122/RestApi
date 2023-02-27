const yup = require("yup");

const userSignupSchema = yup.object().shape({
  name: yup.string().required(),
  password: yup.string().min(4).max(6).required(),
  email: yup.string().email().required(),
});

module.exports = { userSignupSchema };
