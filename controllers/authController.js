const User = require("../models/user");
const bcrypt = require('bcrypt');

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
     const email = req.body.email;
     const password = req.body.password;
     const hashedPassword = await bcrypt.hash(password, 10);

     try {
          await User.create({
               fullname: name,
               email: email,
               password: hashedPassword
          });
          return res.redirect("login");

     } catch (err) {
          console.log(err);
     }
}

exports.getLogin = async (req, res) => {
     try {
          return res.render("auth/login", {
               title: "Login"
          });
     } catch (err) {
          console.log(err);
     }
}

exports.getLogout = async (req, res) => {
     try {
          await req.session.destroy();
          return res.redirect("/account/login");
     } catch (err) {
          console.log(err);
     }
}

exports.postLogin = async (req, res) => {
     const email = req.body.email;
     const password = req.body.password;
     try {

          const user = await User.findOne({
               where: {
                    email: email
               }
          });

          if (!user) {
               return res.render("auth/login", {
                    title: "Login",
                    message: "email is incorrect"
               });
          }

          const match = await bcrypt.compare(password, user.password);

          if (match) {
              req.session.isAuth = true;
              req.session.fullname = user.fullname;
               return res.redirect("/");
          }

          return res.render("auth/login", {
               title: "Login",
               message: "password is incorrect"
          });


     } catch (err) {
          console.log(err);
     }
}