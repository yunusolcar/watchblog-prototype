const User = require("../models/user");

exports.getRegister = async (req, res) => {
     try {
          return res.render("auth/register", {
               title: "Register"
          });
     } catch (err) {
          console.log(err);
     }
}

exports.postRegister = async (req, res) => {
     const name = req.body.name;
     const email = req.body.name;
     const password = req.body.password;

     try {
          await User.create({
               fullname: name,
               email: email,
               password: password
          });
          return res.redirect("login");

     } catch (err) {
          console.log(err);
     }

}