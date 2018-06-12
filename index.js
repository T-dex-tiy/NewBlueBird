const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const app = express();
const firebase= require('firebase');
const api_key = "xxx";
const domain = "sandbox5b0ca462d46e428f80aae64482cfcce0.mailgun.org";
const mailgun = require("mailgun-js")({ apiKey: api_key, domain: domain });
const path = require("path");
const filepath = path.join(__dirname, "./mainlogo.png");

const config=firebase.initializeApp({
  apiKey: "AIzaSyAM0DL6QzhVONFmxP5OHWGi9Vj4lS2RbbM",
  authDomain: "bluebirdheli-dd1f5.firebaseapp.com",
  databaseURL: "https://bluebirdheli-dd1f5.firebaseio.com",
  storageBucket: "bluebirdheli-dd1f5.appspot.com",
})
let apikey;
const firebasekey=firebase.database().ref().child('keyz');
firebasekey.on('value',snap=>{
  console.log(snap.val());
   apikey=snap.val()
   return apikey
})
console.log(firebasekey);
console.log(apikey);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/api/form", (req, res) => {
  const email = req.body.user;
  const htmlEmail = `
  <body style="padding:0;margin:0;">
    <table style="width:100%; background: linear-gradient(to left, #d48c3c 0%,#50aadf 50%, #6d6d6d 100%);border:1px solid black;padding:0;margin:0;height:10vh">
      <tr>
        <th align="right">
          <a href="https://cloudveilmountainheli.com/"><img src="cid:mainlogo.png" style="height:15vh;z-index:100;"/></a>
        </th>
      </tr>
  </table>
  <table>
    <Head style="color:blue; width:100vh: height:15vh;">Get Ready to Fly, Here is all the information you need</head>
    
    <p>You will be flying from out of the ${req.body.Res.operatingArea}</p>
    <p>You will be picked up at our ${req.body.Res.pickupLocation}</p>
    <p>You are going to be flying with a party of ${
      req.body.Res.numberOfAttendees
    }</p>
    <p>On ${req.body.Res.day} at ${req.body.Res.pickupTime}</p>
    <p style="font-size:2vh;">This meassage was sent to ${req.body.user}</p>
  </table>`;
  console.log(req.body.Res, req.body.user);
  var data = {
    from: "dex.mills@dexmills.com",
    to: email,
    subject: "Hello",
    html: htmlEmail,
    inline: filepath
  };

  mailgun.messages().send(data, function(error, body) {
    console.log(body);
  });
});

const PORT = process.env.port || 3001;

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT} `);
});
