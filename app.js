const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const request = require("request");

// using of different package
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

//getting the server 
app.get("/", function(req,res){
    res.sendFile(__dirname+"/signup.html");
})

//posting different request and response on the server

app.post("/",function(req,res){
    const firstname = req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields:{
                    FNAME : firstname,
                    LNAME : lastName
            }
           
            }
        ]
    };
    const jsondata = JSON.stringify(data);

    const url =  "https://us21.api.mailchimp.com/3.0/lists/d5fa3c823c";

    const options={
        method: "POST",
        auth : "vaibhav:90865ce4eb7bfe7c1688496b620f1e50-us21"
    };

    const request = https.request(url,options,function(response){
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })
    request.write(jsondata);
    request.end();
}
);
//server porting
app.listen(3000, function(req,res)
{
    console.log("server started at port : 3000");
})

// audience id
// d5fa3c823c
// api key
// 90865ce4eb7bfe7c1688496b620f1e50-us21