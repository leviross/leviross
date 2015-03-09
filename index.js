var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var sendgrid  = require('sendgrid')('leviross', 'Fuckit123');

app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended:false}));

app.get("/", function(req,res){
    res.render("index");
    //res.send("Hello Levi");
});
app.get("/resume", function(req,res){
    res.render("resume");
});

app.get("/emailSent",function(req,res){
    res.render("email_sent");
});

app.get("/emailNotSent",function(req,res){
    res.render("email_not_sent");
})

app.post("/sendContact",function(req,res){
    var email = new sendgrid.Email();
    //needs body parse to work...
    var fromEmail = req.body.c_email;
    var message = req.body.c_message;
    var name = req.body.c_name;

    console.log(req.body);
    //todo: send e-mail using send grid here

    var payload = {
        to: 'levross@gmail.com',
        subject: 'New Email from leviross.com',
        from: fromEmail,
        name: name,
        text: message
    };
    sendgrid.send(payload, function(err, json) {
        if(err){
            //res.render('index',{error:err});
            res.redirect("/emailNotSent");
            return console.error(err);
        }else{
            //redirecting to same page with new route, sweetalert pops up on load
            //total hack job, but does the trick
            console.log(json);
            res.redirect("/emailSent");
        }

    });
    //res.redirect("/");

});


app.listen(process.env.PORT || 3000);
