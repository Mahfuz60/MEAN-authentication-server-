const User = require("../model/user.model");


const userRegister = async (req, res) => {
  // console.log(req.body);

  try {
    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      rePassword: req.body.rePassword,
    });
    res.json({ status: "OK" });
  } catch (err) {
    res.json({
      status: "404",
      error: "duplicate email",
    });
    console.log(err);
  }
};

const userLogin = async (req, res) => {
  // console.log(req.body);

  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
    rePassword: req.body.rePassword,
  });
  if (user) {
    res.json({ status: "ok", user: true });
  } else {
    res.json({ status: "error", user: false });
  }
};

module.exports = { userRegister, userLogin };
