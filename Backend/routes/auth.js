const express = require('express');
const db = require('../db');
const mail = require('../sendMail');
const bcrypt = require("bcryptjs");
const router = express.Router();
const axios = require('axios');
const cheerio = require('cheerio');
const JWT_SECRET = "sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk";

const Collection1 = db.collection("USER");

router.post('/sendOTP', async (req, res) => {
    const { name, email, otp } = req.body;
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);

  const getUser = await Collection1.doc(email).get().then(documentSnapshot => {
    let isStore = documentSnapshot.get();
    console.log(isStore);
    // Value of isStore here ... 
  });;
  if (getUser.exists) res.json({ status: "Exists" });
  else {
    mail.setConfiguration(email, name, otp);
    mail.sendMail(res);
  }
})

router.post("/signUp", async(req, res) => {
  const {name, email, password} = req.body;
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);

  const pass = await bcrypt.hash(password, 10);
    const user = await Collection1.doc(email).set({
      Name: name,
      Password: pass,
    });
    if (user) {
      res.json({ status: "ok" });
    }
    else 
      res.json({ status: "error" });
});

router.post("/signIn", async (req, res) => {
  const { email, password } = req.body;
  console.log(email)
  const user = await Collection1.doc(email).get();
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  if (!user.exists) {
    res.json({ status: "error", error: "Invalid username/password" });
  }
  else
  {
    if (await bcrypt.compare(password, user.data().Password)) {
      return res.json({ status: "ok", name: user.data().Name });
    }
    else
      res.json({ status: "error", error: "Invalid username/password" });
  }
});

router.post('/verifyEmail', async (req, res) => {
  const { email, otp } = req.body;
res.header("Access-Control-Allow-Origin", "*");
res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
res.setHeader("Access-Control-Allow-Headers", "Content-Type");
res.setHeader("Access-Control-Allow-Credentials", true);

const getUser = await Collection1.doc(email).get();
if (!getUser.exists) res.json({ status: "Not Exists" });
else {
  mail.setConfigurationForReset(email, otp);
  mail.sendMail1(getUser.data().Name, res);
}
})

router.post("/changePassword", async(req, res) => {
  const {name, email, password} = req.body;
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);

  const pass = await bcrypt.hash(password, 10);
    const user = await Collection1.doc(email).set({
      Name: name,
      Password: pass,
    });
    if (user) {
      res.json({ status: "ok" });
    }
    else 
      res.json({ status: "error" });
});

router.post("/addPage", async(req, res) => {
  const {email, word, meaning} = req.body;
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);

  const user = await Collection1.doc(email).collection('DICTIONARY').doc(word).get();
    if (user.exists) {
      res.json({ status: "Exists" });
    }
    else {
      const add = await Collection1.doc(email).collection('DICTIONARY').doc(word).set({
        Meaning: meaning,
      });
      if(add)
        res.json({ status: "ok" });
      else
        res.json({ status: "error" });
    }
});

router.post("/getDictionary", async(req, res) => {
  const {email} = req.body;
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);

  const dict = await Collection1.doc(email).collection('DICTIONARY').get();
  if(dict) {
    res.json({ status: dict.docs.map(doc => [doc.id, doc.data().Meaning])});
  }
  else {
    res.json({ status: "error"});
  }
});

router.post("/getMeaning", async(req, res) => {
  const {word} = req.body;
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);

  try {
    const targetUrl = "https://www.oxfordlearnersdictionaries.com/definition/english/"+word;
    const arr = [];
    (async() => {
      try {
      const response = await axios.get(targetUrl);
    const $ = cheerio.load(response.data);
    $("span.def")
  .each((row, elem) => {
    if((row === 0) || (row === 1)) {
          const key = $(elem).text().trim();
          arr[row] = key;
      return;
  }
  });
  res.json({ status: arr })
}
catch{
  res.json({ status: "error"});
}
  })()
}
catch (error){
  res.json({ status: "error"});
}

});

module.exports = router;