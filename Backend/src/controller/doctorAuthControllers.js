const Doctor = require("../models/doctor");
const { createToken } = require("../utils/createToken");
const maxAge = 3 * 24 * 60 * 60;
const handleError = (err) => {
  let errors = {};

  // incorrect email
  if (err.message === "Invalid Email") {
    errors.email = "Email is not registered";
  }

  // incorrect password
  if (err.message === "Incorrect Password") {
    errors.password = "password is incorrect";
  }

  // duplicate error code
  if (err.code === 11000) {
    errors.email = "This Email is already Registered on System.";
    return errors;
  }

  // if (err.message.includes("patient validation failed")) {
  //   let errorsarray = Object.values(err.errors);
  //   errorsarray.forEach(({ properties }) => {
  //     if (!properties.path.includes(".")) {
  //       errors[properties.path] = properties.message;
  //     }
  //   });
  // }
  return errors;
};

module.exports.doctor_register = async (req, res) => {
  const education = Object.values(req.body.education);
  const specialization = Object.values(req.body.specialization);
  const {
    name,
    org,
    orgAddress,
    dob,
    mobile,
    email,
    adharCard,
    bloodGroup,
    address,
    password,
    orgNumber,
    emergencyno,
  } = req.body;
  try {
    const doctor = await Doctor.create({
      name,
      org,
      orgAddress,
      dob,
      mobile,
      email,
      adharCard,
      bloodGroup,
      education,
      address,
      password,
      specialization,
      orgNumber,
      emergencyno,
    });

    res.status(200).json({ doctor });
  } catch (err) {
    const errors = handleError(err);
    res.json({errors});
    res.status(404);
  }
};

module.exports.doctor_login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const doctor = await Doctor.login(email, password);
    const token = createToken(doctor._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ doctor });
  } catch (err) {
    const errors = handleError(err);
    res.json({errors});
    res.status(404);
  }
};
