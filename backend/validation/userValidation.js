import { check, validationResult } from "express-validator";

const userValidationSchema = {
  name: {
    notEmpty: {
      errorMessage: "Name is required",
    },
    isLength: {
      options: { min: 3 },
      errorMessage: "Name must be at least 3 characters long",
    },
  },
  email: {
    isEmail: {
      errorMessage: "Please provide a valid email address",
    },
  },
  password: {
    isLength: {
      options: { min: 6 },
      errorMessage: "Password must be at least 6 characters long",
    },
  },
};

// Convert the schema to express-validator checks
const registerValidationRules = () => {
  return [
    check("name")
      .notEmpty()
      .withMessage(userValidationSchema.name.notEmpty.errorMessage)
      .isLength(userValidationSchema.name.isLength.options)
      .withMessage(userValidationSchema.name.isLength.errorMessage),

    check("email")
      .isEmail()
      .withMessage(userValidationSchema.email.isEmail.errorMessage),

    check("password")
      .isLength(userValidationSchema.password.isLength.options)
      .withMessage(userValidationSchema.password.isLength.errorMessage),
  ];
};

// Middleware to handle validation errors
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // console.log("Returning this");
    let arr = errors.array();
    return res.status(400).json({
      success: false,
      errors: arr,
      msg: arr[0]?.msg || "Some error",
    });
  }
  next();
};

export { validate, registerValidationRules };
