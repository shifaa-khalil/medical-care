const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { name, email, password, role, dob, gender, patient_case } = req.body;
  console.log(name);
  const existing_user = await User.findOne({ email });

  if (existing_user)
    return res.status(409).json({ message: "email already exists" });

  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "invalid email" });
  }

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      message: "invalid password",
    });
  }

  const user = new User();
  user.name = name;
  user.password = password;
  user.email = email;
  if (role) user.role = role;
  if (dob) user.dob = dob;
  if (patient_case) user.patient_case = patient_case;
  user.gender = gender;
  await user.save();

  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.SECRET_KEY
  );

  const { password: hashed_password, ...new_user } = user.toJSON();
  res.json({ token, user: new_user });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const existing_user = await User.findOne({ email });

  if (!existing_user)
    return res.status(404).json({ message: "Invalid credentials" });

  const is_matched = await existing_user.matchPassword(password);

  if (!is_matched)
    return res.status(404).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { id: existing_user._id, email: existing_user.email },
    process.env.SECRET_KEY
  );

  const { password: hashed_password, ...new_user } = existing_user.toJSON();
  res.json({ token, user: new_user });
};
