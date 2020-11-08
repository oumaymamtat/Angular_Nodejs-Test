const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
var nodemailer = require('nodemailer');
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.listen(3000, () => {console.log("The server started on port 3000 !");});
app.get("/", (req, res) => {res.send("<h1 style='text-align: center'>Working </h1>");});


app.post('/',(req,res)=>{
  console.log("request came");
  let user = req.body;
  console.log("user in node :");
  console.log(user);

  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: "oumaymamtat20@gmail.com",
        pass:"love&peace20"
    }
    
  });
  console.log("user.email : ");
  console.log(user.email);


  var mailOptions = {
    from: "oumaymamtat20@gmail.com"  ,
    to: '" '+user.email+' " '   ,
    subject: 'Mail From Test Form',
    text: user.firstName+' '+user.lastName+' s\'est inscrit avec cet email '+user.email+
    ' et le cv ci joint \n'
  // +user.cv 
    ,
    attachments: [
      {        
        filename: 'cv',
        path: 'data:image/png;base64,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',
      }
    ]
    };
  transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log("erreur:");
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
});