const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { name, email, password, role, dob, patient_case } = req.body;
  console.log(name);
  const existing_user = await User.findOne({ email });

  if (existing_user)
    return res.status(409).json({ message: "Email already exists" });

  const user = new User();
  user.name = name;
  user.password = password;
  user.email = email;
  if (role) user.role = role;
  if (dob) user.dob = dob;
  if (patient_case) user.patient_case = patient_case;
  await user.save();

  const { password: hashed_password, ...new_user } = user.toJSON();
  res.status(201).json(new_user);
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const existing_user = await User.findOne({ email });

  if (!existing_user)
    return res.status(404).json({ message: "Invalid credentials" });

  const is_matched = await existing_user.matchPassword(password);
  console.log(is_matched);
  if (!is_matched)
    return res.status(404).json({ message: "Invalid credentials" });
  console.log(is_matched);

  const token = jwt.sign(
    { id: existing_user._id, email: existing_user.email },
    process.env.SECRET_KEY
  );
  console.log(is_matched);

  res.json({ token });
};
