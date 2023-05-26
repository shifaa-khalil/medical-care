const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;
  console.log(name);
  const existing_user = await User.findOne({ email });

  if (existing_user)
    return res.status(409).json({ message: "Email already exists" });

  const user = new User();
  user.name = name;
  user.password = password;
  user.email = email;
  user.role = role;

  await user.save();

  const { password: hashed_password, ...new_user } = user.toJSON();
  res.status(201).json(new_user);
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const existing_user = await User.findOne({ email });

  if (!existing_user)
    return res.status(404).json({ message: "Invalid credentials" });

  const is_matched = existing_user.matchPassword(password);
  if (!is_matched)
    return res.status(404).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { id: existing_user._id, email: existing_user.email },
    process.env.SECRET_KEY
  );

  res.json({ token });
};
