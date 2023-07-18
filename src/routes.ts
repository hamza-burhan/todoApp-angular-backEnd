import { Router } from "express";
import jwt from 'jsonwebtoken';
const user = require("./models/user");
export const router = Router();

router.get("/", (req, res) => {
  res.send({result:"Hello worl"});
});

// User Route
router.get("/user", (req, res) => {
  res.send("User route");
});

router.post("/user", async function (req, res) {
  const { email, password } = req.body;
  // JWT token signing
  jwt.sign({ email }, "secretKey", { expiresIn: '300s' }, (err, token) => {
    if (err) {
      res.status(500).json({ error: "Token is not generated" }).end();
    } else {
      res.status(200).json({ email,password,token }).end();
    }
  });
  console.log("email:", email)
  console.log("password:", password)

  const Nuser = new user();
  Nuser.email = email;
  Nuser.password = password;
  await Nuser.save();
});

// Middleware
const verifyjwt: any = (req:any, res:any, next:any) => {
  const bearer = req.headers.authorization;
  
  if (typeof bearer !== 'undefined') {
    const token = bearer.split(" ")[1];
    req.token = token;
    next();
  } else {
    res.status(500).json({ err: "Token is not valid" }).end();
  }
};

// Dashboard Route
router.get("/dashboard", verifyjwt,(req, res) => {
//   jwt.verify(req.token, 'secretKey', (err:any, authdata:any) => {
//     if (err) {
//       res.json({ err: "Token Expired" }).end();
//     } else {
//       res.json({ authdata }).end();
//     }
//   });
res.send("Dashboard")
});

