const express = require("express");
const cors = require("cors"); // Front-end Ani Back-end ch Communication nit Karyla
const bcrypt = require("bcrypt"); // bcrypt lagt password ch encryption karyla
const jwt = require("jsonwebtoken"); // He Lagt Token Set Karyla
const cookieParser = require("cookie-parser"); // Cookie Set Karyla
const userModel = require("./models/userModel"); // model databse ch export kel
const dbConfig = require("./config/dbConfig"); // connection chi file export keli

const app = express(); //app navach variable ahe je express chya saglya proprties vapru shakt

//middleware
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(cookieParser());

app.post("/api/register", async function (req, res) {
  try {
    /*
    ata apn kay karu
    jo data form madhun yetoi tyala bcrypt karu ani mg store karu database madhi
    tyasathi ast bcrypt navach package vaprto tyachi method asti Syntax asto ->
    bcrypt.hash(apla original password,saltrounds,function(err,res){
    //logic
    salt rounds mhanje -> jr 2 lokancha same password asla tr te bcrypted same ch yenar , Ani hacker lokanckd ek algorithm ast rainbow table jyamul jr eka mansacha jri password sapldala tr te bakcichyancha crack karu shaktat 
    te prevent karyla apn vaprto salt round 
    atta apn 10 salt rounds vaparelt
    })
     */
    bcrypt.hash(req.body.password, 10, async function (err, result) {
      if (err) {
        res.json({ mesaage: "Something Went Wrong" });
      }

      // form madhun yenari info Database madhi user collection madhi store hoti
      const user = await userModel.create({
        username: req.body.username,
        email: req.body.email,
        password: result,
      });
    });
    res.json({ message: "Registration Sucessfull" });
  } catch (error) {
    console.log("Error : ", error);
    res.json({ message: "Registration Failed" });
  }
});

app.post("/api/login", async function (req, res) {
    /*
        ata aplyala check karychy ki user khara authenticated ahe ka barobar,
        ata password encrypted vale store kelay jyala parat reverse original form madhe ny anta yet,
        jr anta yet asta tr hacker ni tech kel ast ani mg kay upyog na ,
        mg ata aplyala check karycha asl ki password kharach correct ahe ka tr apn na ks karych
        tyasathi method ahe bcrypt.compare
        tyacha syntax
        bcrypt.compare(atta taklela password,correct vala password,function(err,result){
        //Logic
        ata jr pasword mimatch zale tr err trigger honar
        ani jr correct asl trresult trigger honar
        })
    */
  try {
    const user = await userModel.findOne({ username: req.body.username });
    if (!user) {
      res.json({ message: "No User Found" });
    } else {
      bcrypt.compare(req.body.password,user.password,async function(err,result){
        if(result){
            /*
            jr result true asl jr aplyala samjly ki ha user authenticated ahe
            mg apn ek cookie deu tyala
            ata cookie eka token madhun dyla lagti 
            jwt(jsonwebtoken) aplyala token generate karun det
            tyacha sathi apn vaprto jwt.sign(kuhtlya user la cooki dychi,"ek secreat key")
            ani rsponce madhe ek cookie pathvto 
            */
            const token = jwt.sign({username : req.body.username},"secreat");
            res
            .cookie("token",token) // atta front end kad ek cookie jati ji to store karu shakto ani vapu shakto authentication sathiiiii
            .json({message : "Sucessfull login"})
        }
        else{
            res.json({mesaage : "Invalid Credentials"});
        }
      })
    }
  } catch (error) {
    console.log("Eroor : ", error);
    res.json({ message: "Try Again" });
  }
});



app.listen(5000, function (req, res) {
  console.log("Server Is Running on http://localhost:5000");
});
